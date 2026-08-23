import { BUSINESS } from "../../constants/business";
import {
  SITE_URL,
  HOME_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  LOGO_PATH,
  absoluteUrl,
} from "./site";

/** Crawlable square brand icon derived from the official logo1.png asset */
const LOGO_WIDTH = 512;
const LOGO_HEIGHT = 512;

function getLogoImageObject() {
  return {
    "@type": "ImageObject",
    "@id": `${SITE_URL}${LOGO_PATH}#logo`,
    url: absoluteUrl(LOGO_PATH),
    contentUrl: absoluteUrl(LOGO_PATH),
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    caption: SITE_NAME,
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
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: HOME_URL,
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
  };

  const webSite = {
    "@type": "WebSite",
    "@id": websiteId,
    url: HOME_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "de-DE",
    publisher: { "@id": organizationId },
    // No SearchAction: site has no public search endpoint (required for Sitelinks Search Box)
  };

  const localBusiness = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    description:
      "Autotransport und Fahrzeugtransport für PKW, Transporter, LKW und Busse – deutschlandweit und europaweit, für Privat- und Gewerbekunden.",
    url: HOME_URL,
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
      "Fahrzeugtransport",
      "Fahrzeuglogistik",
      "Fahrzeugüberführung",
      "KFZ-Transport",
      "PKW-Transport",
      "LKW-Transport",
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, webSite, localBusiness],
  };
}

export function getServicePageStructuredData({
  path,
  title,
  description,
  serviceType,
  areaServed,
}) {
  const pageUrl = absoluteUrl(path);
  const serviceId = `${pageUrl}#service`;
  const websiteId = `${SITE_URL}/#website`;
  const localBusinessId = `${SITE_URL}/#localbusiness`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "de-DE",
        isPartOf: { "@id": websiteId },
        about: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: title,
        description,
        serviceType,
        url: pageUrl,
        provider: { "@id": localBusinessId },
        areaServed,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: HOME_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
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
        item: HOME_URL,
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
