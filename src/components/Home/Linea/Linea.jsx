import React from 'react'
import styles from './linea.module.css'

export default function Linea({title}) {
  return (
    <div className={styles.container}>
    <div className={styles.title}>
    {title}
    </div>
  </div>
  )
}
