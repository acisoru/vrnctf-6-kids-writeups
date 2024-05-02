/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    instrumentationHook: true
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, path: false, stream: false, os: false, string_decoder: false,
      crypto: false, timers: false, tls: false, net: false, zlib: false
    }
    return config
  }
};

export default nextConfig;
