"use client";

import { useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./contact.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Nachricht konnte nicht gesendet werden.");
        return;
      }
      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setError("Verbindungsfehler. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="contact-main">
        <section className="contact-section">
          <div className="contact-wrap">
            <a href="/" className="back-to-home">
              Zur Startseite
            </a>
            <div className="contact-glass">
              <header className="contact-header">
                <span className="contact-kicker">Kontakt</span>
                <h1>Kontaktformular</h1>
                <p>
                  Geben Sie Ihre Daten und Nachricht ein. Wir melden uns schnellstmöglich bei Ihnen.
                </p>
              </header>

              <div className="contact-cta-wrap">
                <a
                  href="https://wa.me/491234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-cta-link"
                >
                  Per WhatsApp schreiben
                </a>
                <a href="tel:+491234567890" className="contact-cta-link contact-cta-link--secondary">
                  Anrufen
                </a>
              </div>

              <p className="contact-form-intro">
                Kontaktieren Sie uns per WhatsApp oder Telefon oder nutzen Sie das Formular.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-grid">
                  <Input
                    id="name"
                    label="Name"
                    placeholder="Ihr Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    id="email"
                    label="E-Mail"
                    type="email"
                    placeholder="ihre@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Input
                  id="phone"
                  label="Telefon (optional)"
                  type="tel"
                  placeholder="z. B. +49 123 456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="ui-field">
                  <label className="ui-field-label" htmlFor="message">
                    Nachricht
                  </label>
                  <div className="ui-field-shell ui-field-shell--textarea">
                    <textarea
                      id="message"
                      className="ui-field-input ui-field-textarea"
                      placeholder="Ihre Nachricht an uns …"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                </div>
                {error && <p className="contact-message contact-message--error">{error}</p>}
                <Button type="submit" disabled={loading}>
                  {loading ? "Wird gesendet …" : sent ? "Gesendet" : "Nachricht senden"}
                </Button>
                {sent && (
                  <p className="contact-hint">
                    Vielen Dank. Ihre Nachricht wurde gesendet. Wir melden uns in Kürze.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
