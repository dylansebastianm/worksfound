'use client'

import React from 'react'
import { YouTubeVideo } from './YouTubeVideo'
import styles from './testimonialCard.module.css'

export function TestimonialCard({ videoId, nombre, cargo, fecha, variant = 'default', cardHeight }) {
  // Heights y widths diferentes según el variant
  const defaultVideoHeight = variant === 'mini' ? 207 : 307
  const cardWidth = variant === 'mini' ? 250 : 400
  const videoWidth = variant === 'mini' ? 218 : 368 // Mantener proporción 16:9 aproximada
  
  // Si hay cardHeight, calcular el height del video restando el padding (1rem = 16px arriba y abajo = 32px)
  const videoHeight = cardHeight ? cardHeight - 32 : defaultVideoHeight
  
  const cardStyle = { width: `${cardWidth}px` }
  if (cardHeight) {
    cardStyle.height = `${cardHeight}px`
    cardStyle.overflow = 'hidden' // Para que el video no se salga
  }
  
  return (
    <div className={styles.card} style={cardStyle}>
      <YouTubeVideo videoId={videoId} width={videoWidth} height={videoHeight} />
      {/* <div className={styles.content}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.cargo}>{cargo}</p>
      </div> */}
    </div>
  )
}

