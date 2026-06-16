"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "50+",  label: "Projects Delivered" },
  { value: "30+",  label: "Happy Clients" },
  { value: "6",    label: "Core Services" },
  { value: "2+",   label: "Years Building" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="section-padding relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label row */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="badge">About</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            REDIX.MEDIA
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="section-title mb-8"
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
              <p className="leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                REDIX.MEDIA was founded by a team of young creators passionate about helping
                businesses stand out online. What started as freelance creative work evolved into a
                full-service creative studio.
              </p>
              <p className="leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
                Today, we combine design, technology, and strategy to help brands build a memorable
                digital presence — from branding and websites to social media, content creation, and
                digital marketing.
              </p>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary"
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
              className="p-8 mb-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                borderLeft: "4px solid var(--yellow)",
              }}
            >
              <p
                className="font-bold text-sm mb-2 uppercase tracking-wider"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
              >
                Our Mission
              </p>
              <p style={{ color: "var(--text-primary)", lineHeight: 1.8 }}>
                To help every business build a powerful digital presence that drives real growth.
                We don&apos;t just make things look good — we make them work.
              </p>
            </div>

            {/* Service tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Branding", "Web Dev", "Social Media", "Video", "Marketing", "Content"].map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1.5"
                  style={{
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-secondary)",
                    borderRadius: "2px",
                    fontFamily: "var(--font-space)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-5"
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    className="font-black text-3xl mb-1"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
