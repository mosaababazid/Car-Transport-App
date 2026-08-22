"use client";

import "./TrustBar.css";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Globe, BarChart3 } from "lucide-react";
import { STAGGER, VIEWPORT_ONCE_MORE, transitionChild, resolveTransition } from "../../constants/animation";

const ITEMS = [
  {
    icon: BarChart3,
    figure: "100+",
    text: "Erfolgreiche Transporte jeden Monat.",
  },
  {
    icon: Globe,
    figure: "EU-weit",
    text: "Fahrzeuglogistik in Deutschland und ganz Europa.",
  },
  {
    icon: ShieldCheck,
    figure: "Vollkasko",
    text: "Jedes Fahrzeug während des gesamten Transports versichert.",
  },
];

export default function TrustBar() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="trustbar-section" aria-label="Vertrauensmerkmale">
      <div className="trustbar-inner">
        {ITEMS.map((item, index) => (
          <motion.article
            key={item.figure}
            className="trustbar-item"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE_MORE}
            transition={{ delay: reducedMotion ? 0 : index * STAGGER, ...resolveTransition(reducedMotion, transitionChild) }}
          >
            <span className="trustbar-icon" aria-hidden="true">
              <item.icon size={18} strokeWidth={1.6} />
            </span>
            <strong className="trustbar-figure">{item.figure}</strong>
            <p className="trustbar-text">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
