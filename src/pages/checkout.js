'use client'

import React from 'react'
import Head from 'next/head'
import { FaCheckCircle, FaGlobe, FaClock, FaShieldAlt, FaTrophy, FaBolt, FaChartLine, FaDollarSign } from 'react-icons/fa'
import Testimonios from '@/shared/Testimonios/Testimonios'
import CheckoutForm from '@/components/Forms/CheckoutForm/CheckoutForm'
import styles from './checkout.module.css'

export default function CheckoutPage() {

  return (
    <>
      <Head>
        <title>Checkout - WorksFound</title>
        <meta name="description" content="Completa tu pago para acceder a los servicios de WorksFound" />
      </Head>
      <main className={styles.main}>
        <div className={styles.scaled}>
          <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.badge}>WorksFound.io Premium</span>
            <h1 className={styles.title}>
              Tu camino hacia el empleo ideal comienza ahora
            </h1>
            <p className={styles.subtitle}>
              Automatización completa de postulaciones en +40 portales con CV optimizado y sesión personalizada
            </p>
          </div>
          <div className={styles.gridLayout}>
            {/* Left Column - Service Summary */}
            <div className={styles.leftColumn}>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                  Lo que incluye tu servicio
                </h2>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <FaGlobe className={styles.icon} />
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>Postulación automática a +40 portales</h3>
                      <p className={styles.featureDescription}>
                        LinkedIn, Bumeran, Indeed, Glassdoor y más de 36 plataformas adicionales
                      </p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <FaCheckCircle className={styles.icon} />
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>CV optimizado ATS bilingüe</h3>
                      <p className={styles.featureDescription}>
                        Currículum profesional en inglés y español, optimizado para sistemas de tracking
                      </p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <FaClock className={styles.icon} />
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>Sesión de coaching general</h3>
                      <p className={styles.featureDescription}>
                        Sesión personalizada para mejorar tu perfil y estrategia de búsqueda laboral
                      </p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <FaBolt className={styles.icon} />
                    </div>
                    <div>
                      <h3 className={styles.featureTitle}>Inclusión en base de datos de empresas</h3>
                      <p className={styles.featureDescription}>
                        Serás incluido en nuestra base de datos donde más de 250 empresas buscan candidatos de IT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Benefits */}
              <div className={styles.benefitsGrid}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <FaGlobe />
                  </div>
                  <div className={styles.benefitContent}>
                    <div className={styles.benefitNumber}>+40</div>
                    <div className={styles.benefitLabel}>Portales de empleo</div>
                  </div>
                </div>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <FaBolt />
                  </div>
                  <div className={styles.benefitContent}>
                    <div className={styles.benefitNumber}>10x</div>
                    <div className={styles.benefitLabel}>Más rápido que postular manualmente</div>
                  </div>
                </div>
              </div>
              <div className={styles.paymentTermsCard}>
                <div className={styles.paymentTermsIcon}>
                  <FaDollarSign />
                </div>
                <div className={styles.paymentTermsContent}>
                  <h3 className={styles.paymentTermsTitle}>Ingreso a bajo costo</h3>
                  <p className={styles.paymentTermsText}>
                    Termina de pagar <strong>SOLO si consigues empleo</strong> con nuestra ayuda.
                    Tu éxito es nuestro compromiso.
                  </p>
                </div>
              </div>
              <div className={styles.successCard}>
                <div className={styles.successIcon}>
                  <FaChartLine />
                </div>
                <div className={styles.successContent}>
                  <h3 className={styles.successTitle}>Incrementa tus posibilidades</h3>
                  <p className={styles.successText}>
                    de ser contratado en menos tiempo al estar presente en más portales simultáneamente
                  </p>
                </div>
              </div>
              {/* Testimonios Section */}
              <div className={styles.testimoniosMini}>
                <Testimonios variant="mini" cardHeight={185} />
              </div>
            </div>
            {/* Right Column - Payment Area */}
            <div className={styles.rightColumn}>
              <div className={styles.paymentCard}>
                <div className={styles.priceSection}>
                  <p className={styles.priceLabel}>PRECIO ESPECIAL</p>
                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>$140</span>
                    <span className={styles.priceCurrency}>USD</span>
                  </div>
                  <p className={styles.priceSubtext}>Pago único - Sin suscripción</p>
                </div>
                <div className={styles.summaryBox}>
                  <h3 className={styles.summaryTitle}>Resumen del pedido</h3>
                  <div className={styles.summaryList}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Servicio WorksFound.io</span>
                      <span className={styles.summaryValue}>$220.00</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Descuento Early Access</span>
                      <span className={styles.summaryDiscount}>-$80.00</span>
                    </div>
                    <div className={styles.summaryDivider}></div>
                    <div className={styles.summaryTotal}>
                      <span>Total</span>
                      <span>$140.00</span>
                    </div>
                  </div>
                </div>
                {/* Checkout Form */}
                <CheckoutForm />
                <div className={styles.securityBadge}>
                  <FaShieldAlt className={styles.securityIcon} />
                  <span>Pago 100% seguro con encriptación SSL</span>
                </div>
              </div>
              {/* Trust Elements */}
              <div className={styles.guaranteeCard}>
                <div className={styles.guaranteeContent}>
                  <FaTrophy className={styles.guaranteeIcon} />
                  <div>
                    <h4 className={styles.guaranteeTitle}>Garantía de tiempo extendida</h4>
                    <p className={styles.guaranteeText}>
                      30 días adicionales si no consigues empleo en los primeros 60 días
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Trust Bar */}
          <div className={styles.trustBar}>
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <FaCheckCircle className={styles.trustIcon} style={{ color: '#16a34a' }} />
                <p className={styles.trustText}>Pago seguro</p>
              </div>
              <div className={styles.trustItem}>
                <FaShieldAlt className={styles.trustIcon} style={{ color: '#2563eb' }} />
                <p className={styles.trustText}>Datos protegidos</p>
              </div>
              <div className={styles.trustItem}>
                <FaTrophy className={styles.trustIcon} style={{ color: '#ea580c' }} />
                <p className={styles.trustText}>Garantía 30 días</p>
              </div>
              <div className={styles.trustItem}>
                <FaBolt className={styles.trustIcon} style={{ color: '#9333ea' }} />
                <p className={styles.trustText}>Acceso inmediato</p>
              </div>
            </div>
          </div>
          </div>
        </div>

      </main>
    </>
  )
}
