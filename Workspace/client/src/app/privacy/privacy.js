import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { getLegalPageStructuredData } from "../structuredData";
import { BUSINESS } from "../../constants/business";
import "../legal.css";

export default function PrivacyPage() {
  const schema = getLegalPageStructuredData({
    path: "/privacy",
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der AutoMove Logistik.",
    kind: "WebPage",
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
          <Link href="/" className="back-to-home" aria-label="Zur Startseite">
            <Undo2 size={18} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <h1 className="legal-title">Datenschutzerklärung</h1>
          <div className="legal-content">
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist AutoMove Logistik,
              {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city}. Kontakt: {BUSINESS.email}
            </p>
            <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p>
              Beim Besuch der Website werden automatisch Zugriffsdaten (IP-Adresse, Datum, Uhrzeit,
              aufgerufene Seiten) in Server-Logfiles erhoben. Diese Daten dienen der Sicherheit und
              der technischen Bereitstellung der Seite. Eine Zusammenführung mit anderen Daten
              erfolgt nicht.
            </p>
            <h2>3. Kontaktformular und E-Mail</h2>
            <p>
              Wenn Sie uns per Kontaktformular oder E-Mail anschreiben, werden Ihre Angaben (Name,
              E-Mail, Nachricht) zum Zwecke der Bearbeitung Ihrer Anfrage verarbeitet und gespeichert.
            </p>
            <h2>4. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung Ihrer personenbezogenen Daten sowie ein Widerspruchsrecht. Bei Fragen
              wenden Sie sich an {BUSINESS.email}. Sie haben zudem das Recht, sich bei
              einer Aufsichtsbehörde zu beschweren.
            </p>
            <h2>5. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Die aktuelle Version
              finden Sie stets auf dieser Seite.
            </p>
            <p>
              <Link href="/imprint">Impressum</Link> · <Link href="/terms">AGB</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
