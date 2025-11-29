// Configuración de empresas visibles en la comparación
export const COMPARISON_CONFIG = {
  worksfound: {
    enabled: true,
    name: "WorksFound",
  },
  aiapply: {
    enabled: true,
    name: "AI Apply",
  },
  talently: {
    enabled: false, // Cambiar a true para mostrar Talently
    name: "Talently",
  },
} as const

// Helper para obtener empresas activas
export function getActiveCompanies() {
  return Object.entries(COMPARISON_CONFIG)
    .filter(([_, config]) => config.enabled)
    .map(([key, config]) => ({ key, ...config }))
}

