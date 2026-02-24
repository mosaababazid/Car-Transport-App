"use client";

import "./JoinTeam.css";
import { motion } from "framer-motion";

export default function JoinTeam() {
  return (
    <section id="karriere" className="join-team" aria-labelledby="join-team-heading">
      <div className="join-team-bg" aria-hidden="true" />
      <motion.div
        className="join-team-inner"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Jetzt bewerben
        </motion.a>
      </motion.div>
    </section>
  );
}
