'use client'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from './email-templates.module.css'

const templates = [
  { name: 'Bienvenida', file: 'welcome.html' },
]

export default function EmailTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].file)
  const [htmlContent, setHtmlContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTemplate(selectedTemplate)
  }, [selectedTemplate])

  const loadTemplate = async (templateFile) => {
    setLoading(true)
    try {
      // Cargar el template desde la API route
      const response = await fetch(`/api/email-templates/${templateFile}`)
      if (response.ok) {
        const data = await response.json()
        setHtmlContent(data.html)
      } else {
        setHtmlContent('<p>Error al cargar el template</p>')
      }
    } catch (error) {
      console.error('Error loading template:', error)
      setHtmlContent('<p>Error al cargar el template</p>')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Email Templates Preview - WorksFound</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Templates</h2>
          <div className={styles.templateList}>
            {templates.map((template) => (
              <button
                key={template.file}
                className={`${styles.templateButton} ${
                  selectedTemplate === template.file ? styles.active : ''
                }`}
                onClick={() => setSelectedTemplate(template.file)}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.preview}>
          <div className={styles.previewHeader}>
            <h1 className={styles.previewTitle}>Preview: {templates.find(t => t.file === selectedTemplate)?.name}</h1>
          </div>
          <div className={styles.previewContent}>
            {loading ? (
              <div className={styles.loading}>Cargando...</div>
            ) : (
              <iframe
                srcDoc={htmlContent}
                className={styles.iframe}
                title="Email Preview"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

