'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './stats-showcase.module.css'
import { FaChartLine, FaBullseye, FaCalendar, FaCheckCircle } from 'react-icons/fa'

export function StatsShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [salaryCount, setSalaryCount] = useState(0)
  const [offersCount, setOffersCount] = useState(0)
  const [daysCount, setDaysCount] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Resetear contadores cuando entra en el viewport
          setSalaryCount(0)
          setOffersCount(0)
          setDaysCount(0)
          setIsVisible(true)
        } else {
          // Resetear cuando sale del viewport
          setIsVisible(false)
          setSalaryCount(0)
          setOffersCount(0)
          setDaysCount(0)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animated counters
  useEffect(() => {
    if (!isVisible) return

    const salaryTarget = 224
    const offersTarget = 3000
    const daysTarget = 44
    const duration = 2000
    const steps = 60
    const increment = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setSalaryCount(Math.floor(salaryTarget * progress))
      setOffersCount(Math.floor(offersTarget * progress))
      setDaysCount(Math.floor(daysTarget * progress))

      if (currentStep >= steps) {
        setSalaryCount(salaryTarget)
        setOffersCount(offersTarget)
        setDaysCount(daysTarget)
        clearInterval(timer)
      }
    }, increment)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={sectionRef} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <FaCheckCircle className={styles.badgeIcon} />
            Resultados comprobados
          </div>
          <h2 className={styles.title}>Casos de éxito reales</h2>
          <p className={styles.subtitle}>
            Nuestros clientes lograron resultados extraordinarios
          </p>
        </div>
        <div className={`${styles.unifiedCard} ${isVisible ? styles.fadeInUp : ''}`}>
          {/* Featured stat - Salary increase */}
          <div className={styles.featuredStat}>
            <div className={styles.statIconWrapper}>
              <div className={styles.statIconCircle}>
                <FaChartLine className={styles.statIcon} />
              </div>
              <div className={styles.pulseRing}></div>
            </div>
            <div className={styles.statValue}>
              <span className={styles.animatedNumber}>{salaryCount}</span>
              <span className={styles.percentage}>%</span>
            </div>
            <div className={styles.statLabel}>Aumento salarial</div>
          </div>
          <div className={styles.verticalDivider}></div>
          {/* Secondary stats side by side */}
          <div className={styles.secondaryStats}>
            <div className={styles.secondaryStat}>
              <div className={styles.statIconSmall}>
                <FaBullseye />
              </div>
              <div className={styles.statValueSmall}>
                +{offersCount.toLocaleString()}
              </div>
              <div className={styles.statLabelSmall}>Ofertas aplicadas por cliente</div>
            </div>
            <div className={styles.horizontalDivider}></div>
            <div className={styles.secondaryStat}>
              <div className={styles.statIconSmall}>
                <FaCalendar />
              </div>
              <div className={styles.statValueSmall}>
                {daysCount}
              </div>
              <div className={styles.statLabelSmall}>Días promedio para empleo</div>
            </div>
          </div>
          <div className={styles.glowEffect}></div>
        </div>
        <div className={`${styles.disclaimer} ${isVisible ? styles.fadeIn : ''}`}>
          * Datos basados en casos de éxito de clientes que completaron el programa
        </div>
      </div>
    </section>
  )
}

export default StatsShowcase

