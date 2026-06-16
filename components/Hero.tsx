"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TICKER_ITEMS = [
  "Social Media Management",
  "Website Development",
  "Video Editing",
  "Branding & Design",
  "Digital Marketing",
  "Content Creation",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y      = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const goto = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Top ruled line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border)" }}
      />

      {/* Main content — vertically centered */}
      <motion.div
        style={{ y, opacity }}
        className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-24 pb-8"
      >
        <div className="grid lg:grid-cols-12 gap-0 items-end">

          {/* Left — Badge + Headline */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="badge">Creative Studio · Est. 2022</div>
            </motion.div>

            <h1
              className="display-title mb-0"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
              aria-label="We don't just market. We make brands impossible to ignore."
            >
              {/* Line 1 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                >
                  We Don&apos;t
                </motion.span>
              </div>

              {/* Line 2 — yellow highlight */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                  style={{ color: "var(--text-primary)" }}
                >
                  Just{" "}
                  <span className="relative inline-block">
                    Market.
                    <span
                      className="absolute bottom-1 left-0 w-full"
                      style={{ height: "8px", background: "var(--yellow)", zIndex: -1, opacity: 0.8 }}
                    />
                  </span>
                </motion.span>
              </div>

              {/* Line 3 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                >
                  We Make
                </motion.span>
              </div>

              {/* Line 4 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                >
                  Brands{" "}
                  <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>
                    Impossible
                  </span>
                </motion.span>
              </div>

              {/* Line 5 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                >
                  To Ignore.
                </motion.span>
              </div>
            </h1>
          </div>

          {/* Right — Sub + CTA (editorial column) */}
          <motion.div
            className="lg:col-span-4 lg:pl-12 mt-12 lg:mt-0 lg:pb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            {/* Vertical rule */}
            <div
              className="hidden lg:block mb-6"
              style={{ width: "1px", height: "40px", background: "var(--border-strong)" }}
            />

            <p
              className="leading-relaxed mb-8 text-sm"
              style={{ color: "var(--text-secondary)", maxWidth: "300px" }}
            >
              REDIX.MEDIA helps businesses grow through strategic content, stunning websites,
              branding, and digital experiences that drive real results.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <motion.button
                id="hero-start-project-btn"
                onClick={() => goto("#contact")}
                className="btn-yellow group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Your Project
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                id="hero-view-work-btn"
                onClick={() => goto("#portfolio")}
                className="btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                View Our Work
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { v: "50+", l: "Projects" },
                { v: "30+", l: "Clients" },
                { v: "2+",  l: "Years" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="font-black text-2xl"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker strip at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="overflow-hidden"
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        <div
          className="flex items-center py-3 whitespace-nowrap"
          style={{ animation: "ticker 22s linear infinite" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 text-xs font-bold tracking-widest uppercase px-8"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
            >
              <span style={{ color: "var(--yellow)", fontSize: "0.6rem" }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
