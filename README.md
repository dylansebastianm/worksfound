This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stripe (checkout-2) - Setup rápido

1) Instalá dependencias:

```bash
npm install
```

2) Creá un archivo `.env.local` en la raíz (podés copiar `ENV.example`) y completá:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

3) Abrí `http://localhost:3000/checkout-2` para probar el pago con Stripe (modo test).

## Stripe Webhook → LeadConnector (pago confirmado)

Este proyecto expone un webhook en `POST /api/stripe/webhook` que escucha `checkout.session.completed` y reenvía la data del comprador a LeadConnector.

Variables necesarias (ver `ENV.example`):
- `STRIPE_WEBHOOK_SECRET` (whsec_...)
- `LEADCONNECTOR_WEBHOOK_URL`

En Stripe Dashboard:
- `Developers` → `Webhooks` → `Add endpoint`
- Endpoint URL: `https://TU-DOMINIO/api/stripe/webhook` (o `http://localhost:3000/api/stripe/webhook` en local usando Stripe CLI)
- Events: seleccionar `checkout.session.completed`

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
