import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
