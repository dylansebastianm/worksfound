import Head from "next/head"
import { ComparisonHero } from "@/components/Comparation/ComparisonHero/ComparisonHero"
import { ComparisonTable } from "@/components/Comparation/ComparisonTable/ComparisonTable"
import { KeyDifferences } from "@/components/Comparation/KeyDifferences/KeyDifferences"
import { ValueProposition } from "@/components/Comparation/ValueProposition/ValueProposition"
import { SuccessMetrics } from "@/components/Comparation/SuccessMetrics/SuccessMetrics"
import { CallToAction } from "@/components/Comparation/CallToAction/CallToAction"
import styles from "./comparacion.module.css"
import { useEffect } from "react"

export default function ComparacionPage() {
  useEffect(() => {
    console.log("DEBUG comparacion", {
      ComparisonHero,
      ComparisonTable,
      KeyDifferences,
      ValueProposition,
      SuccessMetrics,
      CallToAction,
    })
  }, [])
  return (
    <>
      <Head>
        <title>Comparación de plataformas - WorksFound vs Competencia</title>
        <meta 
          name="description" 
          content="Compara WorksFound con otras plataformas de búsqueda de empleo. Descubre por qué WorksFound es la mejor opción para profesionales tech en Latinoamérica." 
        />
        <meta name="keywords" content="comparación, búsqueda de empleo, plataformas de trabajo, WorksFound vs competencia, AI Apply, Talently" />
        <meta property="og:title" content="Comparación de plataformas - WorksFound vs Competencia" />
        <meta 
          property="og:description" 
          content="Compara WorksFound con otras plataformas de búsqueda de empleo. Descubre por qué WorksFound es la mejor opción." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.worksfound.com/comparacion" />
      </Head>
      <main className={styles.main}>
        <ComparisonHero />
        <KeyDifferences />
        <ComparisonTable />
        <ValueProposition />
        <SuccessMetrics />
        <CallToAction />
      </main>
    </>
  )
}

