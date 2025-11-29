import { Card } from "@/components/Layout/Ui/card"
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
              "Ninguna empresa puede garantizar la contratación, es uno el que va a las entrevistas, tiene que hacer quizás pruebas técnicas. Pero entre hacerlo solo o con ayuda elegiría mil veces worksfound que a diferencia de otras empresas el riesgo es muchísimo menor"
            </blockquote>
            <p className={styles.testimonialAuthor}>— Joaquín Brondo, Full Stack Developer</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
