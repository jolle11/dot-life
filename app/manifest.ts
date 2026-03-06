import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "dot life — Visualiza tu vida en puntos",
    short_name: "dot life",
    description:
      "Visualiza cuánto tiempo has vivido y cuánto te queda en un grid de puntos interactivo.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
