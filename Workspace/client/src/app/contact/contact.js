"use client";

import { useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "../../components/Button/Button.css";
import "./contact.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function sanitizeField(value, maxLength) {
    return String(value ?? "").trim().slice(0, maxLength);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({ name: "", email: "", phone: "", message: "" });
    const safeName = sanitizeField(name, 100);
    const safeEmail = sanitizeField(email, 255).toLowerCase();
    const safePhone = sanitizeField(phone, 30);
    const safeMessage = sanitizeField(message, 2000);

    const nextErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    if (!safeName) nextErrors.name = "Bitte Namen angeben.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) nextErrors.email = "Bitte gültige E-Mail angeben.";
    if (safePhone && !/^[+()\d\s-]{6,30}$/.test(safePhone)) nextErrors.phone = "Bitte gültige Telefonnummer angeben.";
    if (!safeMessage) nextErrors.message = "Bitte Nachricht angeben.";

    if (Object.values(nextErrors).some(Boolean)) {
      setFieldErrors(nextErrors);
      setError("Bitte prüfen Sie die markierten Felder.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: safeName,
          email: safeEmail,
          phone: safePhone,
          message: safeMessage,
        }),
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
                  className="contact-cta-link btn-primary"
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
                    maxLength={100}
                    autoComplete="name"
                    error={fieldErrors.name}
                    required
                  />
                  <Input
                    id="email"
                    label="E-Mail"
                    type="email"
                    placeholder="ihre@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    autoComplete="email"
                    inputMode="email"
                    error={fieldErrors.email}
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
                  maxLength={30}
                  autoComplete="tel"
                  inputMode="tel"
                  error={fieldErrors.phone}
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
                      maxLength={2000}
                      aria-invalid={fieldErrors.message ? "true" : undefined}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      required
                    />
                  </div>
                  {fieldErrors.message && (
                    <span id="message-error" className="ui-field-error" role="alert">
                      {fieldErrors.message}
                    </span>
                  )}
                </div>
                {error && (
                  <p className="contact-message contact-message--error" role="alert" aria-live="polite">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="btn-primary--block"
                >
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
