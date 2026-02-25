import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Link from "next/link";
import { getLegalPageStructuredData } from "../structuredData";
import "../legal.css";

export default function TermsPage() {
  const schema = getLegalPageStructuredData({
    path: "/terms",
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    description: "Allgemeine Geschäftsbedingungen der AutoMove Logistik.",
    kind: "WebPage",
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
          <Link href="/" className="back-to-home">
            Zur Startseite
          </Link>
          <h1 className="legal-title">Allgemeine Geschäftsbedingungen (AGB)</h1>
          <div className="legal-content">
            <h2>1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über die
              Fahrzeuglogistik und den Transport von Kraftfahrzeugen, die zwischen AutoMove Logistik
              und dem Kunden geschlossen werden.
            </p>
            <h2>2. Vertragsschluss</h2>
            <p>
              Ein Vertrag kommt durch unsere schriftliche Auftragsbestätigung oder durch
              Durchführung des Transports zustande. Angebote auf der Website sind unverbindlich.
            </p>
            <h2>3. Leistung und Preise</h2>
            <p>
              Die vereinbarten Preise verstehen sich in Euro zuzüglich der gesetzlichen
              Mehrwertsteuer. Änderungen der Strecke oder des Abhol- bzw. Zielortes können zu
              Preisänderungen führen.
            </p>
            <h2>4. Zahlung</h2>
            <p>
              Die Zahlungsbedingungen ergeben sich aus der jeweiligen Auftragsbestätigung.
              Rechnungen sind innerhalb der angegebenen Frist ohne Abzug zu begleichen.
            </p>
            <h2>5. Versicherung</h2>
            <p>
              Der Transport ist vollkaskoversichert. Einzelheiten zum Versicherungsschutz können auf
              Anfrage mitgeteilt werden.
            </p>
            <h2>6. Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit
              gesetzlich zulässig, der Sitz von AutoMove Logistik. Sollten einzelne Bestimmungen
              unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
            <p>
              <Link href="/imprint">Impressum</Link> ·{" "}
              <Link href="/privacy">Datenschutzerklärung</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
