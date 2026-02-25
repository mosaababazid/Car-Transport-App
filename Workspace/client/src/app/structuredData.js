/** JSON-LD for SEO (LocalBusiness + WebSite). Injected in layout (SSR) so crawlers get it. */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://automove-logistik.de";

export function getStructuredData() {
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
    telephone: "+49 123 456 7890",
    email: "anfrage@automove-logistik.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beispielstraße 1",
      addressLocality: "Saarbrücken",
      postalCode: "66111",
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