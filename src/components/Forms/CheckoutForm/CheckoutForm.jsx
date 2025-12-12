'use client'

import React, { useState } from 'react'
import { Button } from '@/components/Ui/button'
import CountrySelector from '@/components/Ui/Inputs/CountrySelector'
import PhoneInput from '@/components/Ui/Inputs/PhoneInput'
import { createPayment } from '@/lib/dlocalgoService'
import styles from './CheckoutForm.module.css'

export default function CheckoutForm() {
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validación
    if (!country) {
      setError('Por favor selecciona tu país')
      return
    }

    if (!phone || phone.length < 2) {
      setError('Por favor ingresa tu número de teléfono')
      return
    }

    setIsLoading(true)

    try {
      const response = await createPayment({
        country: country,
        phone: phone,
      })

      // La API devuelve redirect_url para redirigir al usuario
      if (response && response.redirect_url) {
        // Redirigir a la URL de checkout de DlocalGo
        window.location.href = response.redirect_url
      } else {
        setError('Error al procesar el pago. No se recibió la URL de redirección.')
      }
    } catch (err) {
      setError(
        err.message || 'Error al procesar el pago. Por favor intenta nuevamente.'
      )
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Country Selector - Outside white wrapper */}
      <div className={styles.countrySelectorWrapper}>
        <CountrySelector value={country} onChange={setCountry} />
        <PhoneInput value={phone} onChange={setPhone} />
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* Payment Button Area with white wrapper */}
      <div className={styles.paymentButtonArea}>
        <p className={styles.paymentSecureText}>
          Pago seguro procesado por DlocalGo
        </p>
        <div className={styles.paymentButtonContainer}>
          <form onSubmit={handleSubmit} className={styles.buttonForm}>
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Procesando...' : 'Pagar'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

