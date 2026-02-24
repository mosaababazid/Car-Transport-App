"use client";

import "./Header.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Übersicht" },
  { href: "/#services", label: "Leistungen" },
  { href: "/#pricing", label: "Preis" },
  { href: "/contact", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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

  const toggleMenu = () => setOpen(!open);

  return (
    <header
      className="app-header"
      style={open ? { backdropFilter: "none", WebkitBackdropFilter: "none", zIndex: 99999 } : {}}
    >
      <div className="app-header-inner">
        <div className="app-header-brand">
          <span className="app-header-mark" />
          <span className="app-header-title">AutoMove Logistik</span>
        </div>

        <nav className="app-header-nav app-header-nav--desktop">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
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
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.3 }}
          >
            <ul className="app-header-nav-list">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
