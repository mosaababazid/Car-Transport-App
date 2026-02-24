"use client";

import "./TrustBar.css";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, BarChart3 } from "lucide-react";

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
  return (
    <section className="trustbar-section" aria-label="Vertrauensmerkmale">
      <div className="trustbar-inner">
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            className="trustbar-item"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.04, duration: 0.32, ease: "easeOut" }}
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
