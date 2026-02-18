import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Portally",
    short_name: "Portally",
    description: "Portal assistant for Rotaract members",
    start_url: "/home",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#D41367",
    orientation: "portrait",
    icons: [
      { src: "/icons/72.png", sizes: "72x72", type: "image/png" },
      { src: "/icons/96.png", sizes: "96x96", type: "image/png" },
      { src: "/icons/128.png", sizes: "128x128", type: "image/png" },
      { src: "/icons/144.png", sizes: "144x144", type: "image/png" },
      { src: "/icons/152.png", sizes: "152x152", type: "image/png" },
      { src: "/icons/192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icons/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
