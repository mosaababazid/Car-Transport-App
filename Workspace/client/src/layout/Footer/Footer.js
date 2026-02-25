import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="app-footer">
      <div className="app-footer-inner">
        <div className="app-footer-main">
          <h2>AutoMove Logistik</h2>
          <p>Professioneller Fahrzeugtransport, sicher und europaweit. Kontaktieren Sie uns.</p>
          <a href="/contact" className="app-footer-cta">
            Zum Kontaktformular
          </a>
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
          <a href="/imprint">Impressum</a>
          <a href="/privacy">Datenschutzerklärung</a>
          <a href="/terms">AGB</a>
        </nav>
        <div className="app-footer-bottom">
          <span>© {new Date().getFullYear()} AutoMove Logistik</span>
          <span>Preisangabe unverbindlich. Abhol- und Zielort eingeben für Ihr Angebot.</span>
          <span className="app-footer-credit">
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
