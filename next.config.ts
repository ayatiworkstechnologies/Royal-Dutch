import type { NextConfig } from "next";

const backendUrl = (
  process.env.API_BACKEND_URL || "http://89.167.92.220:8015"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
