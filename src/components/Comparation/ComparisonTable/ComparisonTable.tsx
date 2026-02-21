import { Card } from "@/components/Ui/card"
import { IoCheckmark, IoClose } from "react-icons/io5"
import { HiMinus } from "react-icons/hi"
import { COMPARISON_CONFIG } from "../config"
import styles from "./ComparisonTable.module.css"

const comparisonData = [
  {
    category: "Funcionalidades principales",
    items: [
      {
        feature: "CV ATS Optimizado",
        worksfound: "✓ 100% incluido",
        aiapply: "✗ Auto-apply",
        talently: "✗ Bolsa de empleo reducida",  
      },
      {
        feature: "Postulación automática",
        worksfound: "✓ +40 portales",
        aiapply: "✗ Bolsa de empleo limitada",
        talently: "✗ No",
      },
    ],
  },
  {
    category: "Precios y condiciones",
    items: [
      {
        feature: "Riesgo de inversión",
        worksfound: "Bajo",
        worksfoundRisk: "low",
        aiapply: "Alto",
        aiapplyRisk: "high",
        talently: "Nulo",
        talentlyRisk: "none",
      },
      {
        feature: "Pago inicial",
        worksfound: "USD 140 en un solo pago",
        worksfoundNote: "Cubre 3 meses completos",
        worksfoundSubnote: "Financiable hasta 12 cuotas según banco",
        aiapply: "USD 180",
        aiapplyNote: "150 por auto-apply + 30 CV",
        aiapplySubnote: "Por mes",
        talently: "No aplica",
      },
      {
        feature: "Costo trimestral",
        worksfound: "USD 140",
        aiapply: "USD 540 (USD 180 × 3 meses)",
        talently: "No aplica",
      },
    ],
  },
  {
    category: "Soporte y alcance",
    items: [
      {
        feature: "Canales de soporte",
        worksfound: "✓ Chat, WhatsApp, Videollamadas",
        aiapply: "✓ Email, tickets",
        talently: "✓ Email, Chat",
      },
      {
        feature: "Optimizado para LATAM",
        worksfound: "✓ Especializado",
        aiapply: "✗ Global genérico",
        talently: "✓ Especializado",
      },
      {
        feature: "Aumento salarial promedio",
        worksfound: "✓ 224%",
        aiapply: "✗ N/A",
        talently: "✗ No aplica",
      },
    ],
  },
]

function getIcon(value: string, risk: string | null = null) {
  if (value.includes("✓")) return <IoCheckmark className={styles.checkIcon} />
  if (value.includes("✗")) return <IoClose className={styles.xIcon} />
  if (value.includes("―")) return <HiMinus className={styles.minusIcon} />
  if (risk === "low")
    return (
      <div className={styles.riskIcons}>
        <div className={styles.riskIconLow}>
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.riskIcon}>
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
        </div>
      </div>
    )
  if (risk === "high")
    return (
      <div className={styles.riskIcons}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.riskIconHigh}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.riskIcon}>
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>
        ))}
      </div>
    )
  if (risk === "medium")
    return (
      <div className={styles.riskIcons}>
        {[1, 2].map((i) => (
          <div key={i} className={styles.riskIconMedium}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.riskIcon}>
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>
        ))}
      </div>
    )
  return null
}

function renderAiapplyValue(text: string, hasNote: boolean, hasSubnote: boolean) {
  const match = text.match(/^USD 540 \((.+)\)$/)
  if (match) {
    return (
      <span className={styles.valueTextMuted}>
        <span className={styles.valueText}>USD 540</span>{' '}
        <span className={styles.subnote} style={{ display: 'inline' }}>({match[1]})</span>
      </span>
    )
  }
  return (
    <span className={hasNote && !hasSubnote ? styles.valueTextBold : styles.valueTextMuted}>
      {text}
    </span>
  )
}

export function ComparisonTable() {
  const showTalently = COMPARISON_CONFIG.talently.enabled
  const platformCount = showTalently ? 3 : 2
  const subtitle = showTalently
    ? "WorksFound vs AI Apply vs Talently: todos los detalles lado a lado"
    : "WorksFound vs AI Apply: todos los detalles lado a lado"
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} id="comparativa-detallada">
          <h2 className={styles.title}>Comparativa entre {platformCount} plataformas</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.sections}>
          {comparisonData.map((section, sectionIndex) => (
            <Card key={sectionIndex} className={styles.card}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{section.category}</h3>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead className={styles.tableHead}>
                    <tr>
                      <th className={styles.th}>Característica</th>
                      <th className={`${styles.th} ${styles.thWorksfound}`}>WorksFound</th>
                      <th className={styles.th}>AI Apply</th>
                      {showTalently && <th className={styles.th}>Talently</th>}
                    </tr>
                  </thead>
                  <tbody className={styles.tbody}>
                    {section.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className={styles.td}>
                          <span className={styles.featureLabel}>{item.feature}</span>
                        </td>
                        <td className={`${styles.td} ${styles.tdWorksfound}`}>
                          <div className={styles.valueContainer}>
                            {getIcon(item.worksfound, item.worksfoundRisk)}
                            <span className={styles.valueText}>{item.worksfound.replace(/[✓✗―]\s*/, "")}</span>
                          </div>
                          {item.worksfoundNote && <p className={styles.note}>{item.worksfoundNote}</p>}
                          {item.worksfoundSubnote && <p className={styles.subnote}>{item.worksfoundSubnote}</p>}
                        </td>
                        <td className={styles.td}>
                          <div className={styles.valueContainer}>
                            {getIcon(item.aiapply, item.aiapplyRisk)}
                            {renderAiapplyValue(
                              item.aiapply.replace(/[✓✗―]\s*/, ""),
                              !!item.aiapplyNote,
                              !!item.aiapplySubnote
                            )}
                          </div>
                          {item.aiapplyNote && <p className={styles.subnote}>{item.aiapplyNote}</p>}
                          {item.aiapplySubnote && <p className={styles.subnote}>{item.aiapplySubnote}</p>}
                        </td>
                        {showTalently && (
                          <td className={styles.td}>
                            <div className={styles.valueContainer}>
                              {getIcon(item.talently, item.talentlyRisk)}
                              <span className={styles.valueTextMuted}>{item.talently.replace(/[✓✗―]\s*/, "")}</span>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
