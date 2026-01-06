export default function handler(req, res) {
  const secret = process.env.STRIPE_SECRET_KEY
  const pub = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  const secretMode = !secret
    ? 'missing'
    : secret.startsWith('sk_live_')
      ? 'live'
      : secret.startsWith('sk_test_')
        ? 'test'
        : 'unknown'

  const publishableMode = !pub
    ? 'missing'
    : pub.startsWith('pk_live_')
      ? 'live'
      : pub.startsWith('pk_test_')
        ? 'test'
        : 'unknown'

  return res.status(200).json({
    stripe: {
      secretMode,
      publishableMode,
    },
  })
}

