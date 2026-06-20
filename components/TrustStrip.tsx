"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Satisfaction" },
  { label: "Since 2022", isText: true },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="trust-strip" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => (
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

              {stat.isText ? (
                <div
                  className="font-black text-2xl md:text-3xl mb-1"
                  style={{
                    fontFamily: "var(--font-space)",
                    color: "var(--text-primary)",
                  }}
                >
                  Since{" "}
                  <span style={{ color: "var(--yellow)" }}>2022</span>
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
                {stat.isText ? "Established" : stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
