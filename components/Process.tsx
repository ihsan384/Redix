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
        <div className="section-header">
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

        {/* Desktop — horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div
            className="absolute h-[2px] top-[28px]"
            style={{
              left: "calc(10% + 28px)",
              right: "calc(10% + 28px)",
              background: "var(--border-strong)",
            }}
          />
          {/* Animated yellow overlay on line */}
          <motion.div
            className="absolute h-[2px] top-[28px]"
            style={{
              left: "calc(10% + 28px)",
              right: "calc(10% + 28px)",
              background: "var(--yellow)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: 0.3 + 0.15 * i, ease: "easeOut" }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot group-hover:!bg-[var(--yellow)] group-hover:!border-[var(--yellow)] mb-6">
                    <Icon size={22} style={{ color: "var(--text-primary)" }} />
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
              );
            })}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="lg:hidden relative pl-12">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[27px] top-0 bottom-0 w-[2px]"
            style={{ background: "var(--border-strong)" }}
          />
          <motion.div
            className="absolute left-[27px] top-0 w-[2px]"
            style={{
              background: "var(--yellow)",
              transformOrigin: "top",
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 + 0.1 * i }}
                  className="relative"
                >
                  {/* Timeline dot — positioned on the line */}
                  <div
                    className="absolute -left-12 top-0 timeline-dot"
                    style={{ width: "56px", height: "56px" }}
                  >
                    <Icon size={20} style={{ color: "var(--text-primary)" }} />
                  </div>

                  <div className="pt-2">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
