"use client";

import "./ProcessFlow.css";
import { useRef, useLayoutEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  STAGGER,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";

const STEPS = [
  {
    number: "01",
    subtitle: "Zuweisung",
    title: "Fahrer-Auswahl",
    description:
      "Einer unserer geschulten Fahrer wird Ihrem Auftrag zugeteilt, für einen zuverlässigen und professionellen Ablauf.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: "02",
    subtitle: "Planung",
    title: "Vereinbarung",
    description:
      "Termine, Uhrzeiten und alle Details werden verbindlich vereinbart. Sie wissen stets, wann Abholung und Anlieferung erfolgen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 15h.008v.008H12V15z" />
      </svg>
    ),
  },
  {
    number: "03",
    subtitle: "Startpunkt",
    title: "Abholung",
    description:
      "Der Fahrer holt Ihr Fahrzeug ab und erstellt ein digitales Übergabeprotokoll. Der Zustand wird lückenlos dokumentiert.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    number: "04",
    subtitle: "Logistik",
    title: "Transport",
    description:
      "Sicherer Transport zu Ihrem Wunschort. Vollkaskoversichert und mit voraussichtlicher Ankunftszeit.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    number: "05",
    subtitle: "Zielort",
    title: "Übergabe",
    description:
      "Am Ziel angekommen: Erneute Dokumentation des Zustands bei der Übergabe. Ihr Fahrzeug wird in demselben Zustand übergeben.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "06",
    subtitle: "Abschluss",
    title: "Dokumentation",
    description:
      "Sie erhalten das elektronische Übergabeprotokoll direkt im Anschluss für Ihre Unterlagen und maximale Transparenz.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

export default function ProcessFlow() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const markerRefs = useRef([]);
  const firstStepMarkerRef = useRef(null);
  const lastStepMarkerRef = useRef(null);
  
  const [trackTopPx, setTrackTopPx] = useState(0);
  const [trackHeightPx, setTrackHeightPx] = useState(null);
  const [markerProgressPoints, setMarkerProgressPoints] = useState([]);
  const [reachedSteps, setReachedSteps] = useState(() => STEPS.map(() => false));
  const [lineReady, setLineReady] = useState(false);

  // حساب أبعاد الخط والخطوات
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
      const span = Math.max(1, lastCenterY - firstCenterY);
      
      const nextProgressPoints = STEPS.map((_, idx) => {
        const markerEl = markerRefs.current[idx];
        if (!markerEl) return idx / Math.max(1, STEPS.length - 1);
        const rect = markerEl.getBoundingClientRect();
        const centerY = rect.top - tlRect.top + rect.height / 2;
        const normalized = (centerY - firstCenterY) / span;
        return Math.max(0, Math.min(1, normalized));
      });
      
      setTrackTopPx(Math.max(0, Math.floor(firstCenterY)));
      setTrackHeightPx(Math.max(0, Math.floor(lastCenterY - firstCenterY)));
      setMarkerProgressPoints(nextProgressPoints);
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
    target: timelineRef,
    offset: ["start 80%", "end 45%"],
  });

  const mappedLineProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  
  const smoothLineProgress = useSpring(mappedLineProgress, {
    stiffness: reducedMotion ? 1000 : 90,
    damping: reducedMotion ? 120 : 32,
    mass: 0.5,
  });
  
  const effectiveLineProgress = reducedMotion ? mappedLineProgress : smoothLineProgress;
  const lineHeight = useTransform(effectiveLineProgress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);

  const updateReachedSteps = useCallback((rawProgress) => {
    if (!markerProgressPoints.length) return;
    const progress = Math.max(0, Math.min(1, rawProgress));
    const lead = 0.02;
    const next = markerProgressPoints.map((point) => progress + lead >= point);
    setReachedSteps((prev) => {
      if (prev.length !== next.length) return next;
      for (let i = 0; i < next.length; i += 1) {
        if (prev[i] !== next[i]) return next;
      }
      return prev;
    });
  }, [markerProgressPoints]);

  useMotionValueEvent(effectiveLineProgress, "change", (value) => {
    updateReachedSteps(value);
  });

  return (
    <section id="process-flow" className="process-flow-section" ref={sectionRef}>
      <div className="process-flow-inner">
        <motion.div
          className="process-flow-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="process-flow-badge">Unser Prozess</span>
          <h2 className="process-flow-title">Ablauf der Zusammenarbeit</h2>
        </motion.div>

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
            {STEPS.map((step, index) => {
              const isReached = reachedSteps[index];
              const isLeft = index % 2 === 0;
              
              return (
                <li
                  key={step.number}
                  className={`process-flow-step process-flow-step--${isLeft ? "left" : "right"} ${
                    isReached ? "is-reached" : ""
                  }`}
                >
                  <motion.div
                    ref={(el) => {
                      markerRefs.current[index] = el;
                      if (index === 0) firstStepMarkerRef.current = el;
                      if (index === STEPS.length - 1) lastStepMarkerRef.current = el;
                    }}
                    className={`process-flow-step-marker ${isReached ? "is-reached" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    onAnimationComplete={() => {
                      if (index === 0) setLineReady(true);
                    }}
                    transition={{
                      delay: reducedMotion ? 0 : index * 0.1,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                  >
                    <div className="marker-ring" />
                    <span className="process-flow-step-number">{step.number}</span>
                  </motion.div>

                  <motion.article
                    className={`process-flow-step-card ${isReached ? "is-reached" : ""}`}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      delay: reducedMotion ? 0 : index * 0.15,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <div className="card-top-accent" />
                    <div className="card-header">
                      <div className="card-icon-wrapper">
                        {step.icon}
                      </div>
                      <span className="card-subtitle">Schritt {step.number} — {step.subtitle}</span>
                    </div>
                    
                    <h3 className="process-flow-step-title">{step.title}</h3>
                    <p className="process-flow-step-desc">{step.description}</p>
                  </motion.article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}