"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Heart, Clock, Calendar } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: Heart },
  { label: "< 24hr Response", isText: true, textValue: "< 24hr", icon: Clock },
  { label: "Since 2022", isText: true, textValue: "Since 2022", icon: Calendar },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="trust-strip" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Divider line between stats (desktop only) */}
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10"
                    style={{ background: "var(--border-strong)" }}
                  />
                )}

                {/* Icon */}
                <div
                  className="w-9 h-9 flex items-center justify-center mb-3"
                  style={{
                    background: "var(--yellow-dim)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--text-primary)" }} />
                </div>

                {stat.isText ? (
                  <div
                    className="font-black text-2xl md:text-3xl mb-1"
                    style={{
                      fontFamily: "var(--font-space)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {stat.label === "Since 2022" ? (
                      <>Since <span style={{ color: "var(--yellow)" }}>2022</span></>
                    ) : (
                      <>
                        <span style={{ color: "var(--yellow)" }}>&lt;</span> 24hr
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    className="font-black text-2xl md:text-3xl mb-1"
                    style={{
                      fontFamily: "var(--font-space)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <AnimatedCounter end={stat.value!} suffix={stat.suffix} />
                  </div>
                )}

                <div
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-space)",
                  }}
                >
                  {stat.isText ? (stat.label === "Since 2022" ? "Established" : "Response Time") : stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
