"use client";

import "./TrustBar.css";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
    text: "Zuverlässige Logistik in Deutschland & ganz Europa",
  },
  {
    icon: ShieldCheck,
    figure: "Vollkasko",
    text: "Rundum abgesichert während des gesamten Transports",
  },
];

function TrustFigure({ figure, reducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) return;

    const duration = 1150;
    const startTime = performance.now();
    let frameId;
    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * 100));
      if (progress < 1) frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, reducedMotion]);

  if (figure !== "100+") return figure;

  return (
    <span ref={ref}>
      {reducedMotion && isInView ? 100 : value}
      <span className="trustbar-plus">+</span>
    </span>
  );
}

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
            <strong className="trustbar-figure">
              <TrustFigure figure={item.figure} reducedMotion={reducedMotion} />
            </strong>
            <p className="trustbar-text">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
