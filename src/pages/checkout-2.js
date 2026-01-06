'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/Ui/button'
import styles from './checkout-2.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout2Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePay = async () => {
    setError('')
    setIsLoading(true)

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error(
          'No se pudo inicializar Stripe. Revisa NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
        )
      }

      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cancelPath: '/checkout-2',
          successPath: '/thanks',
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || 'Error creando sesión de Stripe')
      }

      const { sessionId } = data
      if (!sessionId) {
        throw new Error('Stripe no devolvió sessionId')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) throw stripeError
    } catch (e) {
      setError(e?.message || 'Error iniciando pago con Stripe')
      setIsLoading(false)
    }
  }

  const canceled =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('canceled') === '1'

  return (
    <>
      <Head>
        <title>Checkout 2 (Stripe Test) - WorksFound</title>
        <meta
          name="description"
          content="Checkout de prueba para Stripe (modo test)"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Checkout 2 (Stripe Test)</h1>
          <p className={styles.subtitle}>
            Esto crea una <strong>Stripe Checkout Session</strong> por $140 USD y
            te redirige al checkout hospedado por Stripe.
          </p>

          {canceled && (
            <div className={styles.notice}>
              Pago cancelado. Podés volver a intentar cuando quieras.
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.row}>
            <Button
              type="button"
              onClick={handlePay}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Redirigiendo...' : 'Pagar con Stripe'}
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

