import {
  HomePage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  ImprintPage,
} from "../app";

const ROUTES = {
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  imprint: ImprintPage,
};

const METADATA = {
  privacy: {
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der AutoMove Logistik.",
  },
  terms: {
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen der AutoMove Logistik.",
  },
  imprint: {
    title: "Impressum",
    description: "Impressum und Angaben gemäß § 5 TMG.",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://automove-logistik.de";

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const segment = Array.isArray(slug) ? slug[0] : slug;
  const pageMeta = METADATA[segment] ?? {};
  const path = segment ? `/${segment}` : "";
  return {
    ...pageMeta,
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
    return (
      <div className="app-shell" style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404</h1>
        <p>Seite nicht gefunden.</p>
        <a href="/">Zur Startseite</a>
      </div>
    );
  }

  return <Page />;
}