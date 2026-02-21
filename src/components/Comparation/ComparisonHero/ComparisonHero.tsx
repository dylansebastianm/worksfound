import { IoCheckmark } from "react-icons/io5"
import Image from "next/image"
import Link from "next/link"
import { COMPARISON_CONFIG } from "../config"
import styles from "./ComparisonHero.module.css"

export function ComparisonHero() {
  const handleScrollToComparison = () => {
    const element = document.getElementById("comparativa-detallada")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
  
  const showTalently = COMPARISON_CONFIG.talently.enabled
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <IoCheckmark style={{ height: "1rem", width: "1rem" }} />
            Comparación actualizada 2026
          </div>

          <h1 className={styles.title}>
            <span className={styles.subtitle}>Comparativa completa:</span>
            <div className={styles.logosContainer}>
              <span className={styles.worksfound}>
                <span className={styles.worksfoundOrange}>works</span><span className={styles.worksfoundBold}>found</span>
              </span>
              <span className={styles.vs}>vs</span>
              <div className={styles.logoWrapper}>
                <Image src="/assets/logos/aiapply.png" alt="AI Apply" width={140} height={60} className={styles.aiApplyLogo} />
              </div>
              {showTalently && (
                <>
                  <span className={styles.vs}>vs</span>
                  <Image
                    src="/assets/logos/talently-logo.svg"
                    alt="Talently"
                    width={160}
                    height={60}
                    className={styles.talentlyLogo}
                  />
                </>
              )}
            </div>
          </h1>

          <p className={styles.description}>
            Descubre por qué WorksFound es la mejor opción para profesionales tech en Latinoamérica que buscan empleo en
            empresas globales
          </p>

          <div className={styles.buttons}>
            <Link href="/checkout">
              <button className={styles.primaryButton}>Comenzar ahora gratis</button>
            </Link>
            <button className={styles.secondaryButton} onClick={handleScrollToComparison}>
              Ver comparación detallada
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
