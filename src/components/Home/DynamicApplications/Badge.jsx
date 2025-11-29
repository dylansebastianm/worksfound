import React from 'react'
import styles from './badge.module.css'

export default function Badge({ className = '', variant = 'secondary', children, ...props }) {
  return (
    <div
      className={`${styles.badge} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

