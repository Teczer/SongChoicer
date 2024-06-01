import { createProxyMiddleware } from "http-proxy-middleware";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/genius/:path*",
        destination: "https://genius.com/api/:path*",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    return config;
  },
  serverRuntimeConfig: {
    // Ajouter les configurations spécifiques du serveur ici, si nécessaire
  },
  publicRuntimeConfig: {
    // Ajouter les configurations spécifiques au client ici, si nécessaire
  },
};

export default nextConfig;
