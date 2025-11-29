import { Card } from "@/components/Ui/card"
import { IoGlobeOutline, IoPeopleOutline, IoFlashOutline, IoAnalyticsOutline } from "react-icons/io5"
import styles from "./ValueProposition.module.css"

const benefits = [
  {
    icon: IoAnalyticsOutline,
    title: "Enfoque en resultados reales",
    description:
      "No solo aplicamos, te preparamos para ganar. CV optimizado bilingue + automatización = +80% de probabilidad de ser contratado en menos de 45 días.",
  },
  {
    icon: IoGlobeOutline,
    title: "+40 portales de empleo",
    description:
      "Postulación automática en LinkedIn, Indeed, Glassdoor, Bumeran y más. Tu perfil trabajando 24/7 para ti.",
  },
  {
    icon: IoPeopleOutline,
    title: "Soporte humano real",
    description:
      "WhatsApp con asesoramiento personalizado de L a V.",
  },
  {
    icon: IoFlashOutline,
    title: "Optimizado para LATAM",
    description:
      "Conocemos el mercado latinoamericano y te conectamos con empresas que valoran el talento de la región.",
  },
]

export function ValueProposition() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>¿Por qué elegir WorksFound?</h2>
          <p className={styles.subtitle}>
            La diferencia WorksFound no está solo en lo que hacemos, sino en cómo lo hacemos
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((benefit, index) => (
            <Card key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <benefit.icon className={styles.icon} />
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
