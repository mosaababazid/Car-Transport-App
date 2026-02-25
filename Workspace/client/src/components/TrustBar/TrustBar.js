"use client";

import "./TrustBar.css";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Globe, BarChart3 } from "lucide-react";
import { STAGGER, VIEWPORT_ONCE_MORE, transitionChild, resolveTransition } from "../../constants/animation";

const ITEMS = [
  {
    icon: ShieldCheck,
    label: "Vollkaskoversichert",
    text: "Jedes Fahrzeug während des gesamten Transports versichert.",
  },
  {
    icon: Globe,
    label: "EU-weit",
    text: "Fahrzeuglogistik in Deutschland und ganz Europa.",
  },
  {
    icon: BarChart3,
    label: "100+ Aufträge / Monat",
    text: "Über 100 erfolgreiche Transporte monatlich.",
  },
];

export default function TrustBar() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="trustbar-section" aria-label="Vertrauensmerkmale">
      <div className="trustbar-inner">
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            className="trustbar-item"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE_MORE}
            transition={{ delay: reducedMotion ? 0 : index * STAGGER, ...resolveTransition(reducedMotion, transitionChild) }}
          >
            <span className="trustbar-icon" aria-hidden="true">
              <item.icon size={20} strokeWidth={1.8} />
            </span>
            <div className="trustbar-content">
              <strong className="trustbar-label">{item.label}</strong>
              <span className="trustbar-text">{item.text}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
