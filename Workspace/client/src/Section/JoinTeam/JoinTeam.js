"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./JoinTeam.css";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      <motion.div
        className="join-team-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        <div className="join-team-eyebrow">
          <span />
          Karriere
          <span />
        </div>

        <h2 id="join-team-heading" className="join-team-headline">
          Mach dein Hobby zum <em>Beruf!</em>
        </h2>

        <p className="join-team-subline">
          Du liebst Autos? Du fährst gerne lange Strecken? Du möchtest mit deiner Leidenschaft Geld verdienen?
        </p>

        <div className="join-team-divider" />

        <p className="join-team-action">
          Dann bewirb dich jetzt bei uns und werde Teil unseres Teams.
        </p>

        <div className="join-team-actions">
          <Link href="/contact" className="join-team-cta">
            Jetzt bewerben
          </Link>
        </div>
      </motion.div>
    </section>
  );
}