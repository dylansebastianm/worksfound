/**
 * API Route para crear pagos en DlocalGo
 * Esta ruta actúa como proxy para evitar problemas de CORS
 */

// URL de la API de DlocalGo
// Por defecto usa producción (funciona en localhost y producción)
// Para usar sandbox, agrega NEXT_PUBLIC_DLOCALGO_ENV=sandbox en .env.local
const getApiBaseUrl = () => {
  // Si está explícitamente configurado como sandbox, usar sandbox
  if (process.env.NEXT_PUBLIC_DLOCALGO_ENV === 'sandbox') {
    return 'https://api-sbx.dlocalgo.com/v1'
  }
  // Por defecto usa producción (funciona en localhost y producción)
  return 'https://api.dlocalgo.com/v1'
}

const API_BASE_URL = getApiBaseUrl()
const NOTIFICATION_URL =
  'https://services.leadconnectorhq.com/hooks/2QXih6adBOqlYCUJlZAp/webhook-trigger/844745bf-b769-4c6b-88a1-92d05ad9865e'
const BACK_URL = 'https://www.worksfound.com/checkout'
const SUCCESS_URL = 'https://www.worksfound.com/thanks'
const AMOUNT = 1
const CURRENCY = 'USD'

/**
 * Genera un order_id único
 */
function generateOrderId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { country } = req.body

    // Validar que se proporcione el país
    if (!country) {
      return res.status(400).json({ message: 'Country is required' })
    }

    // Credenciales de DlocalGo desde variables de entorno
    const API_KEY = process.env.NEXT_PUBLIC_DLOCALGO_API_KEY
    const API_SECRET = process.env.NEXT_PUBLIC_DLOCALGO_API_SECRET

    if (!API_KEY || !API_SECRET) {
      return res.status(500).json({
        message:
          'Las credenciales de DlocalGo no están configuradas. Por favor configura NEXT_PUBLIC_DLOCALGO_API_KEY y NEXT_PUBLIC_DLOCALGO_API_SECRET en tu archivo .env.local',
      })
    }

    const orderId = generateOrderId()

    const payload = {
      currency: CURRENCY,
      amount: AMOUNT,
      country: country,
      order_id: orderId,
      description: worksfound.io,
      success_url: SUCCESS_URL,
      back_url: BACK_URL,
      notification_url: NOTIFICATION_URL,
    }

    // Construir el Bearer token exactamente como lo requiere la documentación
    // Formato: Bearer <API_KEY>:<SECRET_KEY>
    const bearerToken = `${API_KEY.trim()}:${API_SECRET.trim()}`
    const authorizationHeader = `Bearer ${bearerToken}`

    // Hacer la petición a DlocalGo desde el servidor
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return res.status(response.status).json({
        message:
          errorData.message ||
          errorData.error ||
          `Error al crear el pago: ${response.status} ${response.statusText}`,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Error al procesar el pago',
    })
  }
}

