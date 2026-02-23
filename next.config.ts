import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Change this to your repository name if it's not 'portfolio'
  // If you use username.github.io, you can set this to empty string ''
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
