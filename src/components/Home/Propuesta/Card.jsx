import React from 'react'
import styles from './card.module.css'

export default function Card({icon, contenido}) {
  return (
    <div className={styles.card}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.contenido}>{contenido}</div>
  </div>
  )
}
