'use client'

import React, { useState } from 'react'
import { Button } from '@/components/Ui/button'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import CountrySelector from '@/components/Ui/Inputs/CountrySelector'
import PhoneInput from '@/components/Ui/Inputs/PhoneInput'
import { AlternativePaymentAlert } from '@/components/Ui/AlertPayment/AlternativePayments'
import { createPayment } from '@/lib/dlocalgoService'
import styles from './CheckoutForm.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState('dlocal') // 'dlocal' | 'stripe' | 'crypto'
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones para continuar.')
      return
    }

    setIsLoading(true)

    try {
      if (paymentMethod === 'dlocal') {
        // Validación solo para DlocalGo
        if (!country) {
          setError('Por favor selecciona tu país')
          setIsLoading(false)
          return
        }

        if (!phone || phone.length < 2) {
          setError('Por favor ingresa tu número de teléfono')
          setIsLoading(false)
          return
        }

        const response = await createPayment({
          country: country,
          phone: phone,
        })

        if (response && response.redirect_url) {
          window.location.href = response.redirect_url
          return
        }

        setError('Error al procesar el pago. No se recibió la URL de redirección.')
        setIsLoading(false)
        return
      }

      if (paymentMethod === 'crypto') {
        window.location.href = 'https://onei.la/0rc'
        return
      }

      if (paymentMethod === 'stripe') {
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
            cancelPath: '/checkout',
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
        return
      }

      setError('Método de pago inválido.')
      setIsLoading(false)
    } catch (err) {
      setError(
        err.message || 'Error al procesar el pago. Por favor intenta nuevamente.'
      )
      setIsLoading(false)
    }
  }

  const paymentMethods = [
    {
      id: 'dlocal',
      name: 'Pago en Cuotas',
      description: 'Países de Latam seleccionados',
      icon: 'card',
      badge: '',
      details: 'Tarjeta de crédito - Cuotas según banco emisor',
    },
    {
      id: 'stripe',
      name: 'Tarjeta de Crédito/Débito',
      description: 'Disponible en todo el mundo',
      icon: 'stripe',
      badge: null,
      details: 'Pago único con cualquier tarjeta',
    },
    {
      id: 'crypto',
      name: 'Criptomonedas (USDT)',
      description: 'USDT',
      icon: 'usdt',
      badge: null,
      details: 'Pago seguro con crypto',
    },
  ]

  const renderIcon = (iconType) => {
    if (iconType === 'card') {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.paymentLogo}
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      )
    }

    if (iconType === 'stripe') {
      return (
        <Image
          src="/assets/logos/stripe.png"
          alt="Stripe"
          width={28}
          height={28}
          className={styles.paymentLogoImg}
        />
      )
    }

    if (iconType === 'usdt') {
      return (
        <Image
          src="/assets/logos/tether.svg"
          alt="USDT"
          width={28}
          height={28}
          className={styles.paymentLogoImg}
        />
      )
    }

    return null
  }

  return (
    <>
      {/* Payment Method Selector */}
      <div className={styles.paymentMethodSection}>
        <h3 className={styles.paymentMethodTitle}>Selecciona tu método de pago</h3>
        <div className={styles.paymentMethodGrid}>
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`${styles.paymentMethodCard} ${
                paymentMethod === method.id ? styles.paymentMethodCardActive : ''
              }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              {method.badge && (
                <span className={styles.paymentMethodBadge}>{method.badge}</span>
              )}
              <div className={styles.paymentMethodIcon}>
                {renderIcon(method.icon)}
              </div>
              <div className={styles.paymentMethodContent}>
                <div className={styles.paymentMethodName}>{method.name}</div>
                <div className={styles.paymentMethodDescription}>
                  {method.description}
                </div>
                <div className={styles.paymentMethodDetails}>{method.details}</div>
              </div>
              <div className={styles.paymentMethodRadio} aria-hidden="true">
                <div
                  className={`${styles.radioCircle} ${
                    paymentMethod === method.id ? styles.radioCircleActive : ''
                  }`}
                >
                  {paymentMethod === method.id && (
                    <div className={styles.radioCircleInner} />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs solo para DlocalGo */}
      {paymentMethod === 'dlocal' && (
        <div className={styles.countrySelectorWrapper}>
          <CountrySelector value={country} onChange={setCountry} />
        {/*   <AlternativePaymentAlert
            onAlternativePaymentClick={() => {
              window.location.href = 'https://onei.la/0rc'
            }}
          /> */}
          <PhoneInput value={phone} onChange={setPhone} />
        </div>
      )}

      {/* Payment Button Area with white wrapper */}
      <div className={styles.paymentButtonArea}>
        <p className={styles.paymentSecureText}>
          {paymentMethod === 'dlocal' && 'Pago seguro procesado por DlocalGo'}
          {paymentMethod === 'stripe' && 'Pago seguro procesado por Stripe'}
          {paymentMethod === 'crypto' && 'Pago seguro procesado por One Infinite'}
        </p>
        <div className={styles.paymentButtonContainer}>
          <div className={styles.termsRow}>
            <input
              id="accept-terms"
              type="checkbox"
              className={styles.termsCheckbox}
              checked={acceptedTerms}
              onChange={(e) => {
                const next = e.target.checked
                setAcceptedTerms(next)
                if (next) setError('')
              }}
            />
            <label htmlFor="accept-terms" className={styles.termsLabel}>
              Al continuar aceptas nuestros{' '}
              <a
                href="/terminos-y-condiciones"
                className={styles.termsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                términos y condiciones
              </a>
            </label>
          </div>
          <form onSubmit={handleSubmit} className={styles.buttonForm}>
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !acceptedTerms}
              size="lg"
            >
              {isLoading ? 'Redirigiendo...' : 'Continuar al pago'}
            </Button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </>
  )
}

