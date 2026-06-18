"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle, Check } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{ background: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-8 items-end">

          {/* Left — headline */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm"
                style={{
                  background: "var(--yellow)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-space)",
                }}
              >
                Ready to Grow?
              </span>
            </motion.div>

            <div
              className="display-title"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)", color: "#FFFFFF" }}
            >
              {["READY TO GROW", "YOUR BRAND?"].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : { y: "100%" }}
                    transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                  >
                    {i === 1 ? (
                      <span style={{ color: "var(--yellow)" }}>{line}</span>
                    ) : line}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — sub + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-4 lg:pb-2"
          >
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Let&apos;s build something people remember. Book a free consultation and let&apos;s
              talk about your brand&apos;s potential.
            </p>

            <div className="flex flex-col gap-3">
              <a
                id="cta-book-consultation-btn"
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-yellow group"
              >
                Book A Free Consultation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-space)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--yellow)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                <MessageCircle size={16} /> Or Chat on WhatsApp
              </a>
            </div>

            {/* Trust list */}
            <div className="mt-10 pt-8 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {["Free Consultation", "Quick Turnaround", "Direct Communication", "No Hidden Fees"].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-space)" }}
                >
                  <Check size={12} style={{ color: "var(--yellow)" }} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
