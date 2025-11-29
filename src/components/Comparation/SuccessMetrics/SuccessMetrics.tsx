import { Card } from "@/components/Ui/card"
import { IoTrendingUp, IoBriefcase, IoTime } from "react-icons/io5"
import styles from "./SuccessMetrics.module.css"

const metrics = [
  {
    icon: IoTrendingUp,
    value: "224%",
    label: "Aumento salarial promedio",
    color: "text-primary",
  },
  {
    icon: IoBriefcase,
    value: "+3,000",
    label: "Ofertas aplicadas por cliente",
    color: "text-primary",
  },
  {
    icon: IoTime,
    value: "44 días",
    label: "Tiempo promedio para empleo",
    color: "text-primary",
  },
]

export function SuccessMetrics() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>✓ Resultados comprobados</div>
          <h2 className={styles.title}>Casos de éxito reales</h2>
          <p className={styles.subtitle}>Nuestros clientes lograron resultados extraordinarios</p>
        </div>

        <div className={styles.grid}>
          {metrics.map((metric, index) => (
            <Card key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <metric.icon className={styles.metricIcon} />
              </div>
              <div className={styles.metricValue}>{metric.value}</div>
              <p className={styles.metricLabel}>{metric.label}</p>
            </Card>
          ))}
        </div>

        <div className={styles.testimonial}>
          <Card className={styles.testimonialCard}>
            <blockquote className={styles.testimonialQuote}>
              "A diferencia de AI Apply que solo aplica, y Talently que solo conecta con empresas, WorksFound nos
              prepara completamente: CV optimizado, estrategia personalizada, y soporte humano en cada paso."
            </blockquote>
            <p className={styles.testimonialAuthor}>— Cliente WorksFound, Frontend Developer</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
