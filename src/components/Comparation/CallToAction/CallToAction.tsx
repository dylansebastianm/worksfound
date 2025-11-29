import { Card } from "@/components/Ui/card"
import { IoCheckmark } from "react-icons/io5"
import Link from "next/link"
import styles from "./CallToAction.module.css"

const included = [
  "CV ATS optimizado bilingüe 100% por nosotros",
  "Postulación automática en +40 portales",
  "Sesión de coaching 1:1 incluida",
  "Soporte humano por WhatsApp y videollamadas",
  "Sin pagos recurrentes ni costos ocultos",
  "30 días de garantía",
  "El menor riesgo comparado con otras empresas"
]

export function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>Consigue tu próximo trabajo  en menos de 60 días</h2>
              <p className={styles.description}>
                No esperes a tener tiempo libre para buscar empleo. Deja que WorksFound trabaje por ti mientras te
                enfocas en prepararte para las entrevistas.
              </p>

              <ul className={styles.list}>
                {included.map((item, index) => (
                  <li key={index} className={styles.listItem}>
                    <IoCheckmark className={styles.checkIcon} />
                    <span className={styles.listItemText}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.buttons}>
                <Link href="/checkout">
                  <button className={styles.primaryButton}>Comenzar ahora</button>
                </Link>
              </div>
            </div>

            <div className={styles.statsSection}>
              <div className={styles.statsGrid}>
                <Card className={styles.statCard}>
                  <div className={styles.statValue}>10%</div>
                  <div className={styles.statLabel}>Del salario (solo si hay empleo)</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statValue}>USD 150</div>
                  <div className={styles.statLabel}>Pago único inicial</div>
                  <div className={styles.statSubLabel}>Hasta 12 cuotas</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statValue}>+40</div>
                  <div className={styles.statLabel}>Portales de empleo</div>
                </Card>
                <Card className={styles.statCard}>
                  <div className={styles.statValue}>+3000</div>
                  <div className={styles.statLabel}>Auto-aplicaciones en &lt;45 días</div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
