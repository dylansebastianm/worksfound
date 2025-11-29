'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

const RecruitmentFunnel = () => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  const [animatedPercentages, setAnimatedPercentages] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset cuando sale de la vista para que se anime de nuevo
          setIsVisible(false)
          setAnimatedPercentages({})
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stages = [
    {
      name: 'Aplicaciones',
      count: 100,
      percentage: 100,
      visualWidth: 100, // Ancho visual simbólico
      delay: 0
    },
    {
      name: 'Entrevista HR',
      count: 10,
      percentage: 10,
      visualWidth: 50, // Más visual que 10%
      delay: 200
    },
    {
      name: 'Entrevista Técnica',
      count: 5,
      percentage: 5,
      visualWidth: 30, // Más visual que 5%
      delay: 400
    },
    {
      name: 'Entrevista Cultural',
      count: 2,
      percentage: 2,
      visualWidth: 18, // Más visual que 2%
      delay: 600
    },
    {
      name: 'Oferta Formal',
      count: 1,
      percentage: 1,
      visualWidth: 12, // Más visual que 1%
      delay: 800
    }
  ]

  useEffect(() => {
    if (isVisible) {
      stages.forEach((stage) => {
        setTimeout(() => {
          setAnimatedPercentages((prev) => ({
            ...prev,
            [stage.name]: stage.visualWidth
          }))
        }, stage.delay)
      })
    }
  }, [isVisible])

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Aplica a miles de ofertas laborales de forma automática
          </h2>
          <p className={styles.subtitle}>
            Así es cómo <span className={styles.subtleEmphasis}>WorksFound.io</span> automatiza tus postulaciones en +40 portales y acelera tu proceso hacia el empleo
          </p>
        </div>

        {/* Two Column Layout */}
        <div className={styles.layoutGrid}>
          {/* Left: Funnel Chart */}
          <div className={styles.funnelContainer}>
            <div className={styles.stagesGroup}>
              {stages.map((stage, index) => (
                <div
                  key={stage.name}
                  className={`${styles.stage} ${isVisible ? styles.visible : styles.hidden}`}
                  style={{ animationDelay: `${stage.delay}ms` }}
                >
                  <div className={styles.stageContent}>
                    <div className={styles.stageLabel}>
                      <span className={styles.stageName}>{stage.name}</span>
                      <span className={styles.stageCount}>
                        {stage.count}
                      </span>
                    </div>
                    <div
                      className={`${styles.stageBar} ${isVisible ? styles.animateBar : ''}`}
                      style={{
                        width: `${animatedPercentages[stage.name] || 0}%`,
                        minWidth: '80px', // Ancho mínimo para que se vea bien
                        transitionDelay: `${stage.delay}ms`
                      }}
                    >
                      <span className={styles.stagePercentage}>
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Explanation */}
          <div className={`${styles.explanation} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.stageContent}>
              <h3 className={styles.explanationTitle}>
                ¿Cómo funciona?
              </h3>
              <p className={styles.explanationText}>
                WorksFound.io toma tu CV optimizado y lo postula automáticamente en todos los portales disponibles. Desde el primer momento, tus candidaturas están llegando a empresas reales.
              </p>

              <div className={styles.funnelBox}>
                <h4 className={styles.funnelBoxTitle}>
                   De 100 aplicaciones...
                </h4>
                <ul className={styles.funnelBoxList}>
                  <li className={styles.funnelBoxItem}>✓ 10 avanzan a entrevista HR</li>
                  <li className={styles.funnelBoxItem}>✓ 5 superan la prueba técnica</li>
                  <li className={styles.funnelBoxItem}>✓ 2 llegan a entrevista cultural</li>
                  <li className={styles.funnelBoxItem}>✓ 1 recibe oferta formal</li>
                </ul>
              </div>

              <div className={styles.highlightBox}>
                <p className={styles.highlightText}>
                  <span className={styles.highlightStrong}>
                    El secreto está en volumen:
                  </span>{' '}
                  Mientras más aplicaciones envíes de forma estratégica, mayores son tus probabilidades de conseguir el trabajo ideal.
                </p>
              </div>

              <button className={styles.ctaButton}>
                Ver cómo funciona
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecruitmentFunnel
