"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Layers, TrendingUp, MessageCircle, Lightbulb, Target } from "lucide-react";

const features = [
  { icon: Zap,           title: "Fast Execution",         desc: "Quick turnarounds without cutting corners. We move fast because your business can't afford to wait." },
  { icon: Layers,        title: "Modern Design",          desc: "Designs that don't look like templates — premium, purposeful aesthetics that make your brand stand out." },
  { icon: TrendingUp,    title: "Growth Focused",         desc: "Every decision we make is filtered through one question: will this help your brand grow?" },
  { icon: MessageCircle, title: "Direct Communication",   desc: "No account managers, no middlemen. You talk directly to the people doing the work." },
  { icon: Lightbulb,     title: "Creative Strategy",      desc: "Strategy meets creativity. We think before we execute — so everything we build has purpose." },
  { icon: Target,        title: "Results Driven",         desc: "We measure success the way you do — in growth, conversions, and real business impact." },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="why-us"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="badge">Why REDIX</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            What Makes Us Different
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-title lg:col-span-3"
          >
            Why Brands Choose{" "}
            <span className="relative inline-block">
              REDIX.MEDIA
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 self-end text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            We&apos;re not a typical agency. We&apos;re a creative studio that cares about your results as
            much as you do.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
                className="group p-7 cursor-default"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  transition: "all 0.25s ease",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-md)",
                  borderColor: "var(--border-strong)",
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5 group-hover:bg-yellow-400 transition-colors duration-300"
                  style={{
                    background: "var(--bg-secondary)",
                    borderRadius: "2px",
                  }}
                >
                  <Icon size={18} style={{ color: "var(--text-primary)" }} />
                </div>

                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
