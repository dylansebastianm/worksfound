import { Card } from "@/components/Ui/card"
import { IoCheckmark, IoClose } from "react-icons/io5"
import Image from "next/image"
import { COMPARISON_CONFIG } from "../config"
import styles from "./KeyDifferences.module.css"

const platforms = [
  {
    name: "WorksFound",
    key: "worksfound",
    color: "primary",
    logo: null,
    features: [
      { text: "CV ATS optimizado incluido", included: true },
      { text: "+40 portales automáticos", included: true },
      { text: "Soporte humano en tiempo real", included: true },
      { text: "Precio USD 140 (3 meses)", included: true },
    ],
  },
  {
    name: "AI Apply",
    key: "aiapply",
    color: "blue",
    logo: "/assets/logos/aiapply.png",
    features: [
      { text: "CV ATS optimizado incluido", included: false },
      { text: "Auto-apply", included: true },
      { text: "Soporte humano en tiempo real", included: false },
      { text: "Precio desde USD 180/mes", included: true },
    ],
  },
  {
    name: "Talently",
    key: "talently",
    color: "purple",
    logo: "/assets/logos/talently-logo.svg",
    features: [
      { text: "Bolsa de empleo limitada", included: true },
      { text: "Soporte humano en tiempo real", included: false },
      { text: "Solo ofertas de IT", included: false },
    ],
  },
]

export function KeyDifferences() {
  const activePlatforms = platforms.filter(
    (platform) => COMPARISON_CONFIG[platform.key as keyof typeof COMPARISON_CONFIG]?.enabled
  )
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Diferencias clave en un vistazo</h2>
          <p className={styles.subtitle}>Compara lo que realmente importa para tu búsqueda de empleo</p>
        </div>

        <div className={styles.grid}>
          {activePlatforms.map((platform) => (
            <Card
              key={platform.name}
              className={`${styles.card} ${platform.name === "WorksFound" ? styles.cardWorksfound : ""}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderContent}>
                  <h3
                    className={`${styles.cardTitle} ${platform.name === "WorksFound" ? styles.cardTitleWorksfound : ""}`}
                  >
                    {platform.name}
                  </h3>
                  {platform.name === "WorksFound" && <span className={styles.badge}>Recomendado</span>}
                </div>
                {platform.logo && (
                  <div className={styles.logoWrapper}>
                    <Image
                      src={platform.logo || "/placeholder.svg"}
                      alt={`${platform.name} logo`}
                      fill
                      style={
                        platform.name === "AI Apply"
                          ? {
                              objectFit: "contain",
                              filter:
                                "brightness(0) saturate(100%) invert(45%) sepia(67%) saturate(2000%) hue-rotate(230deg) brightness(95%) contrast(95%)",
                            }
                          : { objectFit: "contain" }
                      }
                    />
                  </div>
                )}
              </div>

              <ul className={styles.featuresList}>
                {platform.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature.included ? (
                      <IoCheckmark
                        style={{
                          marginTop: "0.125rem",
                          height: "1.5rem",
                          width: "1.5rem",
                          flexShrink: 0,
                          color: "var(--primary)",
                        }}
                      />
                    ) : (
                      <IoClose
                        style={{
                          marginTop: "0.125rem",
                          height: "1.5rem",
                          width: "1.5rem",
                          flexShrink: 0,
                          color: "var(--muted-foreground)",
                        }}
                      />
                    )}
                    <span className={feature.included ? styles.featureText : styles.featureTextDisabled}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
