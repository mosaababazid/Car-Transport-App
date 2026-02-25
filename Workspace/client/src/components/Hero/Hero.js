"use client";

import "./Hero.css";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  VIEWPORT_ONCE,
  transitionEntrance,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";

export default function Hero() {
  const [offset, setOffset] = useState(50);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setOffset(mediaQuery.matches ? 20 : 50);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const scrollToPricing = () => {
    const target = document.getElementById("pricing");
    if (!target) return;
    const headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height")
    ) || 56;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={resolveTransition(reducedMotion, transitionChild)}
        >
          Über 100+ Transporte monatlich in ganz Europa
        </motion.span>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={resolveTransition(reducedMotion, transitionEntrance)}
        >
          Professioneller Fahrzeugtransport in ganz Europa
        </motion.h1>
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, x: offset }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={resolveTransition(reducedMotion, transitionChild)}
        >
          Sicher, zuverlässig und transparent, von Tür zu Tür. Holen Sie sich in
          Sekunden ein unverbindliches Angebot basierend auf der Strecke.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={resolveTransition(reducedMotion, transitionEntrance)}
        >
          <button
            type="button"
            className="ui-button ui-button--primary hero-primary-button"
            onClick={scrollToPricing}
            aria-label="Zum Preisrechner scrollen"
          >
            Preis berechnen
          </button>
          <a href="/contact" className="hero-secondary-link" aria-label="Zum Kontaktformular">
            Kontaktieren Sie uns
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
