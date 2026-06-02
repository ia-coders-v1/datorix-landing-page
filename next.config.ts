import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/datorix-landing-page",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
