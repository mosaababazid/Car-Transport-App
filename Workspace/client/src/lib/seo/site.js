const PRODUCTION_SITE_URL = "https://luxor-drive.de";

function resolveSiteUrl() {
  if (process.env.NODE_ENV === "production") return PRODUCTION_SITE_URL;

  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return PRODUCTION_SITE_URL;

  try {
    const url = new URL(configuredUrl);
    return url.origin;
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();
export const HOME_URL = `${SITE_URL}/`;

export const SITE_NAME = "Luxor Drive";
export const SITE_NAME_SHORT = "LUXOR DRIVE";
export const SITE_TAGLINE = "Autotransport & Fahrzeuglogistik";

export const HOME_TITLE =
  "Autotransport & Fahrzeugtransport deutschlandweit & europaweit | Luxor Drive";

export const DEFAULT_DESCRIPTION =
  "Luxor Drive transportiert PKW, Transporter, LKW und Busse deutschlandweit und europaweit – vollkaskoversichert, digital dokumentiert und transparent.";

export const DEFAULT_OG_DESCRIPTION =
  "Autotransport und Fahrzeugtransport in Deutschland und Europa – für Privat- und Gewerbekunden, vollkaskoversichert und digital dokumentiert.";

export const DEFAULT_TWITTER_DESCRIPTION =
  "Fahrzeugtransport deutschlandweit und europaweit: sicher, vollkaskoversichert und transparent.";

/** Square brand icon derived from the official logo1.png asset */
export const LOGO_PATH = "/brand-icon-512.png";

/** Social / large preview image (Next.js file route) */
export const OG_IMAGE_PATH = "/social-preview.png";

export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME_SHORT} – ${SITE_TAGLINE} in Deutschland und Europa`,
};

export const LOCALE = "de_DE";
export const LANGUAGE = "de";

export const THEME_COLOR = "#0a0b0d";

export const PAGE_META = {
  gallery: {
    title: "Fahrzeugtransport-Galerie",
    description:
      "Einblicke in den professionellen Fahrzeugtransport von Luxor Drive und den sorgfältigen Transport unterschiedlicher Fahrzeugarten in Deutschland und Europa.",
  },
  contact: {
    title: "Autotransport anfragen",
    description:
      "Fragen Sie Ihren deutschlandweiten oder europaweiten Fahrzeugtransport bei Luxor Drive per Formular, Telefon oder WhatsApp an.",
  },
  "autotransport-saarland": {
    title: "Autotransport Saarland & St. Wendel",
    description:
      "Luxor Drive mit Sitz in St. Wendel transportiert Fahrzeuge im Saarland sowie deutschlandweit und europaweit – für Privat- und Gewerbekunden.",
  },
  privacy: {
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der LUXOR DRIVE.",
  },
  terms: {
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der LUXOR DRIVE.",
  },
  imprint: {
    title: "Impressum",
    description: "Impressum und Angaben gemäß § 5 DDG.",
  },
};

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return path === "" || path === "/"
    ? HOME_URL
    : `${SITE_URL}${normalized}`;
}
