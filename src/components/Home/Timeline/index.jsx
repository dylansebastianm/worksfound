'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

const KickoffIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
    <path strokeWidth="1.5" strokeLinecap="round" d="M12 7v5l3 2" />
  </svg>
)

const CVIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2-13H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 3v2a2 2 0 002 2h2a2 2 0 002-2V3" />
  </svg>
)

const RocketIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m-9-9l9-9 9 9M4 14l8-8 8 8v5a2 2 0 01-2 2h-12a2 2 0 01-2-2v-5z" />
    <circle cx="18" cy="16" r="1.5" fill="currentColor" />
  </svg>
)

const ProcessTimeline = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset cuando sale de la vista para que se anime de nuevo
          setIsVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: 1,
      title: 'Kick-off',
      description: 'Vemos tu caso puntual 1 a 1 y alineamos expectativas',
      icon: <KickoffIcon />
    },
    {
      number: 2,
      title: 'CV Optimizado',
      description: 'Creación de CV ATS friendly 100% hecho por nosotros',
      icon: <CVIcon />
    },
    {
      number: 3,
      title: 'worksFound.io',
      description: 'Acceso a +40 portales de empleo con automatización 100%',
      icon: <RocketIcon />
    }
  ]

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Tu camino hacia el empleo ideal
          </h2>
          <p className={styles.subtitle}>
            Un proceso estructurado diseñado para tu éxito
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {/* Connecting Line */}
          {isVisible && (
            <div className={styles.connectingLine} />
          )}

          {/* Steps */}
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`${styles.step} ${isVisible ? styles.animateSlideUp : styles.opacity0TranslateY4}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Card */}
                <div className={styles.stepCard}>
                  {/* Circle with number */}
                  <div
                    className={`${styles.circle} ${activeStep === index ? styles.circlePulse : ''}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <h3 className={styles.stepTitle}>
                      {step.title}
                    </h3>
                    <p className={styles.stepDescription}>
                      {step.description}
                    </p>
                  </div>

                  <div className={styles.iconContainer}>
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}>
            Comienza tu camino hoy
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline
