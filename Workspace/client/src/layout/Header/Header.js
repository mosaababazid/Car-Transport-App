"use client";

import "./Header.css";
import { useState, useEffect } from "react";
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
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

  const handleNavClick = (e, link) => {
    setOpen(false);
    if (link.sectionId === null) return; // /contact – let Link navigate
    if (!isHome) return; // different page – let Link navigate to /#section
    e.preventDefault();
    scrollToSection(link.sectionId, reducedMotion);
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
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
          >
            <ul className="app-header-nav-list">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : index * STAGGER, ...resolveTransition(reducedMotion, transitionFast) }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
