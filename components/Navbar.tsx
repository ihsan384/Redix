"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Founders", href: "#founders" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const goto = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed z-50 transition-all duration-500"
        style={{
          top: scrolled ? "12px" : "0",
          left: scrolled ? "24px" : "0",
          right: scrolled ? "24px" : "0",
          borderRadius: scrolled ? "var(--radius-lg)" : "0",
          ...(scrolled
            ? {
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
              }
            : {
                background: "transparent",
                border: "1px solid transparent",
              }),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); goto("#home"); }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.svg"
              alt="Redix Media Logo"
              className="w-8 h-8 object-cover flex-shrink-0"
              style={{ borderRadius: "2px" }}
            />
            <span
              className="font-black text-lg tracking-tight"
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
                className="nav-link"
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
            >
              Start Project
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            id="nav-menu-toggle"
            className="lg:hidden p-2 rounded"
            style={{ color: "var(--text-primary)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); goto(link.href); }}
                  className="py-3 text-xl font-bold tracking-tight transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-space)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ color: "var(--yellow)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); goto("#contact"); }}
                className="btn-yellow mt-6 text-center justify-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Start Your Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
