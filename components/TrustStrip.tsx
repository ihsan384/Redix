"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Heart, Clock, Calendar } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 60, suffix: "+", label: "Projects Delivered", icon: Briefcase },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: Heart },
  { label: "< 24hr Response", isText: true, textValue: "< 24hr", icon: Clock },
  { label: "Since 2024", isText: true, textValue: "Since 2024", icon: Calendar },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="trust-strip" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center relative px-2 sm:px-4"
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
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-2 sm:mb-3"
                  style={{
                    background: "var(--yellow-dim)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <Icon size={15} style={{ color: "var(--text-primary)" }} />
                </div>

                {stat.isText ? (
                  <div
                    className="font-black text-xl sm:text-2xl md:text-3xl mb-0.5 sm:mb-1"
                    style={{
                      fontFamily: "var(--font-space)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {stat.label === "Since 2024" ? (
                      <>Since <span style={{ color: "var(--yellow)" }}>2024</span></>
                    ) : (
                      <>
                        <span style={{ color: "var(--yellow)" }}>&lt;</span> 24hr
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    className="font-black text-xl sm:text-2xl md:text-3xl mb-0.5 sm:mb-1"
                    style={{
                      fontFamily: "var(--font-space)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <AnimatedCounter end={stat.value!} suffix={stat.suffix} />
                  </div>
                )}

                <div
                  className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-center"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-space)",
                  }}
                >
                  {stat.isText ? (stat.label === "Since 2024" ? "Established" : "Response Time") : stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
