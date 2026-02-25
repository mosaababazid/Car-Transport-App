import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { getLegalPageStructuredData } from "../structuredData";
import "../legal.css";

export default function ImprintPage() {
  const schema = getLegalPageStructuredData({
    path: "/imprint",
    title: "Impressum",
    description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
    kind: "AboutPage",
  });

  return (
    <div className="app-shell">
      <Header />
      <main className="legal-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <div className="legal-inner">
          <Link href="/" className="back-to-home" aria-label="Zur Startseite">
            <Undo2 size={18} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <h1 className="legal-title">Impressum</h1>
          <div className="legal-content">
            <p>Angaben gemäß § 5 TMG</p>
            <h2>Anbieter</h2>
            <p>
              AutoMove Logistik<br />
              [Straße und Hausnummer]<br />
              66111 Saarbrücken<br />
              Deutschland
            </p>
            <h2>Kontakt</h2>
            <p>
              Telefon: +49 123 456 7890<br />
              E-Mail: anfrage@automove-logistik.de
            </p>
            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]</p>
            <h2>Verantwortlich für den Inhalt</h2>
            <p>[Name und Anschrift des Verantwortlichen]</p>
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
