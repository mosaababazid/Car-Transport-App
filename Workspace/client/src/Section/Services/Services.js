"use client";

import "./Services.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Car, Truck, Bus, Package, ShieldCheck, Globe, FileCheck } from "lucide-react";

const VEHICLE_TYPES = [
  { label: "PKW", icon: Car },
  { label: "Transporter", icon: Package },
  { label: "LKW", icon: Truck },
  { label: "Bus", icon: Bus },
];

const TRUST_SERVICES = [
  {
    icon: ShieldCheck,
    title: "Vollkaskoversichert mit Rundum-Versicherungsschutz",
    description:
      "Jedes Fahrzeug ist während des gesamten Transportvorgangs vollkaskoversichert. Von der Abholung bis zur Anlieferung genießt Ihr Fahrzeug lückenlosen Versicherungsschutz. Transparent und rechtlich abgesichert.",
    highlight: true,
  },
  {
    icon: FileCheck,
    title: "Digitales Übergabeprotokoll",
    description:
      "Professionelle Dokumentation per digitalem Übergabeprotokoll bei Abholung und Übergabe. So haben Sie den Zustand Ihres Fahrzeugs jederzeit nachvollziehbar.",
  },
  {
    icon: Globe,
    title: "Europaweite Lieferung (In- und Ausland)",
    description:
      "Fahrzeuglogistik in Deutschland und in ganz Europa. Für Gewerbekunden (B2B) und Privatkunden. Transparente Preise nach Strecke, unverbindliches Angebot in wenigen Klicks.",
  },
];

export default function Services() {
  const [baseOffset, setBaseOffset] = useState(50);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setBaseOffset(mediaQuery.matches ? 20 : 50);
    update();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return (
    <section id="services" className="services-section">
      <motion.div
        className="services-inner"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.32, ease: [0, 0, 0.2, 1] }}
      >
        <h2 className="services-headline">Unsere Leistungen</h2>
        <p className="services-subline">
          Professioneller Fahrzeugtransport in Deutschland und Europa für Gewerbekunden (B2B) und Privatkunden. Von der Abholung bis zur Anlieferung: transparent, vollkaskoversichert und europaweit.
        </p>

        <motion.div
          className="services-vehicle-grid"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.26, ease: [0, 0, 0.2, 1] }}
        >
          <p className="services-vehicle-label">Wir transportieren:</p>
          <ul className="services-vehicle-list" aria-label="Fahrzeugkategorien">
            {VEHICLE_TYPES.map((item, index) => (
              <motion.li
                key={item.label}
                className="services-vehicle-item"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.03, duration: 0.24, ease: [0, 0, 0.2, 1] }}
              >
                <span className="services-vehicle-icon" aria-hidden="true">
                  <item.icon size={20} strokeWidth={1.8} />
                </span>
                <span className="services-vehicle-name">{item.label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="services-grid">
          {TRUST_SERVICES.map((item, index) => {
            const fromLeft = index % 2 === 0;
            const xOffset = fromLeft ? -baseOffset : baseOffset;
            return (
              <motion.article
                key={item.title}
                className={`services-card ${item.highlight ? "services-card--highlight" : ""}`}
                initial={{ opacity: 0, x: xOffset }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.32,
                  ease: [0, 0, 0.2, 1],
                }}
              >
                <div className="services-card-icon">
                  <item.icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="services-card-title">{item.title}</h3>
                <p className="services-card-desc">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
