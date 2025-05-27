const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",  
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
