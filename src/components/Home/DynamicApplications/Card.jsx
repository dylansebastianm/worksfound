import React from 'react'
import styles from './card.module.css'

export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`${styles.card} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

