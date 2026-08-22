"use client";

import "./PricingCalculator.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Map, Clock } from "lucide-react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "../../components/Button/Button.css";
import { getPriceEstimate } from "../../helpers/api";
import {
  transitionEntrance,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";

export default function PricingCalculator() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [result, setResult] = useState(null);
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    const safePickup = pickup.trim().slice(0, 200);
    const safeDropoff = dropoff.trim().slice(0, 200);

    if (!safePickup || !safeDropoff) {
      setError("Bitte geben Sie Abhol- und Zielort an.");
      return;
    }

    setLoading(true);
    try {
      const data = await getPriceEstimate(safePickup, safeDropoff);
      setResult(data);
    } catch (err) {
      setError(
        "Die Preisberechnung ist derzeit nicht erreichbar. Bitte Adressen prüfen oder später erneut versuchen."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!result?.price) {
      setAnimatedPrice(0);
      return;
    }
    if (reducedMotion) {
      setAnimatedPrice(result.price);
      return;
    }

    const target = result.price;
    const duration = 900;
    const start = performance.now();
    const initial = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(initial + (target - initial) * eased);
      setAnimatedPrice(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [result?.price, reducedMotion]);

  return (
    <section id="pricing" className="pricing-section">
      <motion.div
        className="pricing-inner pricing-glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        <header className="pricing-header">
          <div className="pricing-eyebrow">
            <span />
            Preisrechner
            <span />
          </div>
          <h2>
            Unverbindliches <em>Angebot</em>
          </h2>
          <p>
            Geben Sie Abhol- und Zielort ein. Die Routenberechnung ermittelt die
            Entfernung und erstellt ein geschätztes Angebot.
          </p>
        </header>

        <form className="pricing-form" onSubmit={handleSubmit}>
          <div className="pricing-grid">
            <Input
              id="pickup"
              label="Abholort"
              placeholder="z. B. Berlin oder Startstraße 1, 10115"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              maxLength={200}
              autoComplete="street-address"
              required
            />
            <Input
              id="dropoff"
              label="Zielort"
              placeholder="z. B. München oder Zielstraße 5, 80331"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              maxLength={200}
              autoComplete="street-address"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="btn-primary--block pricing-submit-btn"
          >
            {loading ? "Berechnung läuft…" : "Angebot anfordern"}
          </Button>

          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pricing-message pricing-message--error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </motion.p>
          )}

          {result && (
            <motion.div
              className="pricing-result"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={resolveTransition(reducedMotion, transitionChild)}
            >
              <div className="pricing-result-content">
                <div className="pricing-result-row">
                  <span className="pricing-result-label">
                    <Map size={16} strokeWidth={1.5} />
                    Distanz
                  </span>
                  <strong className="pricing-result-value">
                    {Number(result.distance_km ?? 0).toLocaleString("de-DE", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    km
                  </strong>
                </div>

                {typeof result.estimated_hours === "number" && (
                  <div className="pricing-result-row">
                    <span className="pricing-result-label">
                      <Clock size={16} strokeWidth={1.5} />
                      Geschätzte Fahrtzeit
                    </span>
                    <strong className="pricing-result-value">
                      {result.estimated_hours.toLocaleString("de-DE", {
                        maximumFractionDigits: 1,
                      })}{" "}
                      h
                    </strong>
                  </div>
                )}
              </div>

              <div className="pricing-result-total">
                <span className="pricing-total-label">Geschätzter Preis</span>
                <strong className="pricing-total-value" aria-live="polite">
                  ab {animatedPrice.toLocaleString("de-DE")} €
                </strong>
              </div>

              <div className="pricing-cta-wrap">
                <Link href="/contact" className="pricing-cta-link">
                  Transport verbindlich anfragen
                </Link>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
}