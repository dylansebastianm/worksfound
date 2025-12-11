'use client'

import React, { useState } from 'react'
import { Input } from '@/components/Ui/input'
import { Button } from '@/components/Ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Ui/select'
import { createPayment } from '@/lib/dlocalgoService'
import styles from './CheckoutForm.module.css'

// Países disponibles basados en la imagen proporcionada
const countries = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
]

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    country: '',
    email: '',
    name: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validación
    if (!formData.country) {
      setError('Por favor selecciona tu país')
      return
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }
    if (!formData.name || formData.name.trim().length < 2) {
      setError('Por favor ingresa tu nombre completo')
      return
    }

    setIsLoading(true)

    try {
      const response = await createPayment({
        country: formData.country,
        email: formData.email,
        name: formData.name,
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="country" className={styles.label}>
          País
        </label>
        <Select
          value={formData.country}
          onValueChange={(value) => handleChange('country', value)}
        >
          <SelectTrigger className={styles.select} id="country">
            <SelectValue placeholder="Selecciona tu país" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span className={styles.countryOption}>
                  <span className={styles.flag}>{country.flag}</span>
                  <span>{country.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre completo
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Ingresa tu nombre completo"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={styles.input}
          required
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <Button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? 'Procesando...' : 'Pagar'}
      </Button>
    </form>
  )
}

