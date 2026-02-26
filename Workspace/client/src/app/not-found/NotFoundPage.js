"use client";

import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import "../../components/Button/Button.css";
import "./not-found.css";

export default function NotFoundPage() {
  return (
    <div className="app-shell">
      <Header />
      <main id="main-content" className="not-found-main">
        <div className="not-found-glass">
          <span className="not-found-code" aria-hidden="true">
            404
          </span>
          <h1 className="not-found-title">Seite nicht gefunden</h1>
          <p className="not-found-desc">
            Die angeforderte Seite existiert nicht oder wurde verschoben. Zurück zur Startseite.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="not-found-cta btn-primary">
              <Home size={18} strokeWidth={2} aria-hidden="true" />
              Zur Startseite
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="not-found-back ui-button ui-button--ghost"
            >
              <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
              Zurück
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
