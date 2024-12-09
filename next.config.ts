import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['vercel.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    typedRoutes: true,
  }
};

export default nextConfig;
