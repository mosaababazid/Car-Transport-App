"use client";

import "./Services.css";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  BadgeCheck,
  Route,
  ScanLine,
} from "lucide-react";
import {
  PiBusDuotone,
  PiCarProfileDuotone,
  PiTruckTrailerDuotone,
  PiVanDuotone,
} from "react-icons/pi";
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
      "Jedes Fahrzeug ist während des gesamten Transports voll kaskoversichert. Von der Abnahme bis zur schlüsselfertigen Übergabe genießen Sie lückenlosen Schutz nach höchsten Branchenstandards, transparent und rechtlich abgesichert.",
    tag: "Vollkasko",
  },
  {
    icon: ScanLine,
    kicker: "Transparenz",
    title: "Digitales Übergabeprotokoll",
    description:
      "Detaillierte Dokumentation des Fahrzeugzustands inklusive Fotos bei Abholung und Zustellung. Das digitale Protokoll wird Ihnen direkt übermittelt, für maximale Transparenz und Nachvollziehbarkeit.",
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
  { label: "PKW", icon: PiCarProfileDuotone },
  { label: "Transporter", icon: PiVanDuotone },
  { label: "LKW", icon: PiTruckTrailerDuotone },
  { label: "Bus", icon: PiBusDuotone },
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
            <span>
              Luxor Drive hat seinen Sitz in{" "}
              <Link href="/autotransport-saarland">St. Wendel im Saarland</Link>{" "}
              und transportiert PKW, Transporter, LKW und Busse deutschlandweit und europaweit.
            </span>
            <span>
              Für Privat- und Gewerbekunden – vollkaskoversichert und digital dokumentiert.
            </span>
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
