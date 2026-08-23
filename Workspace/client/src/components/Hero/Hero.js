"use client";

import "./Hero.css";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  VIEWPORT_ONCE,
  transitionEntrance,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";

import mainImage from "../../assets/Images/main.jpg";
import heroLogo from "../../assets/Images/logo.svg";

function isIOS() {
  if (typeof navigator === "undefined") return false;

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export default function Hero() {
  const [offset, setOffset] = useState(50);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isIOS() && sectionRef.current) {
      sectionRef.current.classList.add("hero-section--ios");
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const update = () => {
      setOffset(mediaQuery.matches ? 20 : 50);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  const scrollToPricing = () => {
    const target = document.getElementById("pricing");

    if (!target) return;

    const headerHeight =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height"
        )
      ) || 56;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      12;

    window.scrollTo({
      top,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
    >
      <div
        className="hero-image-wrapper"
        aria-hidden="true"
      >
        <Image
          src={mainImage}
          alt=""
          fill
          className="hero-image-inner"
          priority
          sizes="100vw"
        />
      </div>

      <motion.div
        className="hero-inner"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={VIEWPORT_ONCE}
        transition={resolveTransition(
          reducedMotion,
          transitionEntrance
        )}
      >
        <div className="hero-glass-box">
          <div className="hero-glass-content">
            <motion.div
              className="hero-brand"
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={VIEWPORT_ONCE}
              transition={resolveTransition(
                reducedMotion,
                transitionChild
              )}
            >
              <div className="hero-brand-logo-wrap">
                <Image
                  src={heroLogo}
                  alt="Luxor Drive"
                  width={2064}
                  height={512}
                  sizes="(max-width: 639px) 10rem, 15rem"
                  className="hero-brand-logo"
                  priority
                />
              </div>

              <span className="hero-brand-caption">
                LUXOR DRIVE
              </span>
              <span className="hero-brand-tagline">
                Automobil und Transport
              </span>
            </motion.div>

            <motion.span
              className="hero-badge"
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={VIEWPORT_ONCE}
              transition={resolveTransition(
                reducedMotion,
                transitionChild
              )}
            >
              Fahrzeugtransport in Deutschland und Europa
            </motion.span>

            <motion.h1
              className="hero-title"
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={VIEWPORT_ONCE}
              transition={resolveTransition(
                reducedMotion,
                transitionEntrance
              )}
            >
              Autotransport &amp; <em>Fahrzeugtransport</em> deutschlandweit &amp; europaweit
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={{
                opacity: 0,
                x: offset,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={VIEWPORT_ONCE}
              transition={resolveTransition(
                reducedMotion,
                transitionChild
              )}
            >
              Wir transportieren PKW, Transporter, LKW und Busse sicher,
              zuverlässig und transparent von Tür zu Tür. Berechnen Sie ein
              unverbindliches Angebot auf Basis der Strecke.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={VIEWPORT_ONCE}
              transition={resolveTransition(
                reducedMotion,
                transitionEntrance
              )}
            >
              <button
                type="button"
                className="ui-button ui-button--primary hero-primary-button"
                onClick={scrollToPricing}
                aria-label="Zum Preisrechner scrollen"
              >
                Preis berechnen
              </button>

              <Link
                href="/contact"
                className="hero-secondary-link"
                aria-label="Zum Kontaktformular"
              >
                Kontaktieren Sie uns
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
