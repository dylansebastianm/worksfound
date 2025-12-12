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

    // Permitir solo + al inicio y números después
    if (inputValue.length === 0) {
      setPhone("")
      if (onChange) onChange("")
      return
    }

    // Si no empieza con +, agregarlo
    if (!inputValue.startsWith("+")) {
      inputValue = "+" + inputValue.replace(/[^0-9]/g, "")
    } else {
      // Si empieza con +, permitir solo números después del +
      const afterPlus = inputValue.substring(1)
      inputValue = "+" + afterPlus.replace(/[^0-9]/g, "")
    }

    // Limitar a 100 caracteres máximo
    if (inputValue.length > 100) {
      inputValue = inputValue.substring(0, 100)
    }

    setPhone(inputValue)
    if (onChange) {
      onChange(inputValue)
    }
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
      ].includes(e.key)
    ) {
      return
    }

    // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (e.ctrlKey || e.metaKey) {
      return
    }

    // Si está en la posición 0 (antes del +), no permitir borrar el +
    if (inputRef.current?.selectionStart === 0 && e.key !== "+") {
      e.preventDefault()
      return
    }
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

