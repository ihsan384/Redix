"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: "t1", initials: "AF", name: "Ahmad Farooq", role: "Founder, The Brew Lab", rating: 5,
    service: "Branding & Design",
    text: "REDIX.MEDIA completely transformed how our brand looks and feels online. The branding package was beyond what we imagined — modern, bold, and perfectly aligned with our vision. We've seen a noticeable uptick in customer trust.",
  },
  {
    id: "t2", initials: "SN", name: "Sara Naqvi", role: "CEO, StyleHub PK", rating: 5,
    service: "Social Media",
    text: "Our Instagram grew from 2K to 18K followers in three months thanks to REDIX. The content quality is consistently excellent and the strategy is genuinely different from any agency I've worked with.",
  },
  {
    id: "t3", initials: "BC", name: "Bilal Chaudhry", role: "Co-Founder, QuickShip", rating: 5,
    service: "Website Development",
    text: "The website they built for us is fast, clean, and actually converts visitors into customers. We've had compliments from investors every single week. REDIX delivered on every promise — on time, on budget.",
  },
  {
    id: "t4", initials: "ZH", name: "Zara Hussain", role: "Marketing Director, PureFoods", rating: 5,
    service: "Video Editing",
    text: "The video editing work for our Ramadan campaign was phenomenal. Every reel hit differently — cinematic, on-brand, and perfectly paced. Our campaign reach tripled compared to the previous year.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="flex items-center justify-between mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="flex items-center gap-4">
            <div className="badge">Client Love</div>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
              What They Say
            </span>
          </div>
          {/* Navigation arrows */}
          <div className="flex gap-2">
            {[{ fn: prev, label: "Previous" }, { fn: next, label: "Next" }].map(({ fn, label }, i) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "2px",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--yellow)"; e.currentTarget.style.borderColor = "var(--yellow)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {i === 0 ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
              </button>
            ))}
          </div>
        </div>

        {/* Featured testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-0 mb-8"
            style={{ border: "1px solid var(--border)", borderRadius: "2px" }}
          >
            {/* Yellow left accent column */}
            <div
              className="lg:col-span-1 hidden lg:block"
              style={{ background: "var(--yellow)", minHeight: "200px" }}
            />

            {/* Content */}
            <div className="lg:col-span-8 p-10 lg:p-12">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--yellow)" style={{ color: "var(--yellow)" }} />
                ))}
              </div>

              <p
                className="text-xl lg:text-2xl font-medium leading-relaxed mb-8"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-space)" }}
              >
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center font-black text-base flex-shrink-0"
                  style={{
                    background: "var(--yellow)",
                    borderRadius: "2px",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-space)",
                  }}
                >
                  {testimonials[current].initials}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {testimonials[current].role}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-xs font-bold px-3 py-1.5 uppercase tracking-wider"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-secondary)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    {testimonials[current].service}
                  </span>
                </div>
              </div>
            </div>

            {/* Counter column */}
            <div
              className="lg:col-span-3 p-10 flex flex-col justify-center items-center"
              style={{ borderLeft: "1px solid var(--border)", background: "var(--bg-secondary)" }}
            >
              <p
                className="font-black text-6xl mb-1"
                style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
              >
                {String(current + 1).padStart(2, "0")}
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                / {String(testimonials.length).padStart(2, "0")}
              </p>

              {/* Dot indicators */}
              <div className="flex gap-1.5 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? "24px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: i === current ? "var(--text-primary)" : "var(--border-strong)",
                      transition: "all 0.3s ease",
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Client strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              className="p-4 text-left transition-all duration-200"
              style={{
                background: i === current ? "var(--yellow)" : "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
              }}
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={10} fill={i === current ? "var(--text-primary)" : "var(--text-muted)"} style={{ color: i === current ? "var(--text-primary)" : "var(--text-muted)" }} />
                ))}
              </div>
              <p className="text-xs font-bold" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
                {t.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: i === current ? "var(--text-secondary)" : "var(--text-muted)" }}>
                {t.role.split(",")[0]}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
