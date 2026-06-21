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
  { icon: Target,        title: "Premium Results",        desc: "We measure success the way you do — in growth, conversions, and real business impact." },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="why-us"
      className="section-padding section-lazy"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="section-header">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
                className="group p-8 cursor-default relative overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {/* Yellow top accent bar on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
                  style={{
                    background: "var(--yellow)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />

                <div
                  className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    background: "var(--bg-secondary)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Icon size={20} style={{ color: "var(--text-primary)" }} />
                </div>

                <h3
                  className="font-bold text-base mb-3"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>

                <style jsx>{`
                  .group:hover > div:first-child {
                    transform: scaleX(1) !important;
                  }
                  .group:hover > div:nth-child(2) {
                    background: var(--yellow) !important;
                    border-color: var(--yellow) !important;
                  }
                `}</style>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
