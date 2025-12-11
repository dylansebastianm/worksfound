'use client'

import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import { FaCheckCircle, FaGlobe, FaClock, FaShieldAlt, FaTrophy, FaBolt, FaChartLine, FaDollarSign } from 'react-icons/fa'
import Testimonios from '@/shared/Testimonios/Testimonios'
import styles from './checkout.module.css'

export default function CheckoutPage() {
  const paymentButtonRef = useRef(null)
  const isInitialized = useRef(false)
  const execScriptRef = useRef(null)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return
    if (!paymentButtonRef.current) return
    if (isInitialized.current) return

    const containerId = 'dp-btn-66229e1c-0ec6-425f-83e4-774a86e3738f'
    const referenceId = '66229e1c-0ec6-425f-83e4-774a86e3738f'

    // Limpiar cualquier botón existente
    const existingButton = document.getElementById(containerId)
    if (existingButton) {
      existingButton.remove()
    }

    // Limpiar cualquier script con data-reference-id existente
    const existingRefScripts = document.querySelectorAll(`script[data-reference-id="${referenceId}"]`)
    existingRefScripts.forEach(script => script.remove())

    // Limpiar el contenedor completamente
    paymentButtonRef.current.innerHTML = ''

    // Marcar como inicializado ANTES de crear el script para evitar duplicados
    isInitialized.current = true

    // Crear el script con data-reference-id
    const referenceScript = document.createElement('script')
    referenceScript.setAttribute('data-reference-id', referenceId)
    paymentButtonRef.current.appendChild(referenceScript)

    // Ejecutar el código exacto del script original
    const scriptCode = `
      (function(){const z=!!window.DlocalGo,s=z?document.querySelector('script[src="https://static.dlocalgo.com/dlocalgo.min.js"]'):document.createElement("script");z||(s.src="https://static.dlocalgo.com/dlocalgo.min.js",s.async=!0,document.body.appendChild(s));s.addEventListener("load",()=>{const e=document.querySelector('script[data-reference-id="66229e1c-0ec6-425f-83e4-774a86e3738f"]'),t=e.parentNode,n="dp-btn-66229e1c-0ec6-425f-83e4-774a86e3738f",c=document.createElement("div");c.id=n,t.insertBefore(c,e);new DlocalGo("cFXMJARieWeaymLxoFOzCCYmudODeVeR").createCheckout(n,{subType:"BUTTON",country:"",currency:"USD",amount:"140",lang:"es",text:"Pagar"})});})()
    `

    // Crear y ejecutar el script
    const execScript = document.createElement('script')
    execScript.textContent = scriptCode
    document.body.appendChild(execScript)
    execScriptRef.current = execScript

    // Cleanup
    return () => {
      isInitialized.current = false
      if (execScriptRef.current && execScriptRef.current.parentNode) {
        execScriptRef.current.parentNode.removeChild(execScriptRef.current)
      }
      // Limpiar botón y scripts al desmontar
      const btn = document.getElementById(containerId)
      if (btn) btn.remove()
      const refScripts = document.querySelectorAll(`script[data-reference-id="${referenceId}"]`)
      refScripts.forEach(script => script.remove())
    }
  }, [])

  return (
    <>
      <Head>
        <title>Checkout - WorksFound</title>
        <meta name="description" content="Completa tu pago para acceder a los servicios de WorksFound" />
      </Head>
      <main className={styles.main}>
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
              <div className={styles.paymentCard}>
                <div className={styles.priceSection}>
                  <p className={styles.priceLabel}>PRECIO ESPECIAL</p>
                  <div className={styles.priceContainer}>
                    <span className={styles.priceAmount}>$150</span>
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
                      <span className={styles.summaryDiscount}>-$70.00</span>
                    </div>
                    <div className={styles.summaryDivider}></div>
                    <div className={styles.summaryTotal}>
                      <span>Total</span>
                      <span>$150.00</span>
                    </div>
                  </div>
                </div>
                {/* Payment Button Area */}
                <div className={styles.paymentButtonArea}>
                  <p className={styles.paymentSecureText}>
                    Pago seguro procesado por DlocalGo
                  </p>
                  <div className={styles.paymentButtonContainer} ref={paymentButtonRef}>
                    {/* El botón de DlocalGo se renderizará aquí */}
                  </div>
                </div>
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
              <div className={styles.terms}>
                <p>
                  Al continuar aceptas nuestros{' '}
                  <a href="/terminos-y-condiciones" className={styles.link}>términos y condiciones</a>
                </p>
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

      </main>
    </>
  )
}
