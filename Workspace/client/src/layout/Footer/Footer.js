import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="app-footer">
      <div className="app-footer-inner">
        <div className="app-footer-top">
          <div className="app-footer-main">
            <h2>AutoMove Logistik</h2>
            <p>Professioneller Fahrzeugtransport, sicher und europaweit.</p>
            <Link href="/contact" className="app-footer-cta">
            Zum Kontaktformular
            </Link>
          </div>

          <div className="app-footer-columns">
            <div>
              <span className="app-footer-label">Telefon</span>
              <a href="tel:+491234567890">+49 123 456 7890</a>
            </div>
            <div>
              <span className="app-footer-label">E-Mail</span>
              <a href="mailto:anfrage@automove-logistik.de">
                anfrage@automove-logistik.de
              </a>
            </div>
          </div>

          <nav className="app-footer-legal" aria-label="Rechtliche Hinweise">
            <Link href="/imprint">Impressum</Link>
            <Link href="/privacy">Datenschutz</Link>
            <Link href="/terms">AGB</Link>
          </nav>
        </div>

        <div className="app-footer-bottom">
          <span className="app-footer-meta">© {new Date().getFullYear()} AutoMove Logistik</span>
          <span className="app-footer-meta">
            Preisangabe unverbindlich. Abhol- und Zielort eingeben für Ihr Angebot.
          </span>
          <span className="app-footer-credit app-footer-meta">
            Website entwickelt von{" "}
            <a
              href="https://www.linkedin.com/in/mosaababazid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website entwickelt von Mosaab Abazid (öffnet in neuem Tab)"
              className="app-footer-credit-link"
            >
              Mosaab Abazid
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
