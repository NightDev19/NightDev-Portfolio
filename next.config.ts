import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  serverActions: {
    allowedOrigins: [
      "*.space.chatglm.site",
      "*.space-z.ai",
      "localhost:3000",
    ],
  },
};

export default nextConfig;
