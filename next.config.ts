import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zevuivghhxutxqlgfnbo.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 120,
    },
  },
  cacheComponents: true,
};

export default nextConfig;
