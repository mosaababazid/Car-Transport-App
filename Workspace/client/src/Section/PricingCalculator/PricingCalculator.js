"use client";

import "./PricingCalculator.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "../../components/Button/Button.css";
import { getPriceEstimate } from "../../helpers/api";
import { VIEWPORT_ONCE, transitionEntrance, transitionChild, resolveTransition } from "../../constants/animation";

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        <header className="pricing-header">
          <span className="pricing-kicker">Preisrechner</span>
          <h2>Unverbindliches Angebot</h2>
          <p>
            Abhol- und Zielort eingeben. Die Straßenentfernung wird per Routenberechnung ermittelt;
            der geschätzte Preis wird in Euro (€) angezeigt.
          </p>
        </header>

        <form className="pricing-form" onSubmit={handleSubmit}>
          <div className="pricing-grid">
            <Input
              id="pickup"
              label="Abholort"
              placeholder="Stadt oder genaue Adresse, z. B. Berlin oder Musterstraße 1, 10115 Berlin"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              maxLength={200}
              autoComplete="street-address"
              required
            />
            <Input
              id="dropoff"
              label="Zielort"
              placeholder="Stadt oder genaue Adresse, z. B. München oder Zielstraße 5, 80331 München"
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
            className="btn-primary--block"
          >
            {loading ? "Berechnung läuft…" : "Berechnen"}
          </Button>

          {error && (
            <p className="pricing-message pricing-message--error" role="alert" aria-live="polite">
              {error}
            </p>
          )}

          {result && (
            <motion.div
              className="pricing-result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={resolveTransition(reducedMotion, transitionChild)}
            >
              <div className="pricing-result-row">
                <span className="pricing-result-label">Distanz</span>
                <strong className="pricing-result-value">
                  {result.distance_km.toLocaleString("de-DE", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  km
                </strong>
              </div>
              <div className="pricing-result-row">
                <span className="pricing-result-label">Geschätzter Preis</span>
                <strong className="pricing-result-value pricing-result-price" aria-live="polite">
                  ab {animatedPrice.toLocaleString("de-DE")} €
                </strong>
              </div>
              {typeof result.estimated_hours === "number" && (
                <div className="pricing-result-row">
                  <span className="pricing-result-label">Geschätzte Fahrtzeit</span>
                  <strong className="pricing-result-value">
                    {result.estimated_hours.toLocaleString("de-DE", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    h
                  </strong>
                </div>
              )}
              <div className="pricing-cta-wrap">
                <Link href="/contact" className="pricing-cta-link btn-primary">
                  Kontaktieren
                </Link>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
}
