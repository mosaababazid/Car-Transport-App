"use client";

import { useState } from "react";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  formatInternationalPhone,
  getPhoneCountry,
  normalizePhoneDigits,
  validatePhoneForCountry,
} from "../../constants/phoneCountries";
import "../../components/Button/Button.css";
import "./contact.css";

function countryCodeToFlag(iso) {
  return String(iso || "")
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
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
    const safePhoneCountry = sanitizeField(phoneCountry, 2).toUpperCase();
    const phoneCountryMeta = getPhoneCountry(safePhoneCountry);
    const safePhoneDigits = normalizePhoneDigits(phone, 20);
    const safePhone = formatInternationalPhone(safePhoneCountry, safePhoneDigits);
    const safeMessage = sanitizeField(message, 2000);

    const nextErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    if (!safeName) nextErrors.name = "Bitte Namen angeben.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) nextErrors.email = "Bitte gültige E-Mail angeben.";
    if (!phoneCountryMeta) {
      nextErrors.phone = "Bitte ein Land für die Vorwahl auswählen.";
    } else if (!safePhoneDigits) {
      nextErrors.phone = "Bitte Telefonnummer angeben.";
    } else if (!validatePhoneForCountry(safePhoneCountry, safePhoneDigits)) {
      nextErrors.phone = `Bitte gültige Festnetz- oder Mobilnummer fuer ${phoneCountryMeta.name} angeben.`;
    }
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
          phoneCountry: safePhoneCountry,
          phoneDigits: safePhoneDigits,
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
      setPhoneCountry(DEFAULT_PHONE_COUNTRY);
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
            <Link href="/" className="back-to-home" aria-label="Zur Startseite">
              <Undo2 size={18} strokeWidth={2.2} aria-hidden="true" />
            </Link>
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
                  className="contact-cta-link btn-primary contact-cta-link--whatsapp"
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
                <div className={`ui-field ${fieldErrors.phone ? "ui-field--error" : ""}`}>
                  <label className="ui-field-label" htmlFor="phone">
                    Telefon
                  </label>
                  <div className={`ui-field-shell contact-phone-shell ${fieldErrors.phone ? "ui-field-shell--error" : ""}`}>
                    <select
                      id="phone-country"
                      className="contact-phone-select"
                      value={phoneCountry}
                      onChange={(e) => setPhoneCountry(e.target.value)}
                      aria-label="Landesvorwahl waehlen"
                    >
                      {PHONE_COUNTRIES.map((country) => (
                        <option key={country.iso} value={country.iso}>
                          {countryCodeToFlag(country.iso)} {country.iso} ({country.dialCode})
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      className="ui-field-input contact-phone-input"
                      type="tel"
                      placeholder="Nummer"
                      value={phone}
                      onChange={(e) => setPhone(normalizePhoneDigits(e.target.value, 20))}
                      maxLength={20}
                      autoComplete="tel-national"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      aria-invalid={fieldErrors.phone ? "true" : undefined}
                      aria-describedby={fieldErrors.phone ? "phone-hint phone-error" : "phone-hint"}
                      required
                    />
                  </div>
                  <span id="phone-hint" className="contact-phone-hint">
                    Format: nur Ziffern nach der Vorwahl, Durchwahl optional.
                  </span>
                  {fieldErrors.phone && (
                    <span id="phone-error" className="ui-field-error" role="alert">
                      {fieldErrors.phone}
                    </span>
                  )}
                </div>
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
