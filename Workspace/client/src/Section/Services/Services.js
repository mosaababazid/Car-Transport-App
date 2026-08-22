"use client";

import "./Services.css";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BusFront,
  CarFront,
  Route,
  ScanLine,
  Truck,
  Van,
} from "lucide-react";
import {
  STAGGER,
  VIEWPORT_ONCE,
  transitionEntrance,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";

const OFFERINGS = [
  {
    icon: BadgeCheck,
    kicker: "Sicherheit",
    title: "Vollkaskoversichert mit Rundum-Versicherungsschutz",
    description:
      "Jedes Fahrzeug ist während des gesamten Transportvorgangs vollkaskoversichert. Von der Abholung bis zur Anlieferung genießt Ihr Fahrzeug lückenlosen Versicherungsschutz. Transparent und rechtlich abgesichert.",
    tag: "Vollkasko",
  },
  {
    icon: ScanLine,
    kicker: "Transparenz",
    title: "Digitales Übergabeprotokoll",
    description:
      "Professionelle Dokumentation per digitalem Übergabeprotokoll bei Abholung und Übergabe. So haben Sie den Zustand Ihres Fahrzeugs jederzeit nachvollziehbar.",
    tag: "Dokumentiert",
  },
  {
    icon: Route,
    kicker: "Reichweite",
    title: "Europaweite Lieferung (In- und Ausland)",
    description:
      "Fahrzeuglogistik in Deutschland und in ganz Europa. Für Gewerbekunden (B2B) und Privatkunden. Transparente Preise nach Strecke, unverbindliches Angebot in wenigen Klicks.",
    tag: "Deutschland & Europa",
  },
];

const VEHICLE_TYPES = [
  { label: "PKW", icon: CarFront },
  { label: "Transporter", icon: Van },
  { label: "LKW", icon: Truck },
  { label: "Bus", icon: BusFront },
];

export default function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="services" className="services-section">
      <motion.div
        className="services-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        <header className="services-heading">
          <div>
            <p className="services-kicker">Fahrzeugtransport</p>
            <h2 className="services-headline">Unsere Leistungen</h2>
          </div>
          <p className="services-intro">
            Professioneller Fahrzeugtransport in Deutschland und Europa für
            Gewerbekunden (B2B) und Privatkunden. Von der Abholung bis zur
            Anlieferung: transparent, vollkaskoversichert und europaweit.
          </p>
        </header>

        <div className="services-deck">
          {OFFERINGS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className={`services-card services-card--${index + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  delay: reducedMotion ? 0 : index * STAGGER,
                  ...resolveTransition(reducedMotion, transitionChild),
                }}
              >
                <div className="services-card-top">
                  <p className="services-card-kicker">{item.kicker}</p>
                  <span className="services-card-icon" aria-hidden="true">
                    <Icon size={42} strokeWidth={1.1} />
                  </span>
                </div>
                <div className="services-card-copy">
                  <h3 className="services-card-title">{item.title}</h3>
                  <p className="services-card-text">{item.description}</p>
                </div>
                <p className="services-card-tag">
                  <span aria-hidden="true" />
                  {item.tag}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="services-vehicles"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={resolveTransition(reducedMotion, transitionChild)}
        >
          <p className="services-vehicles-label">Wir transportieren</p>
          <ul className="services-vehicles-list" aria-label="Fahrzeugkategorien">
            {VEHICLE_TYPES.map((vehicle) => {
              const Icon = vehicle.icon;
              return (
                <li key={vehicle.label}>
                  <span className="services-vehicle-icon" aria-hidden="true">
                    <Icon size={25} strokeWidth={1.25} />
                  </span>
                  <span>{vehicle.label}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
