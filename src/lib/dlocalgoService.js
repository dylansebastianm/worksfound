/**
 * Servicio para interactuar con la API de DlocalGo
 */

const API_BASE_URL = 'https://api-sbx.dlocalgo.com/v1'
const NOTIFICATION_URL =
  'https://services.leadconnectorhq.com/hooks/2QXih6adBOqlYCUJlZAp/webhook-trigger/844745bf-b769-4c6b-88a1-92d05ad9865e'
const BACK_URL = 'https://www.worksfound.com/checkout'
const SUCCESS_URL = 'https://www.worksfound.com/thanks'
const AMOUNT = 140
const CURRENCY = 'USD'

/**
 * Genera un order_id único
 */
function generateOrderId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

/**
 * Crea un pago en DlocalGo
 * @param {Object} params - Parámetros del pago
 * @param {string} params.country - Código del país (ej: 'BR', 'AR', 'MX')
 * @param {string} params.email - Email del cliente
 * @param {string} params.name - Nombre del cliente
 * @returns {Promise<Object>} Respuesta de la API con redirect_url para redirigir al usuario
 */
export async function createPayment({ country, email, name }) {
  // Credenciales de DlocalGo desde variables de entorno
  const API_KEY = process.env.NEXT_PUBLIC_DLOCALGO_API_KEY
  const API_SECRET = process.env.NEXT_PUBLIC_DLOCALGO_API_SECRET

  if (!API_KEY || !API_SECRET) {
    throw new Error(
      'Las credenciales de DlocalGo no están configuradas. Por favor configura NEXT_PUBLIC_DLOCALGO_API_KEY y NEXT_PUBLIC_DLOCALGO_API_SECRET en tu archivo .env.local'
    )
  }

  const orderId = generateOrderId()

  const payload = {
    currency: CURRENCY,
    amount: AMOUNT,
    country: country,
    order_id: orderId,
    description: `Order ${orderId} - WorksFound.io Premium Service`,
    success_url: SUCCESS_URL,
    back_url: BACK_URL,
    notification_url: NOTIFICATION_URL,
    // Campos adicionales opcionales que pueden ser útiles
    customer: {
      email: email,
      name: name,
    },
  }

  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}:${API_SECRET}`,
      },
      body: JSON.stringify(payload),
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

