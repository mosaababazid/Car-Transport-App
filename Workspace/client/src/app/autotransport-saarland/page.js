import Link from "next/link";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { BUSINESS } from "../../constants/business";
import { buildPageMetadata } from "../../lib/seo/metadata";
import { getServicePageStructuredData } from "../../lib/seo/structured-data";
import "../../components/Button/Button.css";
import "./saarland.css";

const PATH = "/autotransport-saarland";
const PAGE_TITLE = "Autotransport Saarland & St. Wendel";
const PAGE_DESCRIPTION =
  "Luxor Drive mit Sitz in St. Wendel transportiert Fahrzeuge im Saarland sowie deutschlandweit und europaweit – für Privat- und Gewerbekunden.";

export const metadata = buildPageMetadata({ segment: "autotransport-saarland" });

const PROCESS_STEPS = [
  {
    title: "Anfrage",
    text: "Sie übermitteln Abhol- und Zielort sowie die wichtigsten Angaben zum Fahrzeug.",
  },
  {
    title: "Abstimmung",
    text: "Transportdetails, Übergabeorte und der Ablauf werden passend zu Ihrem Auftrag vereinbart.",
  },
  {
    title: "Abholung",
    text: "Der Fahrzeugzustand wird vor Ort digital und einschließlich Fotos dokumentiert.",
  },
  {
    title: "Transport",
    text: "Das Fahrzeug wird vollkaskoversichert zum vereinbarten Zielort transportiert.",
  },
  {
    title: "Übergabe",
    text: "Bei der persönlichen Übergabe wird der Zustand erneut geprüft und digital festgehalten.",
  },
];

const FAQS = [
  {
    question: "Ist der Fahrzeugtransport auf das Saarland begrenzt?",
    answer:
      "Nein. Luxor Drive hat seinen Sitz in St. Wendel und übernimmt Fahrzeugtransporte deutschlandweit und europaweit.",
  },
  {
    question: "Welche Fahrzeuge transportiert Luxor Drive?",
    answer:
      "Wir transportieren PKW, Transporter, LKW und Busse für Privatkunden, Autohäuser und Firmenflotten.",
  },
  {
    question: "Wie wird der Fahrzeugzustand festgehalten?",
    answer:
      "Bei Abholung und Zustellung wird der Zustand digital und mit Fotos dokumentiert. Das Übergabeprotokoll macht den Ablauf nachvollziehbar.",
  },
  {
    question: "Ist das Fahrzeug während des Transports versichert?",
    answer:
      "Das Fahrzeug ist während des gesamten Transports vollkaskoversichert. Einzelheiten zum Versicherungsschutz teilen wir Ihnen auf Anfrage mit.",
  },
];

export default function AutotransportSaarlandPage() {
  const structuredData = getServicePageStructuredData({
    path: PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    serviceType: "Autotransport und Fahrzeugtransport",
    areaServed: [
      { "@type": "City", name: "St. Wendel" },
      { "@type": "AdministrativeArea", name: "Saarland" },
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Place", name: "Europa" },
    ],
  });

  return (
    <div className="app-shell">
      <Header />
      <main id="main-content" className="saarland-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="saarland-hero" aria-labelledby="saarland-title">
          <div className="saarland-inner">
            <nav className="saarland-breadcrumb" aria-label="Brotkrümelnavigation">
              <Link href="/">Startseite</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Autotransport Saarland</span>
            </nav>

            <p className="saarland-eyebrow">Standort St. Wendel · Service in Deutschland &amp; Europa</p>
            <h1 id="saarland-title">Autotransport im Saarland – deutschlandweit ans Ziel</h1>
            <p className="saarland-lede">
              Luxor Drive ist in St. Wendel im Saarland ansässig und übernimmt
              Fahrzeugtransporte für Privatkunden, Autohäuser und Firmenflotten.
              Wir transportieren PKW, Transporter, LKW und Busse deutschlandweit
              und europaweit – sicher, vollkaskoversichert und transparent dokumentiert.
            </p>
            <div className="saarland-actions">
              <Link href="/#pricing" className="btn-primary">
                Preis berechnen
              </Link>
              <Link href="/contact" className="saarland-secondary-link">
                Transport anfragen
              </Link>
            </div>
          </div>
        </section>

        <section className="saarland-section" aria-labelledby="saarland-reach">
          <div className="saarland-inner saarland-copy-grid">
            <div>
              <p className="saarland-section-kicker">Standort &amp; Reichweite</p>
              <h2 id="saarland-reach">Fahrzeugtransport aus St. Wendel für Deutschland und Europa</h2>
            </div>
            <div className="saarland-prose">
              <p>
                Ein Standort im Saarland und ein weitreichender Service: Luxor Drive
                organisiert Fahrzeugtransporte mit Abholung und Übergabe am vereinbarten
                Ort. Ob der Transport im Saarland beginnt, dort endet oder überregional
                verläuft – die relevanten Details stimmen wir vorab mit Ihnen ab.
              </p>
              <p>
                Unser Service ist nicht auf das Saarland begrenzt. Von St. Wendel aus
                betreuen wir Aufträge in ganz Deutschland und über Deutschlands Grenzen
                hinaus in Europa.
              </p>
              <address>
                {BUSINESS.legalName}<br />
                {BUSINESS.street}<br />
                {BUSINESS.postalCode} {BUSINESS.city}, Saarland<br />
                {BUSINESS.country}
              </address>
            </div>
          </div>
        </section>

        <section className="saarland-section" aria-labelledby="saarland-customers">
          <div className="saarland-inner">
            <p className="saarland-section-kicker">Passend zum Auftrag</p>
            <h2 id="saarland-customers">Für Privatkunden, Autohäuser und Firmenflotten</h2>
            <div className="saarland-card-grid">
              <article>
                <span>01</span>
                <h3>Unterschiedliche Fahrzeugarten</h3>
                <p>
                  Vom einzelnen PKW bis zu Transportern, LKW und Bussen übernehmen
                  wir Fahrzeugtransporte passend zum jeweiligen Auftrag.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Privat und gewerblich</h3>
                <p>
                  Unser Angebot richtet sich an Privatkunden ebenso wie an Autohäuser,
                  Unternehmen und Firmenflotten.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Eigene oder fremde Achse</h3>
                <p>
                  Fahrzeugüberführungen sind abhängig vom Auftrag auf eigener oder
                  fremder Achse möglich und werden vorab passend abgestimmt.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="saarland-section" aria-labelledby="saarland-process">
          <div className="saarland-inner saarland-process-layout">
            <div className="saarland-process-heading">
              <p className="saarland-section-kicker">Transparent organisiert</p>
              <h2 id="saarland-process">So läuft Ihr Autotransport ab</h2>
              <p>
                Vom ersten Streckenwunsch bis zur Fahrzeugübergabe bleibt der Ablauf
                klar nachvollziehbar.
              </p>
            </div>
            <ol className="saarland-process-list">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="saarland-section" aria-labelledby="saarland-security">
          <div className="saarland-inner saarland-highlight">
            <p className="saarland-section-kicker">Sicherheit &amp; Nachvollziehbarkeit</p>
            <h2 id="saarland-security">Dokumentiert und vollkaskoversichert</h2>
            <p>
              Der Fahrzeugzustand wird bei Abholung und Zustellung digital und mit
              Fotos festgehalten. Das Übergabeprotokoll dokumentiert den Ablauf.
              Während des gesamten Transports ist das Fahrzeug vollkaskoversichert.
            </p>
          </div>
        </section>

        <section className="saarland-section" aria-labelledby="saarland-faq">
          <div className="saarland-inner saarland-faq-layout">
            <div>
              <p className="saarland-section-kicker">Häufige Fragen</p>
              <h2 id="saarland-faq">Wissenswertes zum Fahrzeugtransport</h2>
            </div>
            <div className="saarland-faq-list">
              {FAQS.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="saarland-cta" aria-labelledby="saarland-cta-title">
          <div className="saarland-inner saarland-cta-inner">
            <p className="saarland-section-kicker">Ihre Strecke</p>
            <h2 id="saarland-cta-title">Autotransport im Saarland anfragen</h2>
            <p>
              Sie möchten ein Fahrzeug aus dem Saarland, nach St. Wendel oder zu
              einem anderen Ziel in Deutschland oder Europa transportieren lassen?
              Berechnen Sie ein unverbindliches Angebot oder senden Sie uns Ihre Anfrage.
            </p>
            <div className="saarland-actions">
              <Link href="/#pricing" className="btn-primary">
                Unverbindliches Angebot berechnen
              </Link>
              <Link href="/contact" className="saarland-secondary-link">
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
