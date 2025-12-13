"use client"

import { useState, useEffect } from "react"
import { FaPhone } from "react-icons/fa"
import styles from "./phone-input.module.css"

interface PhoneInputProps {
  value?: string
  onChange?: (phone: string) => void
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [phone, setPhone] = useState<string>(value || "")

  useEffect(() => {
    if (value !== undefined) {
      setPhone(value)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Solo permitir + y números
    const cleaned = inputValue.replace(/[^0-9+]/g, "")
    
    // Limitar a 100 caracteres
    const limited = cleaned.length > 100 ? cleaned.substring(0, 100) : cleaned
    
    setPhone(limited)
    if (onChange) {
      onChange(limited)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>Teléfono</label>
      <div className={styles.inputWrapper}>
        <FaPhone className={styles.icon} />
        <input
          type="text"
          className={styles.input}
          placeholder="+1234567890"
          value={phone}
          onChange={handleChange}
          maxLength={100}
        />
      </div>
    </div>
  )
}

