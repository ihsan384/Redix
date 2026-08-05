"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Sparkles, Play, Code2, Palette, MousePointer2, Layers, Video, Sliders, MessageSquare } from "lucide-react";

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

          {/* Right — Creative Live Canvas & Project Showcase Visual */}
          <motion.div
            className="lg:col-span-5 hidden lg:flex relative flex-col justify-center items-center"
            style={{ minHeight: "520px" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* Ambient creative yellow radial glow */}
            <div
              className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40"
              style={{
                background: "radial-gradient(circle, var(--yellow) 0%, rgba(0,0,0,0) 70%)",
                top: "5%",
                right: "5%",
                zIndex: 0,
              }}
            />

            {/* Creative Canvas Card */}
            <motion.div
              className="w-full relative z-10 p-5 overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
                maxWidth: "480px",
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Studio Canvas Toolbar Header */}
              <div
                className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]"
              >
                {/* Canvas tools */}
                <div className="flex items-center gap-1.5 p-1 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                  <div className="p-1.5 rounded bg-[var(--yellow)] text-black">
                    <MousePointer2 size={13} />
                  </div>
                  <div className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition">
                    <Palette size={13} />
                  </div>
                  <div className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition">
                    <Video size={13} />
                  </div>
                  <div className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition">
                    <Code2 size={13} />
                  </div>
                  <div className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition">
                    <Sliders size={13} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
                    REDIX ARTBOARD v2.4
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Real Project Visual Preview Frame */}
              <div className="relative rounded-lg overflow-hidden mb-4 group" style={{ border: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
                {/* Visual Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/brew_lab.png"
                  alt="Brew Lab Project Preview"
                  className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3.5">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <div className="text-xs font-extrabold text-white tracking-wide" style={{ fontFamily: "var(--font-space)" }}>
                        Brew &amp; Lab — Specialty Coffee
                      </div>
                      <div className="text-[10px] text-white/70">
                        Brand Identity &amp; E-Commerce Web App
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--yellow)] text-black">
                      4.9 ★★★★★
                    </span>
                  </div>
                </div>
              </div>

              {/* Creative Palette & Workflow Info */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Brand Color Swatches */}
                <div className="p-3 rounded-md" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2" style={{ fontFamily: "var(--font-space)" }}>
                    Brand Palette
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: "#FFD60A" }} title="#FFD60A" />
                    <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: "#09090B" }} title="#09090B" />
                    <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: "#27272A" }} title="#27272A" />
                    <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: "#F4F4F5" }} title="#F4F4F5" />
                  </div>
                </div>

                {/* Video & Motion Reel Tag */}
                <div className="p-3 rounded-md flex flex-col justify-between" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]" style={{ fontFamily: "var(--font-space)" }}>
                      Motion &amp; Video
                    </span>
                    <span className="text-[9px] font-mono text-[var(--yellow)]">4K • 60fps</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[var(--yellow)] text-black flex items-center justify-center">
                      <Play size={10} className="fill-black ml-0.5" />
                    </div>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="w-3/4 h-full bg-[var(--yellow)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Creator Footer */}
              <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border)] text-[11px]">
                <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-medium">
                  <Layers size={13} style={{ color: "var(--yellow)" }} /> 50+ Custom Assets Created
                </div>
                <span className="font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-space)" }}>
                  No Templates. Pure Craft.
                </span>
              </div>
            </motion.div>

            {/* Floating Live Collaborator Cursor 1 - Top Left */}
            <motion.div
              className="absolute top-2 -left-6 z-20 animate-float-slow hidden md:flex items-center gap-1.5"
              style={{ pointerEvents: "none" }}
            >
              <MousePointer2 size={18} className="text-[var(--yellow)] fill-[var(--yellow)] drop-shadow-md" />
              <div className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[var(--yellow)] text-black shadow-lg" style={{ fontFamily: "var(--font-space)" }}>
                Ihsan (Lead Studio)
              </div>
            </motion.div>

            {/* Floating Feedback Pill 2 - Bottom Right Overlay */}
            <motion.div
              className="absolute -bottom-3 -right-3 z-20 p-3 rounded-lg flex items-center gap-2.5 animate-float-reverse shadow-xl"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--yellow)",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.18)",
              }}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <MessageSquare size={14} />
              </div>
              <div>
                <div className="text-xs font-extrabold text-[var(--text-primary)]">Client Review</div>
                <div className="text-[10px] text-emerald-500 font-semibold">“Revenues tripled in Month 1! 🔥”</div>
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
