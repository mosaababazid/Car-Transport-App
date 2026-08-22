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
    description: "Datenschutzerklärung der LUXOR DRIVE.",
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
          <div className="legal-navigation">
            <Link href="/" className="back-to-home" aria-label="Zur Startseite">
              <Undo2 size={18} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <span>Rechtliches</span>
          </div>
          <header className="legal-page-header">
            <p className="legal-eyebrow">Datenschutz</p>
            <h1 className="legal-title">Datenschutzerklärung</h1>
            <p className="legal-lede">
              Informationen darüber, welche personenbezogenen Daten wir verarbeiten,
              wenn Sie unsere Website und unsere Angebote nutzen.
            </p>
          </header>
          <div className="legal-content">
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist
              {" "}{BUSINESS.legalName}, Inhaber {BUSINESS.owner}, {BUSINESS.street},
              {" "}{BUSINESS.postalCode} {BUSINESS.city}. Sie erreichen uns unter
              {" "}<a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> oder telefonisch unter
              {" "}<a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>{BUSINESS.phoneDisplay}</a>.
            </p>
            <h2>2. Bereitstellung der Website und Server-Logfiles</h2>
            <p>
              Beim Aufruf der Website verarbeitet der von uns eingesetzte Hosting-Dienstleister
              technisch erforderliche Verbindungsdaten, insbesondere IP-Adresse, Datum und Uhrzeit,
              aufgerufene Seite, Referrer-URL sowie Angaben zu Browser und Betriebssystem. Die
              Verarbeitung dient der sicheren und stabilen Bereitstellung der Website sowie der
              Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <h2>3. Preisrechner und Routenberechnung</h2>
            <p>
              Wenn Sie Abhol- und Zielort in den Preisrechner eingeben, verarbeiten wir diese Angaben,
              um Entfernung, voraussichtliche Fahrzeit und ein unverbindliches Angebot zu berechnen.
              Die Adressen werden hierfür über unseren Server an die Geocodierung von Nominatim
              (OpenStreetMap) und an den Routingdienst Project OSRM übermittelt. Wir speichern die
              eingegebenen Adressen in der Anwendung nicht dauerhaft. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. b DSGVO zur Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage.
            </p>
            <h2>4. Kontaktformular und E-Mail</h2>
            <p>
              Wenn Sie uns per Formular oder E-Mail kontaktieren, verarbeiten wir Ihren Namen,
              Ihre E-Mail-Adresse, Telefonnummer, das ausgewählte Telefonland beziehungsweise die
              Vorwahl sowie den Inhalt Ihrer Nachricht. Die Angaben sind erforderlich, um Ihre
              Anfrage zu prüfen und zu beantworten. Die Übermittlung über das Formular erfolgt über
              den E-Mail-Dienst Resend. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die
              Anfrage auf einen Vertragsschluss gerichtet ist, andernfalls Art. 6 Abs. 1 lit. f DSGVO
              für die Bearbeitung von Anfragen.
            </p>
            <h2>5. Empfänger und Übermittlung in Drittländer</h2>
            <p>
              Empfänger Ihrer Daten können unser Hosting-Dienstleister, der E-Mail-Dienst Resend
              sowie die unter Ziffer 3 genannten Dienste sein, soweit dies technisch erforderlich
              ist. Resend verarbeitet Daten nach eigenen Angaben in den USA. Informationen zu
              dessen Datenschutzmaßnahmen und Übermittlungsgrundlagen finden Sie in den
              {" "}<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzhinweisen von Resend</a>.
              Bei einer Übermittlung in ein Drittland achten wir
              auf die jeweils erforderlichen Garantien nach Art. 44 ff. DSGVO.
            </p>
            <h2>6. Telefon und WhatsApp</h2>
            <p>
              Sie können uns telefonisch oder über den WhatsApp-Link kontaktieren. Erst wenn Sie
              den Link aktivieren, wird eine Verbindung zu WhatsApp hergestellt. Für die dortige
              Verarbeitung personenbezogener Daten gelten die Datenschutzbestimmungen von
              WhatsApp. Die von Ihnen übermittelten Angaben verarbeiten wir zur Bearbeitung Ihrer
              Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b oder lit. f DSGVO.
            </p>
            <h2>7. Cookies, Analyse und Sicherheitsmaßnahmen</h2>
            <p>
              Diese Website verwendet derzeit keine eigenen Analyse- oder Werbe-Cookies. Zur
              Absicherung der Formular- und Preisrechner-Endpunkte verarbeiten wir IP-Adressen
              kurzzeitig zur Begrenzung missbräuchlicher Anfragen. Rechtsgrundlage ist Art. 6 Abs.
              1 lit. f DSGVO. Eine Zusammenführung dieser Daten mit den Angaben aus dem
              Kontaktformular erfolgt nicht.
            </p>
            <h2>8. Speicherdauer</h2>
            <p>
              Wir löschen oder anonymisieren personenbezogene Daten, sobald sie für den jeweiligen
              Zweck nicht mehr erforderlich sind. Kontaktanfragen bewahren wir solange auf, wie
              dies für die Bearbeitung und mögliche Anschlussfragen erforderlich ist; gesetzliche
              Aufbewahrungspflichten bleiben unberührt.
            </p>
            <h2>9. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer
              personenbezogenen Daten. Bei Fragen oder zur Ausübung Ihrer Rechte wenden Sie sich
              bitte an <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. Sie haben außerdem das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren.
            </p>
            <h2>10. Stand und Änderungen</h2>
            <p>
              Stand: August 2026. Wir passen diese Datenschutzerklärung an, wenn sich unsere
              Website, eingesetzte Dienste oder rechtliche Anforderungen ändern.
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
