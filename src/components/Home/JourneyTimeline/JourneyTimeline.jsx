'use client'

import { FaFileAlt, FaRocket } from 'react-icons/fa'
import Link from 'next/link'
import styles from './index.module.css'

const steps = [
  {
    number: 1,
    title: 'CV Optimizado',
    description: 'Creación de CV ATS friendly 100% hecho por nosotros',
    icon: FaFileAlt,
  },
  {
    number: 2,
    title: 'worksFound.io',
    description: 'Acceso a +40 portales de empleo con automatización 100%',
    icon: FaRocket,
  },
]

export default function JourneyTimeline() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Tu camino hacia el empleo ideal
        </h2>
        <p className={styles.subtitle}>
          Un proceso estructurado diseñado para tu éxito
        </p>
      </div>
      <div className={styles.timelineContainer}>
        {/* Progress Line */}
        <div className={styles.progressLine} />
        <div className={styles.progressLineActive} />

        {/* Steps */}
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={styles.stepCard}
              >
                {/* Number Circle */}
                <div className={styles.numberCircle}>
                  <span className={styles.numberText}>
                    {step.number}
                  </span>
                  <div className={styles.ripple} />
                </div>

                {/* Content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    {step.title}
                  </h3>
                  <p className={styles.stepDescription}>
                    {step.description}
                  </p>

                  {/* Icon */}
                  <div className={styles.iconContainer}>
                    <Icon className={styles.icon} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className={styles.ctaContainer}>
        <Link href="/checkout">
          <button className={styles.ctaButton}>
            Comienza tu camino hoy
          </button>
        </Link>
      </div>
    </section>
  )
}

