"use client";

import "./ProcessFlow.css";
import { useRef, useLayoutEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import {
  UserRound,
  CalendarDays,
  CarFront,
  Route,
  CircleCheck,
  FileCheck2,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    label: "Zuweisung",
    title: "Fahrer-Auswahl",
    text: "Einer unserer geschulten Fahrer wird Ihrem Auftrag zugeteilt und übernimmt den Transport zuverlässig und professionell.",
    icon: UserRound,
    meta: "Persönlich zugewiesen",
  },
  {
    number: "02",
    label: "Planung",
    title: "Vereinbarung",
    text: "Abholung, Uhrzeit, Zielort und alle relevanten Details werden verbindlich mit Ihnen abgestimmt.",
    icon: CalendarDays,
    meta: "Verbindlich geplant",
  },
  {
    number: "03",
    label: "Startpunkt",
    title: "Abholung",
    text: "Ihr Fahrzeug wird abgeholt und der Zustand wird direkt vor Ort digital dokumentiert.",
    icon: CarFront,
    meta: "Digital dokumentiert",
  },
  {
    number: "04",
    label: "Logistik",
    title: "Transport",
    text: "Ihr Fahrzeug wird sicher und vollkaskoversichert zum vereinbarten Zielort transportiert.",
    icon: Route,
    meta: "Vollkaskoversichert",
  },
  {
    number: "05",
    label: "Zielort",
    title: "Übergabe",
    text: "Am Zielort erfolgt die erneute Zustandsprüfung und die persönliche Übergabe des Fahrzeugs.",
    icon: CircleCheck,
    meta: "Sicher übergeben",
  },
  {
    number: "06",
    label: "Abschluss",
    title: "Dokumentation",
    text: "Das vollständige digitale Übergabeprotokoll steht Ihnen direkt nach Abschluss zur Verfügung.",
    icon: FileCheck2,
    meta: "Alles nachvollziehbar",
  },
];

export default function ProcessFlow() {
  const timelineRef = useRef(null);
  const markerRefs = useRef([]);

  const reducedMotion = useReducedMotion();

  const [points, setPoints] = useState([]);
  const [trackTop, setTrackTop] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [ready, setReady] = useState(false);
  const [progressRange, setProgressRange] = useState({
    start: 0,
    end: 1,
  });
  const [reached, setReached] = useState(
    STEPS.map(() => false)
  );

  useLayoutEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) return;

    const measure = () => {
      const tlRect = timeline.getBoundingClientRect();
      const markers = markerRefs.current.filter(Boolean);

      if (markers.length !== STEPS.length) return;

      const centers = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return rect.top - tlRect.top + rect.height / 2;
      });

      const first = centers[0];
      const last = centers[centers.length - 1];
      const span = Math.max(1, last - first);
      const documentOffset = tlRect.top + window.scrollY;

      setTrackTop(first);
      setTrackHeight(span);
      setProgressRange({
        start: documentOffset + first - window.innerHeight * 0.78,
        end: documentOffset + last - window.innerHeight * 0.72,
      });

      setPoints(
        centers.map((center) =>
          Math.max(0, Math.min(1, (center - first) / span))
        )
      );
    };

    measure();
    const measureFrame = requestAnimationFrame(measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(timeline);

    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(measureFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollY } = useScroll();

  const rawProgress = useTransform(
    scrollY,
    [progressRange.start, progressRange.end],
    [0, 1]
  );

  const smoothProgress = useSpring(rawProgress, {
    stiffness: reducedMotion ? 1000 : 150,
    damping: reducedMotion ? 100 : 30,
    mass: 0.3,
  });

  const progress = reducedMotion ? rawProgress : smoothProgress;

  const lineHeight = useTransform(rawProgress, (value) => {
    return `${Math.max(0, Math.min(1, value)) * 100}%`;
  });

  const updateReached = useCallback(
    (value) => {
      if (!points.length) return;

      const next = points.map((point) => value + 0.025 >= point);

      setReached((prev) => {
        if (
          prev.length === next.length &&
          prev.every((item, index) => item === next[index])
        ) {
          return prev;
        }

        return next;
      });
    },
    [points]
  );

  useMotionValueEvent(progress, "change", updateReached);

  return (
    <section id="process-flow" className="process-flow">
      <div className="process-flow-inner">
        <motion.header
          className="process-flow-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="process-flow-eyebrow">
            <span />
            Unser Prozess
            <span />
          </div>

          <h2>
            Von der Abholung
            <br />
            <em>bis zur Übergabe.</em>
          </h2>

          <p>
            Jeder Transport folgt einem klaren Ablauf.
            Persönlich betreut, digital dokumentiert und
            transparent nachvollziehbar.
          </p>
        </motion.header>

        <div className="process-flow-timeline" ref={timelineRef}>
          <div
            className={`process-flow-track ${
              ready ? "is-ready" : ""
            }`}
            style={{
              top: trackTop,
              height: trackHeight,
            }}
          >
            <div className="process-flow-track-base" />

            <motion.div
              className="process-flow-track-progress"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="process-flow-steps">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = reached[index];
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={step.number}
                  className={`process-flow-step ${
                    isLeft ? "is-left" : "is-right"
                  } ${isActive ? "is-active" : ""}`}
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    delay: reducedMotion ? 0 : index * 0.08,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="process-flow-step-side">
                    <span className="process-flow-step-index">
                      {step.number}
                    </span>
                  </div>

                  <div
                    className="process-flow-marker"
                    ref={(element) => {
                      markerRefs.current[index] = element;

                      if (
                        index === STEPS.length - 1 &&
                        element
                      ) {
                        requestAnimationFrame(() =>
                          setReady(true)
                        );
                      }
                    }}
                  >
                    <div className="process-flow-marker-core">
                      <Icon
                        size={17}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="process-flow-marker-ring" />
                    <div className="process-flow-marker-pulse" />
                  </div>

                  <div className="process-flow-card">
                    <div className="process-flow-card-top">
                      <span>{step.label}</span>
                      <span>{step.number} / 06</span>
                    </div>

                    <div className="process-flow-card-main">
                      <div className="process-flow-card-icon">
                        <Icon
                          size={22}
                          strokeWidth={1.35}
                        />
                      </div>

                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                    </div>

                    <div className="process-flow-card-bottom">
                      <span className="process-flow-status">
                        <i />
                        {step.meta}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}