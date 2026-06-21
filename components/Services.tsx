"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Share2, Globe, Video, Palette, TrendingUp, FileText, ArrowRight, Star } from "lucide-react";

const services = [
  {
    num: "01", icon: Share2,
    title: "Social Media Management",
    description: "Turn followers into loyal customers. We build engaged communities with strategic content, data-driven posting, and growth campaigns that deliver measurable ROI.",
    outcomes: ["Content Calendar", "Community Growth", "Analytics & Reports", "Platform Strategy"],
    popular: false,
  },
  {
    num: "02", icon: Globe,
    title: "Website Development",
    description: "Convert visitors into paying customers with fast, beautiful websites designed for your industry. From landing pages to full web applications — built to perform.",
    outcomes: ["Landing Pages", "Business Websites", "E-Commerce", "Web Apps"],
    popular: true,
  },
  {
    num: "03", icon: Video,
    title: "Video Editing",
    description: "Stop the scroll and start conversations. Cinematic reels, brand stories, and motion content that boost engagement by 3x and keep audiences watching.",
    outcomes: ["Reels & Shorts", "YouTube Content", "Brand Videos", "Motion Graphics"],
    popular: true,
  },
  {
    num: "04", icon: Palette,
    title: "Branding & Design",
    description: "Build a brand people remember and trust. We craft logo systems, visual identities, and design languages that set you apart from every competitor.",
    outcomes: ["Logo Design", "Brand Identity", "Style Guides", "Print & Digital"],
    popular: true,
  },
  {
    num: "05", icon: TrendingUp,
    title: "Digital Marketing",
    description: "Reach the right audience at the right time with data-driven campaigns. We grow your traffic, leads, and revenue through precision targeting.",
    outcomes: ["Meta & Google Ads", "SEO Strategy", "Email Marketing", "Campaign Analytics"],
    popular: false,
  },
  {
    num: "06", icon: FileText,
    title: "Content Creation",
    description: "Scroll-stopping content that consistently builds authority and trust. Graphics, copy, and creative concepts aligned with your brand voice.",
    outcomes: ["Social Graphics", "Copy & Scripts", "Content Strategy", "Creative Direction"],
    popular: false,
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollToContactWithService = (serviceName: string) => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Pre-select the service in the form after scroll
      setTimeout(() => {
        const serviceSelect = document.getElementById("contact-service") as HTMLSelectElement | null;
        if (serviceSelect) {
          serviceSelect.value = serviceName;
          serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 800);
    }
  };

  return (
    <section
      id="services"
      className="section-padding section-lazy"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="section-header">
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
              data-analytics="services-cta"
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
                  className="relative p-8 lg:p-10 cursor-default"
                  style={{
                    borderRight: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                    background: isHov ? "var(--bg-secondary)" : "var(--bg-primary)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={() => setHovered(service.num)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="badge-popular">
                        <Star size={8} fill="currentColor" />
                        Popular
                      </span>
                    </div>
                  )}

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

                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="text-5xl font-black select-none"
                      style={{
                        fontFamily: "var(--font-space)",
                        color: isHov ? "var(--text-primary)" : "var(--border-strong)",
                        transition: "color 0.3s ease",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {service.num}
                    </span>
                    <div
                      className="w-11 h-11 flex items-center justify-center"
                      style={{
                        background: isHov ? "var(--yellow)" : "var(--bg-secondary)",
                        borderRadius: "var(--radius-sm)",
                        transition: "all 0.3s ease",
                        boxShadow: isHov ? "0 4px 12px var(--yellow-dim)" : "none",
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: isHov ? "var(--text-primary)" : "var(--text-muted)",
                          transition: "color 0.3s ease",
                        }}
                      />
                    </div>
                  </div>

                  <h3
                    className="font-bold text-lg mb-3"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {service.description}
                  </p>

                  {/* Outcomes — always visible */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.outcomes.map((o) => (
                      <span
                        key={o}
                        className="text-xs font-semibold px-2.5 py-1"
                        style={{
                          background: isHov ? "var(--yellow)" : "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          borderRadius: "2px",
                          fontFamily: "var(--font-space)",
                          transition: "background 0.3s ease",
                        }}
                      >
                        {o}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToContactWithService(service.title)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
                    style={{
                      color: isHov ? "var(--text-primary)" : "var(--text-muted)",
                      fontFamily: "var(--font-space)",
                      transition: "color 0.3s ease",
                      minHeight: "44px",
                    }}
                    data-analytics={`service-cta-${service.num}`}
                  >
                    Get Started
                    <ArrowRight size={12} className={`transition-transform duration-300 ${isHov ? "translate-x-1" : ""}`} />
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
