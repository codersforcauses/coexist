import os from "node:os";

import isInsideContainer from "is-inside-container";

const isWindowsDevContainer = () =>
  os.release().toLowerCase().includes("microsoft") && isInsideContainer();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // dumb fix for windows docker
  webpack: isWindowsDevContainer()
    ? (config) => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        };
        return config;
      }
    : undefined,
  // image configuration
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "coexist-server",
        port: "8000",
        pathname: "/static/images/**",
      },
      // Add more patterns if needed for other environments
    ],
  },
};

export default nextConfig;
