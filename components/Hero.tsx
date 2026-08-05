"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Sparkles, TrendingUp, Code2, Palette, ShieldCheck, Zap } from "lucide-react";

const TICKER_ITEMS = [
  "Social Media Management",
  "Website Development",
  "Video Editing",
  "Branding & Design",
  "Digital Marketing",
  "Content Creation",
];

const TRUST_INDICATORS = [
  "50+ Projects Delivered",
  "100% Client Satisfaction",
  "Replies Within 1 Hour",
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
              <div className="badge">Creative Studio for Ambitious Brands</div>
            </motion.div>

            <h1
              className="display-title mb-0"
              style={{ fontSize: "clamp(2.5rem, 1.5rem + 4vw, 5.5rem)", lineHeight: 1.05, maxWidth: "760px" }}
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
                className="leading-relaxed mb-6 text-base md:text-lg"
                style={{ color: "var(--text-secondary)", maxWidth: "480px" }}
              >
                We help startups and growing businesses build brand identities, websites,
                and content strategies that drive real revenue.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  id="hero-start-project-btn"
                  onClick={() => goto("#contact")}
                  className="btn-yellow group"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  data-analytics="hero-cta-primary"
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
                  data-analytics="hero-cta-secondary"
                >
                  View Our Work
                </motion.button>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="flex flex-wrap gap-x-5 gap-y-2 mt-6"
              >
                {TRUST_INDICATORS.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
                  >
                    <Check size={12} style={{ color: "var(--yellow)" }} />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right — Creative & Professional Studio Showcase Visual */}
          <motion.div
            className="lg:col-span-5 hidden lg:flex relative flex-col justify-center items-center"
            style={{ minHeight: "500px" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* Ambient subtle glow background */}
            <div
              className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255, 214, 10, 0.18) 0%, rgba(0,0,0,0) 70%)",
                top: "10%",
                right: "10%",
                zIndex: 0,
              }}
            />

            {/* Main Studio Dashboard Card */}
            <motion.div
              className="w-full relative z-10 p-6 overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-xl)",
                maxWidth: "460px",
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Browser/Card Window Controls Header */}
              <div
                className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#27CA40" }} />
                  <span
                    className="ml-2 text-[11px] px-2.5 py-0.5 rounded-full font-mono font-medium"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
                  >
                    redix.media/studio
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Hub
                </div>
              </div>

              {/* Studio Card Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} style={{ color: "var(--yellow)" }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]" style={{ fontFamily: "var(--font-space)" }}>
                    Digital Product & Brand Studio
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-space)" }}>
                  High-Impact Digital Experiences
                </h3>
              </div>

              {/* Performance Curve Graph Representation */}
              <div className="p-4 rounded-lg mb-4 relative overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">Brand Growth & Reach</span>
                  <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1">
                    <TrendingUp size={12} className="text-emerald-500" /> +310%
                  </span>
                </div>
                
                {/* SVG Curve Line */}
                <div className="h-16 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--yellow)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--yellow)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,50 Q40,45 80,30 T160,25 T240,10 T300,5 L300,60 L0,60 Z"
                      fill="url(#growthGrad)"
                    />
                    <path
                      d="M0,50 Q40,45 80,30 T160,25 T240,10 T300,5"
                      fill="none"
                      stroke="var(--yellow)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Core Deliverable Pills */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="p-3 rounded-md flex items-center gap-3" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-[var(--yellow)]/15 text-[var(--yellow)]">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Custom Web & ERP</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Full-Stack Solutions</div>
                  </div>
                </div>

                <div className="p-3 rounded-md flex items-center gap-3" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-amber-500/15 text-amber-500">
                    <Palette size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Brand Identity</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Visual Storytelling</div>
                  </div>
                </div>
              </div>

              {/* Bottom Stat Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" /> Guaranteed Quality
                </span>
                <span className="font-bold text-[var(--yellow)]">100% Bespoke</span>
              </div>
            </motion.div>

            {/* Floating Overlay Badge 1 - Top Right */}
            <motion.div
              className="absolute -top-3 -right-2 z-20 p-3.5 rounded-lg flex items-center gap-3 animate-float-slow"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--yellow)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--yellow)] text-black font-bold">
                <Zap size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">Fast Delivery</div>
                <div className="text-[10px] text-[var(--text-muted)]">Rapid Execution</div>
              </div>
            </motion.div>

            {/* Floating Overlay Badge 2 - Bottom Left */}
            <motion.div
              className="absolute -bottom-4 -left-4 z-20 p-3.5 rounded-lg flex items-center gap-3 animate-float-reverse"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <div className="text-xs">
                <span className="font-bold text-[var(--text-primary)] block">Accepting Projects</span>
                <span className="text-[10px] text-[var(--text-muted)]">Direct Founder Contact</span>
              </div>
            </motion.div>
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
