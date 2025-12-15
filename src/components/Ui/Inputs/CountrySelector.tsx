"use client"

import { useState, useRef, useEffect } from "react"
import { FaGlobe, FaChevronDown } from "react-icons/fa"
import styles from "./country-selector.module.css"

// Lista restringida de países permitidos en checkout (cobertura Dlocal)
const countries = [
  { code: "AR", name: "Argentina" },
  { code: "BO", name: "Bolivia" },
  { code: "BR", name: "Brasil" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "EC", name: "Ecuador" },
  { code: "GT", name: "Guatemala" },
  { code: "MX", name: "México" },
  { code: "PA", name: "Panamá" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Perú" },
  { code: "UY", name: "Uruguay" },
]

interface CountrySelectorProps {
  value?: string
  onChange?: (countryCode: string) => void
}

export default function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      const country = countries.find(c => c.code === value)
      if (country) {
        setSelectedCountry(country.name)
      }
    }
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (countryCode: string, countryName: string) => {
    setSelectedCountry(countryName)
    setIsOpen(false)
    if (onChange) {
      onChange(countryCode)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>País</label>
      <div className={styles.selectWrapper} ref={dropdownRef}>
        <button type="button" className={styles.selectButton} onClick={() => setIsOpen(!isOpen)}>
          <FaGlobe className={styles.icon} />
          <span className={styles.selectText}>{selectedCountry || "Selecciona tu país"}</span>
          <FaChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} />
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                className={styles.dropdownItem}
                onClick={() => handleSelect(country.code, country.name)}
              >
                {country.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

