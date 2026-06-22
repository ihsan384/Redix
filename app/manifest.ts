import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REDIX.MEDIA — Creative Digital Studio",
    short_name: "REDIX.MEDIA",
    description: "REDIX.MEDIA is a bold creative digital studio helping businesses grow through strategic content, branding, website development, video editing, social media management, and digital marketing.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      }
    ],
  };
}
