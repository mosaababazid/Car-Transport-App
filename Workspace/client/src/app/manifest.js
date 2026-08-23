import { SITE_NAME, SITE_NAME_SHORT, DEFAULT_DESCRIPTION, THEME_COLOR } from "../lib/seo/site";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME_SHORT,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    lang: "de-DE",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
