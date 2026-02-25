"use client";

import "./ProcessFlow.css";
import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  STAGGER,
  VIEWPORT_ONCE_MORE,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";

const STEPS = [
  {
    number: "1",
    title: "Fahrer-Auswahl",
    description:
      "Einer unserer geschulten Fahrer wird Ihrem Auftrag zugeteilt, für einen zuverlässigen und professionellen Ablauf.",
  },
  {
    number: "2",
    title: "Vereinbarung",
    description: "Termine, Uhrzeiten und alle Details werden verbindlich vereinbart. Sie wissen stets, wann Abholung und Anlieferung erfolgen.",
  },
  {
    number: "3",
    title: "Abholung",
    description:
      "Der Fahrer holt Ihr Fahrzeug ab und erstellt ein digitales Übergabeprotokoll. Der Zustand wird lückenlos dokumentiert, so starten wir transparent und nachvollziehbar.",
  },
  {
    number: "4",
    title: "Transport",
    description:
      "Sicherer Transport zu Ihrem Wunschort. Vollkaskoversichert und mit voraussichtlicher Ankunftszeit.",
  },
  {
    number: "5",
    title: "Übergabe",
    description:
      "Am Ziel angekommen: Erneute Dokumentation des Zustands und digitales Übergabeprotokoll bei der Übergabe. Ihr Fahrzeug wird in demselben Zustand übergeben, in dem es abgeholt wurde.",
  },
  {
    number: "6",
    title: "Dokumentation",
    description:
      "Sie erhalten das elektronische Übergabeprotokoll direkt im Anschluss für Ihre Unterlagen und maximale Transparenz.",
  },
];

export default function ProcessFlow() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const lastStepRef = useRef(null);
  const firstStepMarkerRef = useRef(null);
  const lastStepMarkerRef = useRef(null);
  const [trackTopPx, setTrackTopPx] = useState(0);
  const [trackHeightPx, setTrackHeightPx] = useState(null);
  const [lineReady, setLineReady] = useState(false);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    const firstMarker = firstStepMarkerRef.current;
    const lastMarker = lastStepMarkerRef.current;
    if (!timeline || !firstMarker || !lastMarker) return;
    const measure = () => {
      const tlRect = timeline.getBoundingClientRect();
      const firstRect = firstMarker.getBoundingClientRect();
      const lastRect = lastMarker.getBoundingClientRect();
      const firstCenterY = firstRect.top - tlRect.top + firstRect.height / 2;
      const lastCenterY = lastRect.top - tlRect.top + lastRect.height / 2;
      setTrackTopPx(Math.max(0, Math.floor(firstCenterY)));
      setTrackHeightPx(Math.max(0, Math.floor(lastCenterY - firstCenterY)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(timeline);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, (v) => `${ v * 100}%`);

  return (
    <section id="process-flow" className="process-flow-section" ref={sectionRef}>
      <div className="process-flow-inner">
        <motion.h2
          className="process-flow-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE_MORE}
          transition={resolveTransition(reducedMotion, transitionChild)}
        >
          Ablauf der Zusammenarbeit
        </motion.h2>

        <div className="process-flow-timeline" ref={timelineRef}>
          <div
            className={`process-flow-line-track ${lineReady ? "is-ready" : ""}`}
            style={
              trackHeightPx != null
                ? { top: trackTopPx, height: trackHeightPx }
                : undefined
            }
          >
            <motion.div
              className="process-flow-line-fill"
              style={{ height: lineHeight }}
            />
            <div className="process-flow-line-glow" aria-hidden="true">
              <motion.div
                className="process-flow-line-glow-inner"
                style={{ height: lineHeight }}
              />
            </div>
          </div>

          <ul className="process-flow-steps">
            {STEPS.map((step, index) => (
              <li
                key={step.number}
                ref={index === STEPS.length - 1 ? lastStepRef : null}
                className={`process-flow-step process-flow-step--${index % 2 === 0 ? "left" : "right"}`}
              >
                <motion.div
                  ref={index === 0 ? firstStepMarkerRef : index === STEPS.length - 1 ? lastStepMarkerRef : null}
                  className="process-flow-step-marker"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  onAnimationComplete={() => {
                    if (index === 0) setLineReady(true);
                  }}
                  transition={{
                    delay: reducedMotion ? 0 : index * STAGGER,
                    ...resolveTransition(reducedMotion, transitionChild),
                  }}
                >
                  <span className="process-flow-step-number">{step.number}</span>
                </motion.div>
                <motion.article
                  className="process-flow-step-card"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    delay: reducedMotion ? 0 : index * STAGGER,
                    ...resolveTransition(reducedMotion, transitionChild),
                  }}
                >
                  <h3 className="process-flow-step-title">{step.title}</h3>
                  <p className="process-flow-step-desc">{step.description}</p>
                </motion.article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
