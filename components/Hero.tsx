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
      {/* Main content — vertically centered */}
      <motion.div
        style={{ y, opacity }}
        className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-24 pb-12"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left — Badge + Headline + CTA */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="badge">Creative Studio · Est. 2022</div>
            </motion.div>

            <h1
              className="display-title mb-0"
              style={{ fontSize: "clamp(2.5rem, 6.2vw, 5.75rem)", lineHeight: 1.05, maxWidth: "760px" }}
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

            {/* Description + CTA (below headline on all screens) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="mt-8 lg:mt-10"
            >
              <p
                className="leading-relaxed mb-6 text-[0.95rem]"
                style={{ color: "var(--text-secondary)", maxWidth: "480px" }}
              >
                REDIX.MEDIA helps businesses grow through strategic content, stunning websites,
                branding, and digital experiences that drive real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  id="hero-start-project-btn"
                  onClick={() => goto("#contact")}
                  className="btn-yellow group"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Your Project
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  id="hero-view-work-btn"
                  onClick={() => goto("#portfolio")}
                  className="btn-outline"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Our Work
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right — Floating creative visual elements */}
          <motion.div
            className="lg:col-span-5 hidden lg:flex relative"
            style={{ minHeight: "480px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Website mockup frame 1 */}
            <motion.div
              className="absolute animate-float-slow"
              style={{
                top: "10%",
                right: "5%",
                width: "260px",
                height: "180px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-1.5 px-3 py-2"
                style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-primary)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#FFBD2E" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#27CA40" }} />
                <div
                  className="ml-2 h-3 rounded flex-1 max-w-20"
                  style={{ background: "var(--bg-secondary)" }}
                />
              </div>
              {/* Content placeholder */}
              <div className="p-3 space-y-2">
                <div className="h-3 rounded" style={{ background: "var(--border)", width: "70%" }} />
                <div className="h-2 rounded" style={{ background: "var(--border)", width: "100%" }} />
                <div className="h-2 rounded" style={{ background: "var(--border)", width: "85%" }} />
                <div className="flex gap-2 mt-3">
                  <div className="h-6 rounded" style={{ background: "var(--yellow)", width: "60px" }} />
                  <div className="h-6 rounded" style={{ background: "var(--border)", width: "50px" }} />
                </div>
              </div>
            </motion.div>

            {/* Website mockup frame 2 */}
            <motion.div
              className="absolute animate-float-reverse"
              style={{
                top: "40%",
                left: "0%",
                width: "220px",
                height: "160px",
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xl)",
                overflow: "hidden",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-1.5 px-3 py-2"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#FFBD2E" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#27CA40" }} />
              </div>
              <div className="p-3 space-y-2">
                <div className="h-8 rounded" style={{ background: "var(--yellow)", opacity: 0.2 }} />
                <div className="h-2 rounded" style={{ background: "var(--border)", width: "90%" }} />
                <div className="h-2 rounded" style={{ background: "var(--border)", width: "60%" }} />
              </div>
            </motion.div>

            {/* Instagram-style card */}
            <motion.div
              className="absolute animate-float"
              style={{
                bottom: "8%",
                right: "10%",
                width: "140px",
                height: "170px",
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              <div className="h-20" style={{ background: "linear-gradient(135deg, #FFD60A22, #FFD60A44)" }} />
              <div className="p-2.5 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full" style={{ background: "var(--yellow)" }} />
                  <div className="h-1.5 rounded" style={{ background: "var(--border)", width: "50px" }} />
                </div>
                <div className="h-1.5 rounded" style={{ background: "var(--border)", width: "100%" }} />
                <div className="h-1.5 rounded" style={{ background: "var(--border)", width: "70%" }} />
              </div>
            </motion.div>

            {/* Floating yellow accent — circle */}
            <motion.div
              className="absolute animate-float-slow"
              style={{
                top: "5%",
                left: "15%",
                width: "40px",
                height: "40px",
                background: "var(--yellow)",
                borderRadius: "50%",
                opacity: 0.6,
              }}
            />

            {/* Floating yellow accent — rectangle */}
            <motion.div
              className="absolute animate-float-reverse"
              style={{
                bottom: "25%",
                left: "20%",
                width: "24px",
                height: "24px",
                background: "var(--yellow)",
                borderRadius: "4px",
                opacity: 0.4,
                transform: "rotate(45deg)",
              }}
            />

            {/* Small dot accent */}
            <motion.div
              className="absolute animate-float"
              style={{
                top: "35%",
                right: "0%",
                width: "12px",
                height: "12px",
                background: "var(--text-primary)",
                borderRadius: "50%",
                opacity: 0.15,
              }}
            />
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
