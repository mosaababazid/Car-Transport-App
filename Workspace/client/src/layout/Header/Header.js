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
    const headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height")
    ) || 56;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  }
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const scrollLockYRef = useRef(0);
  const sectionVisibilityRef = useRef({});
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
    const body = document.body;
    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      scrollLockYRef.current = window.scrollY;
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollLockYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      const y = scrollLockYRef.current || 0;
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "0px";
      if (window.scrollY !== y) {
        window.scrollTo({ top: y, behavior: "auto" });
      }
    }
    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "0px";
    };
  }, [open]);

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

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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

        let topId = null;
        let topScore = 0;
        for (const [id, score] of Object.entries(sectionVisibilityRef.current)) {
          if (score > topScore) {
            topId = id;
            topScore = score;
          }
        }
        if (topId && topScore >= 0.5) {
          setActiveSection(topId);
        }
      },
      {
        root: null,
        rootMargin: "-10% 0px -12% 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (e, link) => {
    setOpen(false);
    const sectionId = getSectionIdForLink(link);
    if (sectionId === null) return; // /contact – let Link navigate
    if (!isHome) return; // different page – let Link navigate to /#section
    e.preventDefault();
    setActiveSection(sectionId);
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
