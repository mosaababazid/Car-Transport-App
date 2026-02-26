import { notFound } from "next/navigation";
import {
  HomePage,
  GalleryPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  ImprintPage,
} from "../app";

const ROUTES = {
  gallery: GalleryPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  imprint: ImprintPage,
};

const METADATA = {
  gallery: {
    title: "Galerie",
    description:
      "Bilder vom professionellen Fahrzeugtransport in Deutschland und Europa. Moderne Transporter für sicheren und zuverlässigen Autotransport.",
    keywords: ["Galerie", "Autotransport Bilder", "Transporter", "Fahrzeugtransport"],
  },
  contact: {
    title: "Kontakt",
    description:
      "Kontakt zu AutoMove Logistik: Anfrage per Formular, Telefon oder WhatsApp. Schnelle Rückmeldung für Ihren Fahrzeugtransport.",
    keywords: ["Kontakt", "Autotransport Kontakt", "Fahrzeuglogistik Anfrage"],
  },
  privacy: {
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der AutoMove Logistik.",
    keywords: ["Datenschutzerklärung", "Datenschutz", "DSGVO"],
  },
  terms: {
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der AutoMove Logistik.",
    keywords: ["AGB", "Allgemeine Geschäftsbedingungen", "Vertragsbedingungen"],
  },
  imprint: {
    title: "Impressum",
    description: "Impressum und Angaben gemäß § 5 TMG.",
    keywords: ["Impressum", "Anbieterkennzeichnung", "§ 5 TMG"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://automove-logistik.de";

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const segment = Array.isArray(slug) ? slug[0] : slug;
  const pageMeta = METADATA[segment] ?? {};
  const path = segment ? `/${segment}` : "";
  const pageTitle = pageMeta.title ? `${pageMeta.title} | AutoMove Logistik` : undefined;
  return {
    ...pageMeta,
    ...(segment && pageMeta.description
      ? {
          openGraph: {
            title: pageTitle,
            description: pageMeta.description,
            url: `${SITE_URL}${path}`,
            siteName: "AutoMove Logistik",
            locale: "de_DE",
            type: "website",
            images: [
              {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: `${pageMeta.title} | AutoMove Logistik`,
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageMeta.description,
            images: ["/opengraph-image"],
          },
        }
      : {}),
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
  };
}

export default async function RouterPage({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const segment = Array.isArray(slug) ? slug?.[0] : slug ?? null;

  if (!segment) {
    return <HomePage />;
  }

  const Page = ROUTES[segment];
  if (!Page) {
    notFound();
  }

  return <Page />;
}