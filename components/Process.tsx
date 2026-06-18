"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Map, Sparkles, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { num: "01", title: "Discovery",  desc: "Deep-diving into your business, goals, audience, and competitors to build a solid foundation.",       icon: Search },
  { num: "02", title: "Strategy",   desc: "A clear roadmap covering brand positioning, content strategy, and technical requirements.",            icon: Map },
  { num: "03", title: "Creation",   desc: "Design, development, content, and motion — all crafted with precision and purpose.",                  icon: Sparkles },
  { num: "04", title: "Launch",     desc: "Ensuring a smooth, impactful launch across all relevant platforms and channels.",                      icon: Rocket },
  { num: "05", title: "Growth",     desc: "Post-launch analysis and iteration to keep your brand growing and improving continuously.",            icon: TrendingUp },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="badge">Process</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            How We Work
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-title lg:col-span-3"
          >
            A Proven Process,{" "}
            <span className="relative inline-block">
              Every Time.
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
        </div>

        {/* Desktop — horizontal steps */}
        <div className="hidden lg:grid grid-cols-5" style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
              className="group p-8 cursor-default"
              style={{
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                transition: "background 0.25s ease",
              }}
              whileHover={{ background: "var(--bg-secondary)" }}
            >
              {/* Step icon circle */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors duration-300"
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "2px",
                }}
              >
                <step.icon size={20} style={{ color: "var(--text-primary)" }} />
              </div>

              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
              >
                {step.num}
              </p>

              <h3
                className="font-bold text-lg mb-3"
                style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
              >
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile — vertical */}
        <div className="lg:hidden flex flex-col" style={{ borderTop: "1px solid var(--border)" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="flex gap-6 py-8"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--bg-secondary)", borderRadius: "2px" }}
              >
                <step.icon size={20} style={{ color: "var(--text-primary)" }} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
                  {step.num}
                </p>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
