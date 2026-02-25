"use client";

import "./Gallery.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  STAGGER,
  VIEWPORT_ONCE,
  transitionEntrance,
  transitionChild,
  resolveTransition,
} from "../../constants/animation";
import { GALLERY_IMAGES } from "../../constants/galleryImages";

export default function Gallery({ variant = "preview" }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const triggerButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i <= 0 ? GALLERY_IMAGES.length - 1 : i - 1));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i >= GALLERY_IMAGES.length - 1 ? 0 : i + 1));
  }, []);

  const close = useCallback(() => {
    setLightboxIndex(null);
    requestAnimationFrame(() => {
      triggerButtonRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    const body = document.body;
    const html = document.documentElement;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";
    body.style.paddingRight = `${scrollBarWidth}px`;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    return () => {
      document.removeEventListener("keydown", handleKey);
      body.style.overflow = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      body.style.paddingRight = "0px";
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
    };
  }, [lightboxIndex, close, goPrev, goNext]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? goPrev() : goNext();
    }
    setTouchStartX(null);
  };

  const isFullPage = variant === "full";
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  return (
    <section
      id="gallery"
      className={`gallery-section ${isFullPage ? "gallery-section--full" : ""}`}
      aria-labelledby="gallery-heading"
    >
      <motion.div
        className="gallery-inner"
        initial={isFullPage ? { opacity: 0, y: 16 } : { opacity: 0, y: 20 }}
        animate={isFullPage ? { opacity: 1, y: 0 } : undefined}
        whileInView={isFullPage ? undefined : { opacity: 1, y: 0 }}
        viewport={isFullPage ? undefined : VIEWPORT_ONCE}
        transition={resolveTransition(reducedMotion, transitionEntrance)}
      >
        {isFullPage && (
          <Link href="/" className="back-to-home">
            Zur Startseite
          </Link>
        )}

        <h2 id="gallery-heading" className="gallery-heading">
          Galerie
        </h2>
        <p className="gallery-subline">
          Hochwertige Fahrzeuglogistik von modernen Transportern bis zum
          europaweiten Einsatz. Jedes Fahrzeug wird mit höchster Sorgfalt
          behandelt.
        </p>

        <div className="gallery-grid">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.article
              key={index}
              className="gallery-card"
              initial={isFullPage ? { opacity: 0, y: 18 } : { opacity: 0, y: 24 }}
              animate={isFullPage ? { opacity: 1, y: 0 } : undefined}
              whileInView={isFullPage ? undefined : { opacity: 1, y: 0 }}
              viewport={isFullPage ? undefined : VIEWPORT_ONCE}
              transition={{
                delay: reducedMotion ? 0 : index * STAGGER,
                ...resolveTransition(reducedMotion, transitionChild),
              }}
            >
              <button
                type="button"
                className="gallery-card-tap-target"
                onClick={(event) => {
                  triggerButtonRef.current = event.currentTarget;
                  setLightboxIndex(index);
                }}
                aria-label={`${item.alt} vergrößern (${index + 1} von ${GALLERY_IMAGES.length})`}
              >
                <div className="gallery-card-glass">
                  <div className="gallery-card-image-wrapper">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="gallery-card-image"
                      priority={isFullPage}
                      loading={isFullPage ? "eager" : "lazy"}
                    />
                    <div className="gallery-card-overlay" />
                  </div>
                  <div className="gallery-card-glow" aria-hidden="true" />
                </div>
              </button>
            </motion.article>
          ))}
        </div>

        {!isFullPage && (
          <motion.div
            className="gallery-cta"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={resolveTransition(reducedMotion, transitionChild)}
          >
            <Link href="/gallery" className="gallery-more-button">
              Mehr anzeigen
            </Link>
          </motion.div>
        )}
      </motion.div>

      {portalTarget && createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="dialog"
              aria-modal="true"
              aria-label="Bildergalerie"
            >
              <button
                type="button"
                className="gallery-lightbox-backdrop"
                onClick={close}
                aria-label="Lightbox schließen"
              />
              <div
                className="gallery-lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="gallery-lightbox-close"
                  ref={closeButtonRef}
                  onClick={close}
                  aria-label="Schließen"
                >
                  <X size={18} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-prev"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="gallery-lightbox-nav gallery-lightbox-next"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
                <div className="gallery-lightbox-media">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightboxIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: reducedMotion ? 0 : 0.25 }}
                      className="gallery-lightbox-image-wrapper"
                    >
                      <Image
                        src={GALLERY_IMAGES[lightboxIndex].src}
                        alt={GALLERY_IMAGES[lightboxIndex].alt}
                        fill
                        sizes="100vw"
                        className="gallery-lightbox-image"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="gallery-lightbox-counter" aria-live="polite">
                  {lightboxIndex + 1} / {GALLERY_IMAGES.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        portalTarget
      )}
    </section>
  );
}
