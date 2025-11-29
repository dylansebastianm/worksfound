import { IoCheckmark } from "react-icons/io5"
import Image from "next/image"
import styles from "./ComparisonHero.module.css"

export function ComparisonHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <IoCheckmark style={{ height: "1rem", width: "1rem" }} />
            Comparación actualizada 2025
          </div>

          <h1 className={styles.title}>
            <span className={styles.subtitle}>Comparativa completa:</span>
            <div className={styles.logosContainer}>
              <span className={styles.worksfound}>
                works<span className={styles.worksfoundBold}>found</span>
              </span>
              <span className={styles.vs}>vs</span>
              <div className={styles.logoWrapper}>
                <Image src="/assets/logos/aiapply.png" alt="AI Apply" width={140} height={60} className={styles.aiApplyLogo} />
              </div>
              <span className={styles.vs}>vs</span>
              <Image
                src="/assets/logos/talently-logo.svg"
                alt="Talently"
                width={160}
                height={60}
                className={styles.talentlyLogo}
              />
            </div>
          </h1>

          <p className={styles.description}>
            Descubre por qué WorksFound es la mejor opción para profesionales tech en Latinoamérica que buscan empleo en
            empresas globales
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryButton}>Comenzar ahora gratis</button>
            <button className={styles.secondaryButton}>Ver comparación detallada</button>
          </div>
        </div>
      </div>
    </section>
  )
}
