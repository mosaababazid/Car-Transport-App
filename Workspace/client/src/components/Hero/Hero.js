"use client";

import "./Hero.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

export default function Hero() {
  const [offset, setOffset] = useState(50);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setOffset(mediaQuery.matches ? 20 : 50);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.82, ease: [0.33, 1, 0.68, 1] }}
      >
        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          Über 100+ Transporte monatlich in ganz Europa
        </motion.span>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, x: -offset }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.82, ease: [0.33, 1, 0.68, 1] }}
        >
          Professioneller Fahrzeugtransport in ganz Europa
        </motion.h1>
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, x: offset }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.82, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
        >
          Sicher, zuverlässig und transparent, von Tür zu Tür. Holen Sie sich in
          Sekunden ein unverbindliches Angebot basierend auf der Strecke.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.82, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        >
          <a href="#pricing" className="hero-primary-link" aria-label="Zum Preisrechner scrollen">
            <Button>Preis berechnen</Button>
          </a>
          <a href="/contact" className="hero-secondary-link" aria-label="Zum Kontaktformular">
            Kontaktieren Sie uns
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
