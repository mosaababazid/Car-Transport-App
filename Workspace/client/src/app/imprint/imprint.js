import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLegalPageStructuredData } from "../structuredData";
import { BUSINESS } from "../../constants/business";
import "../legal.css";

export default function ImprintPage() {
  const schema = getLegalPageStructuredData({
    path: "/imprint",
    title: "Impressum",
    description: "Impressum und Anbieterkennzeichnung gemäß § 5 DDG.",
    kind: "AboutPage",
  });

  return (
    <div className="app-shell">
      <Header />
      <main id="main-content" className="legal-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <div className="legal-inner">
          <div className="legal-navigation">
            <Link href="/" className="back-to-home" aria-label="Zur Startseite">
              <ArrowLeft size={17} strokeWidth={2.2} aria-hidden="true" />
              <span className="back-to-home__label">Zurück</span>
            </Link>
          </div>
          <header className="legal-page-header">
            <p className="legal-eyebrow">Anbieterkennzeichnung</p>
            <h1 className="legal-title">Impressum</h1>
            <p className="legal-lede">
              Angaben zum Anbieter und Kontaktmöglichkeiten gemäß § 5 DDG.
            </p>
          </header>
          <div className="legal-content">
            <p>Angaben gemäß § 5 DDG</p>
            <p>
              {BUSINESS.legalName}<br />
              Inhaber: {BUSINESS.owner}<br />
              {BUSINESS.street}<br />
              {BUSINESS.postalCode} {BUSINESS.city}<br />
              {BUSINESS.country}
            </p>
            <h2>Kontakt</h2>
            <p>
              Telefon: <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>{BUSINESS.phoneDisplay}</a><br />
              E-Mail: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </p>
            <h2>Steuernummer</h2>
            <p>{BUSINESS.taxNumber}</p>
            {BUSINESS.vatId ? (
              <>
                <h2>Umsatzsteuer-ID</h2>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {BUSINESS.vatId}</p>
              </>
            ) : null}
            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              {BUSINESS.responsible}<br />
              {BUSINESS.street}<br />
              {BUSINESS.postalCode} {BUSINESS.city}
            </p>
            <p>
              <Link href="/privacy">Datenschutzerklärung</Link> · <Link href="/terms">AGB</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
