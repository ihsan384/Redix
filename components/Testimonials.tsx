"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight, Users, Briefcase, Globe } from "lucide-react";

const socialProofStats = [
  { icon: Users, value: "30+", label: "Happy Clients" },
  { icon: Briefcase, value: "50+", label: "Projects Delivered" },
  { icon: Globe, value: "4", label: "Countries Served" },
];

const testimonials = [
  {
    id: "t1", initials: "AF", name: "Ahmad Farooq", role: "Founder, The Brew Lab", rating: 5,
    service: "Branding & Design",
    text: "REDIX.MEDIA completely transformed how our brand looks and feels online. The branding package was beyond what we imagined — modern, bold, and perfectly aligned with our vision. We've seen a noticeable uptick in customer trust.",
    result: "42% increase in brand trust",
  },
  {
    id: "t2", initials: "SN", name: "Sara Naqvi", role: "CEO, StyleHub PK", rating: 5,
    service: "Social Media",
    text: "Our Instagram grew from 2K to 18K followers in three months thanks to REDIX. The content quality is consistently excellent and the strategy is genuinely different from any agency I've worked with.",
    result: "2K → 18K followers in 3 months",
  },
  {
    id: "t3", initials: "BC", name: "Bilal Chaudhry", role: "Co-Founder, QuickShip", rating: 5,
    service: "Website Development",
    text: "The website they built for us is fast, clean, and actually converts visitors into customers. We've had compliments from investors every single week. REDIX delivered on every promise — on time, on budget.",
    result: "2.8x conversion improvement",
  },
  {
    id: "t4", initials: "ZH", name: "Zara Hussain", role: "Marketing Director, PureFoods", rating: 5,
    service: "Video Editing",
    text: "The video editing work for our Ramadan campaign was phenomenal. Every reel hit differently — cinematic, on-brand, and perfectly paced. Our campaign reach tripled compared to the previous year.",
    result: "3x campaign reach",
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
      className="section-padding section-lazy"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Social proof stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-12 pb-8"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {socialProofStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ background: "var(--yellow-dim)", borderRadius: "var(--radius-sm)" }}
                >
                  <Icon size={14} style={{ color: "var(--text-primary)" }} />
                </div>
                <div>
                  <span
                    className="font-black text-lg"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs ml-1.5 uppercase tracking-wider"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

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
                className="w-11 h-11 flex items-center justify-center transition-all duration-300"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-secondary)",
                  minWidth: "44px",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--yellow)"; e.currentTarget.style.borderColor = "var(--yellow)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {i === 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
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
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            {/* Yellow left accent column */}
            <div
              className="lg:col-span-1 hidden lg:flex items-center justify-center"
              style={{ background: "var(--yellow)", minHeight: "200px" }}
            >
              <Quote size={28} style={{ color: "var(--text-primary)", opacity: 0.3 }} />
            </div>

            {/* Content */}
            <div className="lg:col-span-8 p-10 lg:p-14">
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} fill="var(--yellow)" style={{ color: "var(--yellow)" }} />
                ))}
              </div>

              <p
                className="text-xl lg:text-2xl font-medium leading-relaxed mb-6"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-space)" }}
              >
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Result badge */}
              <div className="mb-8">
                <span
                  className="text-xs font-bold px-3 py-1.5 uppercase tracking-wider inline-flex items-center gap-1.5"
                  style={{
                    background: "var(--yellow-dim)",
                    color: "var(--text-primary)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-space)",
                    border: "1px solid var(--yellow)",
                  }}
                >
                  ↗ {testimonials[current].result}
                </span>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div
                  className="w-14 h-14 flex items-center justify-center font-black text-lg flex-shrink-0"
                  style={{
                    background: "var(--yellow)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-space)",
                  }}
                >
                  {testimonials[current].initials}
                </div>
                <div>
                  <p className="font-bold text-base" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
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
                      borderRadius: "var(--radius-sm)",
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
                className="font-black text-7xl mb-1"
                style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
              >
                {String(current + 1).padStart(2, "0")}
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                / {String(testimonials.length).padStart(2, "0")}
              </p>

              {/* Dot indicators */}
              <div className="flex gap-1.5 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? "28px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: i === current ? "var(--yellow)" : "var(--border-strong)",
                      transition: "all 0.3s ease",
                      minHeight: "6px",
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
              className="p-5 text-left transition-all duration-300"
              style={{
                background: i === current ? "var(--yellow)" : "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                minHeight: "44px",
              }}
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={11} fill={i === current ? "var(--text-primary)" : "var(--text-muted)"} style={{ color: i === current ? "var(--text-primary)" : "var(--text-muted)" }} />
                ))}
              </div>
              <p className="text-sm font-bold" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
                {t.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: i === current ? "var(--text-secondary)" : "var(--text-muted)" }}>
                {t.result}
              </p>
            </motion.button>
          ))}
        </div>

        {/* CTA after testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary group"
            data-analytics="testimonials-cta"
          >
            Join Our Happy Clients
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
