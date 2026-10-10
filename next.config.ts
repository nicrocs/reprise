import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/alphatab-assets/:path*",
        destination:
          "https://cdn.jsdelivr.net/npm/@coderline/alphatab@1.8.4/dist/:path*",
      },
    ];
  },
};

export default nextConfig;
