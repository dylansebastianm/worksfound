/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
  // Servir archivos estáticos de la carpeta email-templates
  async rewrites() {
    return [
      {
        source: '/email-templates/:path*',
        destination: '/email-templates/:path*',
      },
    ];
  },
};

export default nextConfig;
