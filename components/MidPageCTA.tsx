"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function MidPageCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div
              className="w-1.5 sm:w-2 h-9 sm:h-10 flex-shrink-0"
              style={{ background: "var(--yellow)", borderRadius: "1px" }}
            />
            <div>
              <p
                className="text-base sm:text-lg font-bold"
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
            href="https://wa.me/919497013275?text=Hi%20REDIX%20Media%2C%20I%27m%20interested%20in%20discussing%20a%20project%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow group w-full sm:w-auto text-center justify-center flex-shrink-0 text-xs sm:text-sm flex items-center gap-2"
            data-analytics="mid-page-cta"
          >
            <MessageCircle size={15} />
            Chat on WhatsApp
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
