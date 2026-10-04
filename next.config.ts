import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad (auditoría 2026-10-04).
 * El sitio es estático (SSG); estas cabeceras endurecen la respuesta HTTP
 * sin afectar el render. No se incluye CSP estricta para no romper el
 * build de Next.js sin pruebas previas (pendiente evaluar).
 */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
