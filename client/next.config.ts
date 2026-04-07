import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      
    ],
  },
  typescript: {
    ignoreBuildErrors: true,   // 👈 ye add karo
  },
  /* config options here */
};

export default nextConfig;
