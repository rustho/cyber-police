/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placekitten.com"],
  },
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
