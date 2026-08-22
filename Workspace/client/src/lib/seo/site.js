export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://luxordrive-logistik.de";

export const SITE_NAME = "LUXOR DRIVE | AUTOMOBIL UND TRANSPORT";
export const SITE_NAME_SHORT = "LUXOR DRIVE";
export const SITE_TAGLINE = "Autotransport & Fahrzeuglogistik";

export const DEFAULT_DESCRIPTION =
  "LUXOR DRIVE ist Ihr Partner für Autotransport und Fahrzeuglogistik in Deutschland und Europa. PKW, LKW, Transporter und Bus sicher, termingerecht und vollkaskoversichert transportieren lassen.";

export const DEFAULT_OG_DESCRIPTION =
  "Autotransport in Deutschland und Europa: Auto transportieren lassen für PKW, LKW, Transporter und Bus. Vollkaskoversichert und professionell abgewickelt.";

export const DEFAULT_TWITTER_DESCRIPTION =
  "Fahrzeuglogistik für Deutschland und Europa: sicher, vollkaskoversichert und termingerecht.";

export const DEFAULT_KEYWORDS = [
  "LUXOR DRIVE",
  "Autotransport",
  "Autotransport Deutschland",
  "Auto transportieren",
  "Fahrzeuglogistik",
  "Fahrzeugtransport Deutschland",
  "KFZ-Transport",
  "Europaweiter Autotransport",
  "Auto transportieren lassen",
  "PKW Transport",
  "LKW Transport",
  "Vollkaskoversichert",
  "B2B Fahrzeuglogistik",
];

/** Square logo for Google Organization markup (public, crawlable) */
export const LOGO_PATH = "/logo.png";

/** Social / large preview image (Next.js file route) */
export const OG_IMAGE_PATH = "/opengraph-image";

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
    title: "Galerie",
    description:
      "Bilder vom professionellen Fahrzeugtransport in Deutschland und Europa. Moderne Transporter für sicheren und zuverlässigen Autotransport.",
    keywords: ["Galerie", "Autotransport Bilder", "Transporter", "Fahrzeugtransport"],
  },
  contact: {
    title: "Kontakt",
    description:
      "Kontakt zu LUXOR DRIVE: Anfrage per Formular, Telefon oder WhatsApp. Schnelle Rückmeldung für Ihren Fahrzeugtransport.",
    keywords: ["Kontakt", "Autotransport Kontakt", "Fahrzeuglogistik Anfrage"],
  },
  privacy: {
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der LUXOR DRIVE.",
    keywords: ["Datenschutzerklärung", "Datenschutz", "DSGVO"],
  },
  terms: {
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der LUXOR DRIVE.",
    keywords: ["AGB", "Allgemeine Geschäftsbedingungen", "Vertragsbedingungen"],
  },
  imprint: {
    title: "Impressum",
    description: "Impressum und Angaben gemäß § 5 DDG.",
    keywords: ["Impressum", "Anbieterkennzeichnung", "§ 5 DDG"],
  },
};

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return path === "" || path === "/"
    ? SITE_URL
    : `${SITE_URL}${normalized}`;
}
