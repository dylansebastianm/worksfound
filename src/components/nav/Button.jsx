import React from 'react'
import styles from './button.module.css'
import Link from 'next/link'

export default function Button({title}) {
  return (
    <Link href="/checkout" passHref>
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>
        </div>
    </Link>
  )
}
