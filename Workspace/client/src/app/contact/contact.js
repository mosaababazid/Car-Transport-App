"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { BUSINESS, whatsappUrl } from "../../constants/business";
import "../../components/Button/Button.css";
import "./contact.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [callingCode, setCallingCode] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    callingCode: "",
    phone: "",
    message: "",
  });

  function sanitizeField(value, maxLength) {
    return String(value ?? "").trim().slice(0, maxLength);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({ name: "", email: "", callingCode: "", phone: "", message: "" });
    const safeName = sanitizeField(name, 100);
    const safeEmail = String(email ?? "").trim().toLowerCase();
    const safeCallingCode = String(callingCode ?? "").trim();
    const safePhone = String(phone ?? "").trim();
    const safeMessage = sanitizeField(message, 2000);

    const nextErrors = {
      name: "",
      email: "",
      callingCode: "",
      phone: "",
      message: "",
    };
    if (!safeName) nextErrors.name = "Bitte Namen angeben.";
    if (safeEmail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
      nextErrors.email = "Bitte gültige E-Mail angeben.";
    }
    if (safeCallingCode || safePhone) {
      if (!safeCallingCode) {
        nextErrors.callingCode = "Bitte die Vorwahl ergänzen.";
      } else if (!/^\+[1-9]\d{0,2}$/.test(safeCallingCode)) {
        nextErrors.callingCode = "Bitte Vorwahl mit + und 1 bis 3 Ziffern angeben.";
      }
      if (!safePhone) {
        nextErrors.phone = "Bitte die Telefonnummer ergänzen.";
      } else if (!/^[1-9]\d{4,13}$/.test(safePhone)) {
        nextErrors.phone = "Bitte 5 bis 14 Ziffern ohne führende 0 angeben.";
      } else if (`${safeCallingCode.slice(1)}${safePhone}`.length > 15) {
        nextErrors.phone = "Die vollständige Telefonnummer ist zu lang.";
      }
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
          callingCode: safeCallingCode,
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
      setCallingCode("");
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
      <main id="main-content" className="contact-main">
        <section className="contact-section">
          <div className="contact-wrap">
            <Link href="/" className="back-to-home" aria-label="Zur Startseite">
              <ArrowLeft size={17} strokeWidth={2.2} aria-hidden="true" />
              <span className="back-to-home__label">Zurück</span>
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
                  href={whatsappUrl(BUSINESS.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-cta-link btn-primary contact-cta-link--whatsapp"
                >
                  Per WhatsApp schreiben
                </a>
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`} className="contact-cta-link contact-cta-link--secondary">
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
                    label="Name *"
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
                    label="E-Mail *"
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
                <div className="contact-grid">
                  <Input
                    id="calling-code"
                    label="Vorwahl"
                    type="tel"
                    placeholder="+49"
                    value={callingCode}
                    onChange={(e) => setCallingCode(e.target.value)}
                    maxLength={4}
                    inputMode="tel"
                    pattern="\+[1-9][0-9]{0,2}"
                    error={fieldErrors.callingCode}
                  />
                  <Input
                    id="phone"
                    label="Telefonnummer"
                    type="tel"
                    placeholder="17662581522"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    minLength={5}
                    maxLength={14}
                    autoComplete="tel-national"
                    inputMode="numeric"
                    pattern="[1-9][0-9]{4,13}"
                    error={fieldErrors.phone}
                  />
                </div>
                <span className="contact-phone-hint">
                  Beispiel: +49 und 17662581522 (ohne führende 0)
                </span>
                <div className="ui-field">
                  <label className="ui-field-label" htmlFor="message">
                    Nachricht *
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
                <p className="contact-privacy">
                  Wir verarbeiten Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage.
                  Weitere Informationen finden Sie in unserer{" "}
                  <Link href="/privacy">Datenschutzerklärung</Link>.
                </p>
                <Button
                  type="submit"
                  disabled={loading || sent}
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
