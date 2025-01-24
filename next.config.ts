import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pokemontcg.io'], // Add the hostname for external images
  },
};

export default nextConfig;
