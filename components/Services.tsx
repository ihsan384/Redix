"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Share2, Globe, Video, Palette, TrendingUp, FileText, ArrowRight } from "lucide-react";

const services = [
  {
    num: "01", icon: Share2,
    title: "Social Media Management",
    description: "We don't just post content — we build communities. Strategic management that grows your following and turns followers into loyal customers.",
    outcomes: ["Content Calendar", "Community Growth", "Analytics & Reports", "Platform Strategy"],
  },
  {
    num: "02", icon: Globe,
    title: "Website Development",
    description: "Fast, beautiful, conversion-optimized websites that work as hard as you do. From landing pages to full-scale web applications.",
    outcomes: ["Landing Pages", "Business Websites", "E-Commerce", "Web Apps"],
  },
  {
    num: "03", icon: Video,
    title: "Video Editing",
    description: "Professional video content that stops the scroll. From cinematic reels to brand stories — edited with purpose and style.",
    outcomes: ["Reels & Shorts", "YouTube Content", "Brand Videos", "Motion Graphics"],
  },
  {
    num: "04", icon: Palette,
    title: "Branding & Design",
    description: "A brand that people remember. We craft logo systems, brand identities, and visual languages that make your business unforgettable.",
    outcomes: ["Logo Design", "Brand Identity", "Style Guides", "Print & Digital"],
  },
  {
    num: "05", icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven campaigns that reach the right people at the right time. We grow your digital footprint and revenue.",
    outcomes: ["Meta & Google Ads", "SEO Strategy", "Email Marketing", "Campaign Analytics"],
  },
  {
    num: "06", icon: FileText,
    title: "Content Creation",
    description: "Scroll-stopping content made to perform. Graphics, copywriting, and creative concepts that consistently communicate your brand voice.",
    outcomes: ["Social Graphics", "Copy & Scripts", "Content Strategy", "Creative Direction"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="badge">Services</div>
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
          >
            What We Do
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <h2 className="section-title mb-5">
              Services Built for{" "}
              <span className="relative inline-block">
                Real Growth
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
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.95rem" }}>
              Six focused services that work together to build, amplify, and grow your brand across
              every digital touchpoint.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-3 flex items-end"
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-yellow"
            >
              Book Free Consultation
            </a>
          </motion.div>
        </div>

        {/* Services grid */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            borderLeft: "1px solid var(--border)",
          }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isHov = hovered === service.num;
              return (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="relative p-8 cursor-default"
                  style={{
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    background: isHov ? "var(--bg-secondary)" : "var(--bg-primary)",
                    transition: "background 0.25s ease",
                  }}
                  onHoverStart={() => setHovered(service.num)}
                  onHoverEnd={() => setHovered(null)}
                >
                  {/* Yellow bottom bar */}
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "3px",
                      background: "var(--yellow)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: isHov ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-4xl font-black select-none"
                      style={{
                        fontFamily: "var(--font-space)",
                        color: isHov ? "var(--text-primary)" : "var(--border-strong)",
                        transition: "color 0.25s ease",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {service.num}
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center"
                      style={{
                        background: isHov ? "var(--yellow)" : "var(--bg-secondary)",
                        borderRadius: "2px",
                        transition: "background 0.25s ease",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: isHov ? "var(--text-primary)" : "var(--text-muted)",
                          transition: "color 0.25s ease",
                        }}
                      />
                    </div>
                  </div>

                  <h3
                    className="font-bold text-base mb-3"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                    {service.description}
                  </p>

                  <AnimatePresence>
                    {isHov && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-wrap gap-1.5 mb-4"
                      >
                        {service.outcomes.map((o) => (
                          <span
                            key={o}
                            className="text-xs font-semibold px-2.5 py-1"
                            style={{
                              background: "var(--yellow)",
                              color: "var(--text-primary)",
                              borderRadius: "2px",
                              fontFamily: "var(--font-space)",
                            }}
                          >
                            {o}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
                    style={{
                      color: isHov ? "var(--text-primary)" : "var(--text-muted)",
                      fontFamily: "var(--font-space)",
                      transition: "color 0.25s ease",
                    }}
                  >
                    Get Started
                    <ArrowRight size={12} className={`transition-transform ${isHov ? "translate-x-1" : ""}`} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
