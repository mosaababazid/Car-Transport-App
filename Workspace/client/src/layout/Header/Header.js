"use client";

import "./Header.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { transitionIcon, transitionFast, STAGGER, resolveTransition } from "../../constants/animation";

const links = [
  { href: "/", label: "Übersicht", sectionId: "hero" },
  { href: "/#services", label: "Leistungen", sectionId: "services" },
  { href: "/#pricing", label: "Preis", sectionId: "pricing" },
  { href: "/contact", label: "Kontakt", sectionId: null },
];

function getSectionIdForLink(link) {
  if (link.sectionId) return link.sectionId;
  if (typeof link.href === "string" && link.href.startsWith("/#")) {
    return link.href.slice(2);
  }
  return null;
}

function scrollToSection(sectionId, reducedMotion) {
  if (!sectionId) {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    return;
  }
  const el = document.getElementById(sectionId);
  if (el) {
    const headerElement = document.querySelector(".app-header");
    const measuredHeaderHeight = headerElement?.getBoundingClientRect().height ?? 0;
    const cssHeaderHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height")
    ) || 56;
    const headerHeight = Math.max(cssHeaderHeight, measuredHeaderHeight);
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  }
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const openRef = useRef(false);
  const sectionVisibilityRef = useRef({});
  const pendingSectionScrollRef = useRef(null);
  const recomputeActiveSectionRef = useRef(() => {});
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reducedMotion = useReducedMotion();
  const isLinkActive = (link) => {
    if (isHome) {
      const sectionId = getSectionIdForLink(link);
      if (sectionId) return activeSection === sectionId;
      return pathname === "/contact";
    }
    return pathname === link.href;
  };

  useEffect(() => {
    openRef.current = open;
    const body = document.body;
    const html = document.documentElement;
    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.overscrollBehavior = "none";
      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.paddingRight = "0px";
    }
    return () => {
      body.style.overflow = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.paddingRight = "0px";
    };
  }, [open]);

  useEffect(() => {
    if (open || !isHome) return;
    const targetSection = pendingSectionScrollRef.current;
    // Run after menu close/body unlock to avoid mobile jump/stuck behavior.
    requestAnimationFrame(() => {
      if (targetSection) {
        scrollToSection(targetSection, reducedMotion);
        pendingSectionScrollRef.current = null;
      } else {
        // No pending navigation: just refresh active state after unlock.
        recomputeActiveSectionRef.current();
      }
    });
  }, [open, isHome, reducedMotion]);

  // After client-side navigation to /#section, scroll to the section
  useEffect(() => {
    if (!isHome || typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const id = decodeURIComponent(hash);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSection(id, reducedMotion);
      });
    });
  }, [isHome, pathname, reducedMotion]);

  useEffect(() => {
    if (!isHome || typeof window === "undefined") return;

    const sectionIds = links
      .map((link) => getSectionIdForLink(link))
      .filter(Boolean);

    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const observedSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        if (openRef.current) return; // Freeze spy while mobile menu is open.
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting) {
            delete sectionVisibilityRef.current[id];
            continue;
          }
          const normalizedHeight = Math.min(entry.boundingClientRect.height, window.innerHeight);
          const score = normalizedHeight > 0
            ? entry.intersectionRect.height / normalizedHeight
            : 0;
          sectionVisibilityRef.current[id] = score;
        }
        updateActiveFromScroll();
      },
      {
        root: null,
        rootMargin: isMobileViewport ? "-8% 0px -58% 0px" : "-10% 0px -20% 0px",
        threshold: isMobileViewport
          ? [0, 0.1, 0.2, 0.35, 0.5, 0.7, 1]
          : Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    const syncObservedSections = () => {
      const liveSections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      for (const section of liveSections) {
        if (!observedSections.has(section)) {
          observer.observe(section);
          observedSections.add(section);
        }
      }

      for (const section of Array.from(observedSections)) {
        if (!liveSections.includes(section)) {
          observer.unobserve(section);
          observedSections.delete(section);
          delete sectionVisibilityRef.current[section.id];
        }
      }

      return liveSections;
    };

    const updateActiveFromScroll = () => {
      if (openRef.current) return; // Prevent re-calculation during body lock.
      if (window.scrollY < 80) {
        setActiveSection("hero");
        return;
      }

      const sections = syncObservedSections();
      if (sections.length === 0) return;

      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height")
      ) || 56;
      const markerY = headerHeight + (isMobileViewport ? 12 : 24);

      let byPosition = sections[0].id;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= markerY) {
          byPosition = section.id;
        } else {
          break;
        }
      }

      let byVisibility = null;
      let visibilityScore = 0;
      for (const [id, score] of Object.entries(sectionVisibilityRef.current)) {
        if (score > visibilityScore) {
          byVisibility = id;
          visibilityScore = score;
        }
      }

      if (byVisibility && visibilityScore >= 0.35) {
        setActiveSection(byVisibility);
      } else {
        setActiveSection(byPosition);
      }
    };

    recomputeActiveSectionRef.current = updateActiveFromScroll;
    syncObservedSections();
    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      sectionVisibilityRef.current = {};
      recomputeActiveSectionRef.current = () => {};
    };
  }, [isHome]);

  const handleNavClick = (e, link) => {
    const sectionId = getSectionIdForLink(link);
    const wasOpen = open;
    setOpen(false);

    if (sectionId === null) return; // /contact – let Link navigate
    if (!isHome) return; // different page – let Link navigate to /#section
    e.preventDefault();
    setActiveSection(sectionId);
    if (wasOpen) {
      // On mobile, wait until overlay closes and body scroll is restored.
      pendingSectionScrollRef.current = sectionId;
      return;
    }
    scrollToSection(sectionId, reducedMotion);
  };

  const toggleMenu = () => setOpen(!open);

  return (
    <header
      className="app-header"
      style={open ? { backdropFilter: "none", WebkitBackdropFilter: "none", zIndex: 99999 } : {}}
    >
      <div className="app-header-inner">
        <Link
          href="/"
          className="app-header-brand"
          onClick={() => setOpen(false)}
          aria-label="AutoMove Logistik – Zur Startseite"
        >
          <span className="app-header-mark" />
          <span className="app-header-title">AutoMove Logistik</span>
        </Link>

        <nav className="app-header-nav app-header-nav--desktop">
          {links.map((link) => {
            const isActive = isLinkActive(link);
            return (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "is-active" : undefined}
            >
              {link.label}
            </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="app-header-burger-toggle"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          style={{ position: "relative", zIndex: 10001 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={resolveTransition(reducedMotion, transitionIcon)}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={resolveTransition(reducedMotion, transitionIcon)}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="app-header-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={resolveTransition(reducedMotion, transitionFast)}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <ul className="app-header-nav-list">
              {links.map((link, index) => {
                const isActive = isLinkActive(link);
                return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : index * STAGGER, ...resolveTransition(reducedMotion, transitionFast) }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    aria-current={isActive ? "page" : undefined}
                    className={isActive ? "is-active" : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
