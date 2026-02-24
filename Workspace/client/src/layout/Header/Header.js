"use client";

import "./Header.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Übersicht", sectionId: "hero" },
  { href: "/#services", label: "Leistungen", sectionId: "services" },
  { href: "/#pricing", label: "Preis", sectionId: "pricing" },
  { href: "/contact", label: "Kontakt", sectionId: null },
];

function scrollToSection(sectionId) {
  if (!sectionId) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, [isHome, pathname]);

  const handleNavClick = (e, link) => {
    setOpen(false);
    if (link.sectionId === null) return; // /contact – let Link navigate
    if (!isHome) return; // different page – let Link navigate to /#section
    e.preventDefault();
    scrollToSection(link.sectionId);
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
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="app-header-burger-toggle"
          onClick={toggleMenu}
          style={{ position: "relative", zIndex: 10001 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
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
            className="app-header-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="app-header-nav-list">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.04 * index, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
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
