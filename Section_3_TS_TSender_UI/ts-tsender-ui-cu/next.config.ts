import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  basePath: "",
  // assetPrefix: './',
  trailingSlash: true,
  // experimental: {
  //   allowDevelopmentBuild: true,
  // },
};

export default nextConfig;
