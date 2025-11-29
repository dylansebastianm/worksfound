'use client'

import React, { useMemo } from 'react'
import { TestimonialCard } from './TestimonialCard'
import { InfiniteCarousel } from './InfiniteCarousel'
import styles from './testimonios.module.css'

function Testimonios({ variant = 'default', cardHeight }) {
  const testimoniosRaw = [
    {
      id: 'bIiAa3l9ULE',
      nombre: 'Didier Pereira',
      cargo: 'Front‑End Developer',
      fecha: '11‑ago‑2024',
    },
    {
      id: 'ugpMAkmdvIA',
      nombre: 'Gamaliel Camey',
      cargo: 'Frontend Developer',
      fecha: '25‑sept‑2024',
    },
    {
      id: 'yVfWf0-drFU',
      nombre: 'Luciana Rios',
      cargo: 'Frontend & Mobile Developer',
      fecha: '05‑nov‑2024',
    },
    {
      id: 'u2aGjlROjPc',
      nombre: 'Mariano Hilario',
      cargo: 'Full Stack Developer',
      fecha: '25‑nov‑2024',
    },
    {
      id: 'z0duw6W6TIo',
      nombre: 'Antonio Piatti Fadda',
      cargo: 'Frontend Developer',
      fecha: '09‑ene‑2025',
    },
    {
      id: 'Rfp2sS2lnj4',
      nombre: 'Federico Hugenet',
      cargo: 'Ejecutivo de Cuentas',
      fecha: '09‑ene‑2025',
    },
    {
      id: 'koGC0-WB3qg',
      nombre: 'Orlando Andaur',
      cargo: 'Fullstack Developer',
      fecha: '10‑ene‑2025',
    },
    {
      id: 'ydBP5t19-Do',
      nombre: 'Fabrizio Villanueva',
      cargo: 'Fullstack Developer',
      fecha: '27‑jul‑2025',
    },
    {
      id: 'bKfCCo7w_YA',
      nombre: 'Diego Alvarez',
      cargo: 'Frontend Developer',
      fecha: '08‑sept‑2025',
    },
    {
      id: 'PdAi08DGJ54',
      nombre: 'Joaquín Brondo',
      cargo: 'Desarrollador Fullstack',
      fecha: '02‑oct‑2025',
    },
    {
      id: 'zzwg0UHL5dU',
      nombre: 'Henry Bustamante',
      cargo: 'Frontend Developer',
      fecha: '06‑nov‑2025',
    },
  ]

  // Función para parsear fechas en formato "DD-MMM-YYYY"
  const parseFecha = (fechaStr) => {
    const meses = {
      ene: 0,
      feb: 1,
      mar: 2,
      abr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      ago: 7,
      sept: 8,
      oct: 9,
      nov: 10,
      dic: 11,
    }

    const partes = fechaStr.split('‑')
    if (partes.length === 3) {
      const dia = parseInt(partes[0])
      const mes = meses[partes[1].toLowerCase()]
      const año = parseInt(partes[2])
      return new Date(año, mes, dia)
    }
    return new Date(0)
  }

  // Ordenar testimonios de más nuevos a más antiguos
  const testimonios = useMemo(() => {
    return [...testimoniosRaw].sort((a, b) => {
      const fechaA = parseFecha(a.fecha)
      const fechaB = parseFecha(b.fecha)
      return fechaB - fechaA // Más recientes primero
    })
  }, [])

  return (
    <div className={styles.container}>
      <InfiniteCarousel width="100%" speed={70} gap={24} pauseOnHover={true}>
        {testimonios.map((testimonio) => (
          <TestimonialCard
            key={testimonio.id}
            videoId={testimonio.id}
            nombre={testimonio.nombre}
            cargo={testimonio.cargo}
            fecha={testimonio.fecha}
            variant={variant}
            cardHeight={cardHeight}
          />
        ))}
      </InfiniteCarousel>
    </div>
  )
}

export default Testimonios
