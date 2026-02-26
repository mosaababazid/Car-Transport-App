"use client";

import { useEffect, useRef } from "react";
import "./JoinTeam.css";
import { motion, useReducedMotion } from "framer-motion";
import "../../components/Button/Button.css";
import { transitionEntrance, resolveTransition } from "../../constants/animation";

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export default function JoinTeam() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isIOS() && sectionRef.current) {
      sectionRef.current.classList.add("join-team--ios");
    }
  }, []);

  return (
    <section ref={sectionRef} id="karriere" className="join-team" aria-labelledby="join-team-heading">
      <div className="join-team-bg" aria-hidden="true" />
      <motion.div
        className="join-team-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        <h2 id="join-team-heading" className="join-team-headline">
          Mach dein Hobby zum Beruf!
        </h2>
        <p className="join-team-subline">
          Du liebst Autos? Du fährst gerne lange Strecken? Du möchtest mit deiner Leidenschaft Geld verdienen?
        </p>
        <p className="join-team-action">
          Dann bewirb dich jetzt bei uns und werde Teil unseres Teams.
        </p>
        <div className="join-team-actions">
          <a href="/contact" className="join-team-cta btn-primary">
            Jetzt bewerben
          </a>
        </div>
      </motion.div>
    </section>
  );
}
