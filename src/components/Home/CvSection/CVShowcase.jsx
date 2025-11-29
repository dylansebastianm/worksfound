'use client'

import { useState } from 'react'
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaCheckCircle } from 'react-icons/fa'
import Badge from '../DynamicApplications/Badge'
import styles from './index.module.css'

const cvContent = {
  en: {
    name: 'Steve Jobs',
    title: 'Innovator & Entrepreneur',
    location: 'Los Altos, CA',
    email: 'steve@apple.com',
    linkedin: 'linkedin.com/in/stevejobs',
    summaryTitle: 'SUMMARY',
    summary: 'Visionary entrepreneur and technology innovator with a track record of revolutionizing industries through pioneering design, user experience and business strategy. Co-founder of Apple Inc., responsible for revolutionizing personal computing, music, telecommunications and digital animation.',
    experienceTitle: 'EXPERIENCE',
    jobTitle: 'Co-founder, President and CEO',
    company: 'Apple Inc.',
    period: '1997-2011',
    achievements: [
      'Launched Apple I and Apple II, the first personal computers for the mass market.',
      'Led the development of the Macintosh, the first commercially successful GUI computer.',
    ]
  },
  es: {
    name: 'Steve Jobs',
    title: 'Innovador y Emprendedor',
    location: 'Los Altos, CA',
    email: 'steve@apple.com',
    linkedin: 'linkedin.com/in/stevejobs',
    summaryTitle: 'RESUMEN',
    summary: 'Emprendedor visionario e innovador tecnológico con historial de revolucionar industrias a través del diseño pionero, experiencia de usuario y estrategia empresarial. Cofundador de Apple Inc., responsable de revolucionar la informática personal, la música, las telecomunicaciones y la animación digital.',
    experienceTitle: 'EXPERIENCIA',
    jobTitle: 'Cofundador, Presidente y CEO',
    company: 'Apple Inc.',
    period: '1997-2011',
    achievements: [
      'Lanzó Apple I y Apple II, las primeras computadoras personales para el mercado masivo.',
      'Dirigió el desarrollo del Macintosh, la primera computadora GUI comercialmente exitosa.',
    ]
  }
}

export default function CVShowcase() {
  const [language, setLanguage] = useState('es')
  const content = cvContent[language]

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Currículum optimizado
        </h2>
        {/* <div className={styles.matchContainer}>
          <FaCheckCircle className={styles.checkIcon} />
          <span className={styles.matchText}>
            99.8% de coincidencia
          </span>
        </div> */}
        <p className={styles.subtitle}>
          Creación de CV ATS friendly 100% hecho por nosotros
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.cvContainer}>
          <div className={styles.languageButtons}>
            <Badge 
              onClick={() => setLanguage('en')}
              className={`${styles.languageBadge} ${language === 'en' ? styles.active : styles.inactive}`}
            >
              <span className={styles.langCode}>EN</span>
              <span className={styles.langText}> English Version</span>
            </Badge>
            <Badge 
              onClick={() => setLanguage('es')}
              className={`${styles.languageBadge} ${language === 'es' ? styles.active : styles.inactive}`}
            >
              <span className={styles.langCode}>ES</span>
              <span className={styles.langText}> Versión Español</span>
            </Badge>
          </div>
          {/* CV Preview Card */}
          <div className={styles.cvCard}>
            <div className={styles.cvHeader}>
              <h3 className={styles.cvName}>{content.name}</h3>
              <p className={styles.cvTitle}>{content.title}</p>
            </div>
            <div className={styles.cvBody}>
              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt className={styles.contactIcon} />
                  <span>{content.location}</span>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <span>{content.email}</span>
                </div>
                <div className={styles.contactItem}>
                  <FaLinkedin className={styles.contactIcon} />
                  <span>{content.linkedin}</span>
                </div>
              </div>
              {/* Resume Section */}
              <div className={styles.sectionContent}>
                <h4 className={styles.sectionTitle}>
                  {content.summaryTitle}
                </h4>
                <p className={styles.sectionText}>
                  {content.summary}
                </p>
              </div>
              {/* Experience Section */}
              <div className={styles.sectionContent}>
                <h4 className={styles.sectionTitle}>
                  {content.experienceTitle}
                </h4>
                <div className={styles.experienceContainer}>
                  <div className={styles.experienceItem}>
                    <div className={styles.experienceHeader}>
                      <div>
                        <h5 className={styles.jobTitle}>
                          {content.jobTitle}
                        </h5>
                        <p className={styles.companyName}>{content.company}</p>
                      </div>
                      <span className={styles.period}>{content.period}</span>
                    </div>
                    <ul className={styles.achievementsList}>
                      {content.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Features List */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <FaCheckCircle className={styles.featureIcon} />
              <div>
                <h5 className={styles.featureTitle}>ATS Optimizado</h5>
                <p className={styles.featureText}>Pasa automáticamente los sistemas de seguimiento de candidatos</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <FaCheckCircle className={styles.featureIcon} />
              <div>
                <h5 className={styles.featureTitle}>Diseño Profesional</h5>
                <p className={styles.featureText}>Creado por expertos en reclutamiento de IT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

