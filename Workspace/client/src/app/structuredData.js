const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://automove-logistik.de";

function getBusiness() {
  return {
    phone: process.env.NEXT_PUBLIC_PHONE || "+491234567890",
    email: process.env.NEXT_PUBLIC_EMAIL || "anfrage@automove-logistik.de",
    street: process.env.NEXT_PUBLIC_STREET || "Beispielstraße 1",
    city: process.env.NEXT_PUBLIC_CITY || "Saarbrücken",
    postalCode: process.env.NEXT_PUBLIC_POSTAL || "66111",
  };
}

export function getStructuredData() {
  const biz = getBusiness();
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "AutoMove Logistik",
    alternateName: [
      "EuroAutomobile & Transport",
      "Autotransport Deutschland",
      "Fahrzeuglogistik Deutschland",
    ],
    description:
      "Autotransport und Fahrzeuglogistik: Auto transportieren lassen in Deutschland und Europa. PKW, LKW, Transporter, Bus. Vollkaskoversichert, über 100 Transporte monatlich. Unverbindliches Angebot für B2B und Privatkunden.",
    url: SITE_URL,
    telephone: biz.phone.replace(/\s/g, ""),
    email: biz.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: biz.street,
      addressLocality: biz.city,
      postalCode: biz.postalCode,
      addressRegion: "Saarland",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Country", "name": "Deutschland" },
      { "@type": "Place", "name": "Europa" },
    ],
    serviceType: [
      "Autotransport",
      "Auto transportieren",
      "Fahrzeuglogistik",
      "Fahrzeugtransport",
      "KFZ-Transport",
      "PKW-Transport",
      "LKW-Transport",
      "Transporter-Transport",
      "Bus-Transport",
    ],
    slogan: "Autotransport und Fahrzeuglogistik in Deutschland und Europa.",
    makesOffer: [
      { "@type": "Offer", "name": "Autotransport für Gewerbekunden (B2B)" },
      { "@type": "Offer", "name": "Auto transportieren lassen für Privatkunden" },
    ],
    priceRange: "EUR",
    openingHours: "Mo-Fr 08:00-18:00",
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "AutoMove Logistik – Autotransport & Fahrzeuglogistik",
    description: "Autotransport Deutschland und Europa: Auto transportieren lassen. PKW, LKW, Transporter, Bus. Vollkaskoversichert.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "de-DE",
  };

  return [localBusiness, webSite];
}

export function getLegalPageStructuredData({ path, title, description, kind }) {
  const pageUrl = `${SITE_URL}${path}`;
  const webPage = {
    "@context": "https://schema.org",
    "@type": kind || "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
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