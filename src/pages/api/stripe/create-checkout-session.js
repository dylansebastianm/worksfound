import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({
      message:
        'Falta STRIPE_SECRET_KEY en variables de entorno. Configúrala en .env.local',
    })
  }

  try {
    const stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    })

    const { successPath, cancelPath } = req.body || {}

    const origin =
      req.headers.origin ||
      (req.headers.host ? `https://${req.headers.host}` : process.env.NEXT_PUBLIC_SITE_URL)

    if (!origin) {
      return res.status(500).json({
        message:
          'No pude determinar el origin del sitio. Configura NEXT_PUBLIC_SITE_URL en .env.local',
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Para poder recuperar datos del comprador de forma consistente
      customer_creation: 'always',
      // Pide teléfono en el checkout (además del email que Stripe solicita por defecto)
      phone_number_collection: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'WorksFound.io Premium',
              description:
                'Automatización de postulaciones + CV optimizado ATS',
            },
            unit_amount: 14000, // $140.00 USD
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}${successPath || '/thanks'}?provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath || '/checkout-2'}?canceled=1`,
    })

    return res.status(200).json({ sessionId: session.id })
  } catch (error) {
    return res.status(500).json({
      message: error?.message || 'Error creando sesión de Stripe',
    })
  }
}

