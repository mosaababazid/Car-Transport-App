"use client";

import "./JoinTeam.css";
import { motion, useReducedMotion } from "framer-motion";
import { transitionEntrance, transitionChild, resolveTransition } from "../../constants/animation";

export default function JoinTeam() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="karriere" className="join-team" aria-labelledby="join-team-heading">
      <div className="join-team-bg" aria-hidden="true" />
      <motion.div
        className="join-team-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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
        <motion.a
          href="/contact"
          className="join-team-cta"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          transition={resolveTransition(reducedMotion, transitionChild)}
        >
          Jetzt bewerben
        </motion.a>
      </motion.div>
    </section>
  );
}
