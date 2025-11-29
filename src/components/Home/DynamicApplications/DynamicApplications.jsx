'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Card from './Card'
import Badge from './Badge'
import styles from './index.module.css'

const statusConfig = {
  applied: {
    label: 'Postulado',
    color: '#3b82f6',
    textColor: '#1e40af',
    bgColor: '#dbeafe',
  },
  'hr-review': {
    label: 'Entrevista HR',
    color: '#a855f7',
    textColor: '#6b21a8',
    bgColor: '#f3e8ff',
  },
  technical: {
    label: 'Prueba Técnica',
    color: '#fa6501',
    textColor: '#c2410c',
    bgColor: '#ffedd5',
  },
  cultural: {
    label: 'Entrevista Cultural',
    color: '#6366f1',
    textColor: '#4338ca',
    bgColor: '#e0e7ff',
  },
  offer: {
    label: 'Oferta Formal',
    color: '#10b981',
    textColor: '#065f46',
    bgColor: '#d1fae5',
  },
}

// URLs de logos reales de las empresas
const companyLogos = {
  'Stripe': 'https://logo.clearbit.com/stripe.com',
  'Microsoft': 'https://logo.clearbit.com/microsoft.com',
  'Google': 'https://logo.clearbit.com/google.com',
  'Amazon': 'https://logo.clearbit.com/amazon.com',
  'Meta': 'https://logo.clearbit.com/meta.com',
  'Netflix': 'https://logo.clearbit.com/netflix.com',
}

const initialApplications = [
  {
    id: '1',
    company: 'Stripe',
    position: 'Analista de datos',
    status: 'applied',
    skills: ['Analítica', 'Python'],
    time: '3h',
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Socio de estrategia',
    status: 'applied',
    skills: ['Estrategia', 'Liderazgo'],
    time: '4h',
  },
  {
    id: '3',
    company: 'Google',
    position: 'Product Manager',
    status: 'applied',
    skills: ['Producto', 'Agile'],
    time: '5h',
  },
  {
    id: '4',
    company: 'Amazon',
    position: 'Frontend Developer',
    status: 'applied',
    skills: ['React', 'TypeScript'],
    time: '6h',
  },
  {
    id: '5',
    company: 'Meta',
    position: 'UX Designer',
    status: 'applied',
    skills: ['Figma', 'Design'],
    time: '7h',
  },
  {
    id: '6',
    company: 'Netflix',
    position: 'Backend Engineer',
    status: 'applied',
    skills: ['Node.js', 'Microservicios'],
    time: '8h',
  },
]

export default function DynamicApplications() {
  const [applications, setApplications] = useState(initialApplications)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
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

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setApplications((prev) => {
        const newApps = [...prev]

        // Seleccionar una aplicación aleatoria para actualizar
        const randomIndex = Math.floor(Math.random() * newApps.length)
        const app = newApps[randomIndex]

        // Avanzar al siguiente estado
        const statusFlow = ['applied', 'hr-review', 'technical', 'cultural', 'offer']
        const currentStatusIndex = statusFlow.indexOf(app.status)

        if (currentStatusIndex < statusFlow.length - 1) {
          newApps[randomIndex] = {
            ...app,
            status: statusFlow[currentStatusIndex + 1],
          }
        } else {
          // Si llegó a "offer", reiniciar a "applied"
          newApps[randomIndex] = {
            ...app,
            status: 'applied',
          }
        }

        // Reordenar: las más avanzadas arriba
        return newApps.sort((a, b) => {
          const aIndex = statusFlow.indexOf(a.status)
          const bIndex = statusFlow.indexOf(b.status)
          return bIndex - aIndex
        })
      })
    }, 2500) // Cambia cada 2.5 segundos

    return () => clearInterval(interval)
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
            WorksFound.io automatiza tus postulaciones en <span className={styles.emphasis}>+40 portales</span> y acelera tu proceso hacia el empleo
          </p>
        </div>

        {/* Dynamic Applications Grid */}
        <div className={styles.applicationsGrid}>
          {applications.map((app, index) => {
            const config = statusConfig[app.status]

            return (
              <Card
                key={app.id}
                className={`${styles.cardAnimation} ${isVisible ? styles.visible : ''}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardCompany}>
                    <div className={styles.logo}>
                      <Image
                        src={companyLogos[app.company]}
                        alt={`${app.company} logo`}
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className={styles.companyName}>{app.position}</h3>
                      <p className={styles.position}>{app.company}</p>
                    </div>
                  </div>
                  <span className={styles.time}>{app.time}</span>
                </div>

                <div className={styles.skillsContainer}>
                  {app.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div
                  className={styles.statusContainer}
                  style={{
                    backgroundColor: config.bgColor,
                  }}
                >
                  <div
                    className={styles.statusDot}
                    style={{
                      backgroundColor: config.color,
                    }}
                  />
                  <span
                    className={styles.statusLabel}
                    style={{
                      color: config.textColor,
                    }}
                  >
                    {config.label}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Stats Counter */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard} style={{ backgroundColor: '#dbeafe' }}>
            <div className={styles.statNumber} style={{ color: '#2563eb' }}>100</div>
            <div className={styles.statLabel}>Aplicaciones</div>
            <div className={styles.statPercentage} style={{ color: '#2563eb' }}>100%</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#f3e8ff' }}>
            <div className={styles.statNumber} style={{ color: '#9333ea' }}>10</div>
            <div className={styles.statLabel}>Entrevista HR</div>
            <div className={styles.statPercentage} style={{ color: '#9333ea' }}>10%</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#ffedd5' }}>
            <div className={styles.statNumber} style={{ color: '#fa6501' }}>5</div>
            <div className={styles.statLabel}>Prueba Técnica</div>
            <div className={styles.statPercentage} style={{ color: '#fa6501' }}>5%</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#e0e7ff' }}>
            <div className={styles.statNumber} style={{ color: '#6366f1' }}>2</div>
            <div className={styles.statLabel}>Entrevista Cultural</div>
            <div className={styles.statPercentage} style={{ color: '#6366f1' }}>2%</div>
          </div>
          <div className={styles.statCard} style={{ backgroundColor: '#d1fae5' }}>
            <div className={styles.statNumber} style={{ color: '#10b981' }}>1</div>
            <div className={styles.statLabel}>Oferta Formal</div>
            <div className={styles.statPercentage} style={{ color: '#10b981' }}>1%</div>
          </div>
        </div>

        {/* Disclaimer for example values */}
        <p className={styles.disclaimer}>
          * Valores de ejemplo para ilustrar el embudo de reclutamiento
        </p>

        {/* Highlight Box */}
        <div className={styles.highlightBox}>
          <p className={styles.highlightText}>
            <span className={styles.highlightStrong}>
              El secreto está en volumen:
            </span>{' '}
            Mientras más aplicaciones envíes de forma estratégica, mayores son tus probabilidades de conseguir el trabajo ideal.
          </p>
        </div>
      </div>
    </section>
  )
}

