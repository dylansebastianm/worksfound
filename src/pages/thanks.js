'use client'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import styles from './thanks.module.css'

export default function ThanksPage() {
  return (
    <>
      <Head>
        <title>¡Gracias por tu compra! - WorksFound</title>
        <meta
          name="description"
          content="Tu pago ha sido procesado exitosamente"
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.iconContainer}>
              <FaCheckCircle className={styles.icon} />
            </div>
            <h1 className={styles.title}>¡Pago exitoso!</h1>
            <p className={styles.message}>
              Gracias por confiar en WorksFound.io. Tu pago ha sido procesado
              correctamente.
            </p>
            <div className={styles.details}>
              <p className={styles.detailText}>
                Recibirás un email de confirmación con los detalles de tu
                servicio en breve.
              </p>
            </div>
            <div className={styles.actions}>
              <Link href="/" className={styles.button}>
                Volver al inicio
                <FaArrowRight className={styles.buttonIcon} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

