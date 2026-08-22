import { BUSINESS } from "../../constants/business";
import {
  SITE_URL,
  SITE_NAME_SHORT,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  LOGO_PATH,
  absoluteUrl,
} from "./site";

/** Crawlable brand logo (public/logo.png) — dimensions for Google Organization markup */
const LOGO_WIDTH = 2758;
const LOGO_HEIGHT = 1504;

function getLogoImageObject() {
  return {
    "@type": "ImageObject",
    "@id": `${SITE_URL}${LOGO_PATH}#logo`,
    url: absoluteUrl(LOGO_PATH),
    contentUrl: absoluteUrl(LOGO_PATH),
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    caption: SITE_NAME_SHORT,
  };
}

/** Organization + WebSite + LocalBusiness as a single @graph document */
export function getStructuredDataGraph() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const logo = getLogoImageObject();

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME_SHORT,
    legalName: BUSINESS.legalName,
    alternateName: [
      "EuroAutomobile & Transport",
      "LUXOR DRIVE | AUTOMOBIL UND TRANSPORT",
      "Autotransport Deutschland",
    ],
    url: SITE_URL,
    logo,
    image: logo,
    email: BUSINESS.email,
    telephone: BUSINESS.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressRegion: "Saarland",
      addressCountry: "DE",
    },
    sameAs: [],
  };

  const webSite = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: `${SITE_NAME_SHORT} – ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "de-DE",
    publisher: { "@id": organizationId },
    // No SearchAction: site has no public search endpoint (required for Sitelinks Search Box)
  };

  const localBusiness = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME_SHORT,
    description:
      "Autotransport und Fahrzeuglogistik: Auto transportieren lassen in Deutschland und Europa. PKW, LKW, Transporter, Bus. Vollkaskoversichert.",
    url: SITE_URL,
    image: absoluteUrl(LOGO_PATH),
    logo: { "@id": logo["@id"] },
    parentOrganization: { "@id": organizationId },
    telephone: BUSINESS.phone.replace(/\s/g, ""),
    email: BUSINESS.email,
    address: organization.address,
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Place", name: "Europa" },
    ],
    serviceType: [
      "Autotransport",
      "Fahrzeuglogistik",
      "KFZ-Transport",
      "PKW-Transport",
      "LKW-Transport",
    ],
    priceRange: "EUR",
    openingHours: "Mo-Fr 08:00-18:00",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, webSite, localBusiness],
  };
}

export function getLegalPageStructuredData({ path, title, description, kind }) {
  const pageUrl = absoluteUrl(path);
  const websiteId = `${SITE_URL}/#website`;
  const organizationId = `${SITE_URL}/#organization`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": kind || "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "de-DE",
    isPartOf: { "@id": websiteId },
    publisher: { "@id": organizationId },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: pageUrl,
      },
    ],
  };

  return [webPage, breadcrumb];
}
