/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '/books/content/**',
      },
      {
        protocol: 'https',
        hostname: 'images.isbndb.com',
      },
      {
        protocol: 'https',
        hostname: 'plaintalkpostuploads.nyc3.digitaloceanspaces.com',
      }
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;