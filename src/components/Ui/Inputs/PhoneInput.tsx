"use client"

import { useState, useRef, useEffect } from "react"
import { FaPhone } from "react-icons/fa"
import styles from "./phone-input.module.css"

interface PhoneInputProps {
  value?: string
  onChange?: (phone: string) => void
}

export default function PhoneInput({ value, onChange }: PhoneInputProps) {
  const [phone, setPhone] = useState<string>(value || "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setPhone(value)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value
    const cursorPosition = e.target.selectionStart || 0

    // Si está vacío, permitir que se limpie
    if (inputValue.length === 0) {
      setPhone("")
      if (onChange) onChange("")
      return
    }

    // Extraer solo números y el signo +
    const cleaned = inputValue.replace(/[^0-9+]/g, "")

    // Si no empieza con +, agregarlo
    let formattedValue = cleaned.startsWith("+") ? cleaned : "+" + cleaned.replace(/\+/g, "")

    // Asegurar que solo haya un + al inicio
    if (formattedValue.length > 1 && formattedValue.indexOf("+", 1) !== -1) {
      formattedValue = "+" + formattedValue.replace(/\+/g, "")
    }

    // Limitar a 100 caracteres máximo
    if (formattedValue.length > 100) {
      formattedValue = formattedValue.substring(0, 100)
    }

    setPhone(formattedValue)
    if (onChange) {
      onChange(formattedValue)
    }

    // Restaurar la posición del cursor después de la actualización
    setTimeout(() => {
      if (inputRef.current) {
        const newPosition = Math.min(cursorPosition, formattedValue.length)
        inputRef.current.setSelectionRange(newPosition, newPosition)
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir backspace, delete, tab, escape, enter, y flechas
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key)
    ) {
      return
    }

    // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (e.ctrlKey || e.metaKey) {
      return
    }

    // Permitir números y el signo + en cualquier posición
    // El handleChange se encargará de formatear correctamente
    if (/[0-9+]/.test(e.key)) {
      return
    }

    // Bloquear cualquier otra tecla
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>Teléfono</label>
      <div className={styles.inputWrapper}>
        <FaPhone className={styles.icon} />
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="+1234567890"
          value={phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={100}
        />
      </div>
    </div>
  )
}

