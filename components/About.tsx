"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="section-padding relative section-lazy"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label row */}
        <div className="section-header">
          <div className="badge">About</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            REDIX.MEDIA
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="section-title mb-6 sm:mb-8"
            >
              Built by Creators.{" "}
              <br />
              <span className="relative inline-block">
                Driven by Results.
                <span
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: 0,
                    width: "100%",
                    height: "6px",
                    background: "var(--yellow)",
                    zIndex: -1,
                    opacity: 0.7,
                  }}
                />
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-5" style={{ color: "var(--text-secondary)" }}>
                REDIX.MEDIA was founded by a team of young creators passionate about helping
                businesses stand out online. What started as freelance creative work evolved into a
                full-service creative studio.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-10" style={{ color: "var(--text-secondary)" }}>
                Today, we combine design, technology, and strategy to help brands build a memorable
                digital presence — from branding and websites to social media, content creation, and
                digital marketing.
              </p>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary w-full sm:w-auto text-center justify-center"
              >
                Work With Us
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Mission box */}
            <div
              className="p-5 sm:p-8 mb-5 sm:mb-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                borderLeft: "4px solid var(--yellow)",
              }}
            >
              <p
                className="font-bold text-xs sm:text-sm mb-2 uppercase tracking-wider"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
              >
                Our Mission
              </p>
              <p className="text-sm sm:text-base" style={{ color: "var(--text-primary)", lineHeight: 1.8 }}>
                To help every business build a powerful digital presence that drives real growth.
                We don&apos;t just make things look good — we make them work.
              </p>
            </div>

            {/* Service tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {["Branding", "Web Dev", "Social Media", "Video", "Marketing", "Content"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5"
                  style={{
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-secondary)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-space)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Large decorative quote */}
            <div
              className="p-5 sm:p-8 relative"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span
                className="absolute -top-4 left-5 sm:left-6 text-5xl sm:text-6xl font-black leading-none"
                style={{
                  color: "var(--yellow)",
                  fontFamily: "var(--font-space)",
                  opacity: 0.8,
                }}
              >
                &ldquo;
              </span>
              <p
                className="text-base sm:text-lg font-medium leading-relaxed mt-3 sm:mt-4"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-space)",
                }}
              >
                We believe great brands aren&apos;t born — they&apos;re built with intention, creativity, and relentless execution.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="divider" />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
                >
                  REDIX.MEDIA Team
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
