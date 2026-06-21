"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MidPageCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-2 h-10"
              style={{ background: "var(--yellow)", borderRadius: "1px" }}
            />
            <div>
              <p
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-space)", color: "#FFFFFF" }}
              >
                Have a project in mind?
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Free consultation · No commitment · Reply within 24 hours
              </p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-yellow group flex-shrink-0"
            data-analytics="mid-page-cta"
          >
            Start Your Project
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
