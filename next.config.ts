import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/category/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/stock-market',
        destination: '/global-markets',
        permanent: true,
      },
      {
        source: '/tech-ai',
        destination: '/tech-ai-stocks',
        permanent: true,
      },
      {
        source: '/economy',
        destination: '/economy-policy',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/tools/:slug',
        destination: '/calculators/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
