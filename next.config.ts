import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: '*', // Allow images from any hostname (wildcard)
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200], // Default device sizes
    imageSizes: [16, 32, 48, 64, 96], // Default image sizes
    minimumCacheTTL: 60, // Cache images for 60 seconds
    formats: ['image/webp'], // Serve images in WebP format
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;