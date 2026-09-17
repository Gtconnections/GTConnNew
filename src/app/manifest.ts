import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GT Connections",
    short_name: "GT Connections",
    description:
      "Web & app development, landing pages, secure hosting and a GoDaddy domain reseller program.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d66f1",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
