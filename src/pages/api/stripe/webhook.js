import Stripe from 'stripe'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed')
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey) {
    return res.status(500).send('Missing STRIPE_SECRET_KEY')
  }
  if (!webhookSecret) {
    return res.status(500).send('Missing STRIPE_WEBHOOK_SECRET')
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2024-06-20',
  })

  let event
  try {
    const buf = await readRawBody(req)
    const sig = req.headers['stripe-signature']
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err?.message || 'invalid signature'}`)
  }

  // Solo nos importa el evento de Checkout completado (pago confirmado)
  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object

      // Expandimos el PaymentIntent para incluir datos del comprador (charges/billing_details)
      let paymentIntent = null
      if (session.payment_intent) {
        paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent, {
          expand: ['charges.data.billing_details'],
        })
      }

      const payload = {
        provider: 'stripe',
        eventId: event.id,
        eventType: event.type,
        created: event.created,
        livemode: event.livemode,
        checkoutSession: session,
        paymentIntent,
      }

      const leadconnectorUrl =
        process.env.LEADCONNECTOR_WEBHOOK_URL ||
        'https://services.leadconnectorhq.com/hooks/2QXih6adBOqlYCUJlZAp/webhook-trigger/9787e9da-a1ae-4737-92ae-d0c02b899519'

      const resp = await fetch(leadconnectorUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!resp.ok) {
        const text = await resp.text().catch(() => '')
        // Devolvemos 500 para que Stripe reintente (importante si el webhook destino cae)
        return res
          .status(500)
          .send(`LeadConnector webhook failed: ${resp.status} ${resp.statusText} ${text}`)
      }
    } catch (err) {
      return res.status(500).send(`Handler error: ${err?.message || 'unknown error'}`)
    }
  }

  return res.status(200).json({ received: true })
}

