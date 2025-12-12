/**
 * Servicio para interactuar con la API de DlocalGo
 * Usa una API route de Next.js como proxy para evitar problemas de CORS
 */

/**
 * Crea un pago en DlocalGo
 * @param {Object} params - Parámetros del pago
 * @param {string} params.country - Código del país (ej: 'BR', 'AR', 'MX')
 * @param {string} params.phone - Número de teléfono con código de país (ej: '+1234567890')
 * @returns {Promise<Object>} Respuesta de la API con redirect_url para redirigir al usuario
 */
export async function createPayment({ country, phone }) {
  try {
    // Llamar a nuestra API route que actúa como proxy
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, phone }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message ||
          `Error al crear el pago: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en createPayment:', error)
    throw error
  }
}

