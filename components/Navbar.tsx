"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: track which section is currently visible
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const goto = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed z-50 transition-all duration-500 ${
          scrolled
            ? "top-2 sm:top-3 left-2.5 sm:left-6 right-2.5 sm:right-6 rounded-xl sm:rounded-2xl"
            : "top-0 left-0 right-0 rounded-none"
        }`}
        style={
          scrolled
            ? {
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
              }
            : {
                background: "transparent",
                border: "1px solid transparent",
              }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); goto("#home"); }}
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Redix Media Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-cover flex-shrink-0"
              style={{ borderRadius: "2px" }}
            />
            <span
              className="font-black text-base sm:text-lg tracking-tight"
              style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
            >
              REDIX<span style={{ color: "var(--text-muted)" }}>.MEDIA</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); goto(link.href); }}
                className={`nav-link ${activeSection === link.href ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — Yellow for high visibility */}
          <div className="hidden lg:block">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); goto("#contact"); }}
              className="btn-yellow text-xs px-5 py-2.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-analytics="nav-cta"
            >
              Start Project
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            id="nav-menu-toggle"
            className="lg:hidden p-2 rounded flex items-center justify-center cursor-pointer transition-colors"
            style={{ color: "var(--text-primary)", minWidth: "44px", minHeight: "44px" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full screen overlay with safe scroll */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center min-h-full py-20 px-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); goto(link.href); }}
                  className="py-2.5 sm:py-3 text-lg sm:text-xl font-bold tracking-tight transition-colors"
                  style={{
                    color: activeSection === link.href ? "var(--yellow-hover)" : "var(--text-primary)",
                    fontFamily: "var(--font-space)",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ color: "var(--yellow)" }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="w-12 h-px my-2" style={{ background: "var(--border-strong)" }} />

              <motion.a
                href="https://wa.me/919497013275?text=Hi%20REDIX%20Media%2C%20I%27d%20like%20to%20discuss%20a%20project%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-yellow mt-3 w-full max-w-xs text-center justify-center text-sm flex items-center gap-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                data-analytics="mobile-nav-whatsapp-cta"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
