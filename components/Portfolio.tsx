"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Coffee, ShoppingBag, Moon, Film, Compass, Palette, TrendingUp, Hexagon, ArrowRight } from "lucide-react";

type Category = "All" | "Branding" | "Web" | "Social" | "Video" | "Design";
const categories: Category[] = ["All", "Branding", "Web", "Social", "Video", "Design"];

const projects = [
  {
    id: "p1", title: "Brand Identity — The Brew Lab", cat: "Branding" as Category, size: "tall", icon: Coffee,
    tags: ["Logo", "Typography", "Brand Guide"], color: "#F5F0E8",
    description: "Complete brand identity for a premium coffee chain",
    result: "42% increase in brand recognition",
  },
  {
    id: "p2", title: "E-commerce Website", cat: "Web" as Category, size: "normal", icon: ShoppingBag,
    tags: ["Next.js", "UI/UX"], color: "#EFF0F5",
    description: "High-converting e-commerce platform with seamless checkout",
    result: "2.8x conversion rate improvement",
  },
  {
    id: "p3", title: "Social Campaign — Ramadan Series", cat: "Social" as Category, size: "normal", icon: Moon,
    tags: ["Social", "Content"], color: "#F5F2E8",
    description: "Multi-platform content campaign for festive engagement",
    result: "180K+ reach in 2 weeks",
  },
  {
    id: "p4", title: "Promo Reel — FoodBrand", cat: "Video" as Category, size: "tall", icon: Film,
    tags: ["Video Edit", "Motion"], color: "#F5EBE8",
    description: "Cinematic promotional reel for product launch",
    result: "3x engagement vs previous campaigns",
  },
  {
    id: "p5", title: "Portfolio Website — Architect", cat: "Web" as Category, size: "normal", icon: Compass,
    tags: ["React", "Animations"], color: "#E8F0F5",
    description: "Award-worthy portfolio showcasing architectural work",
    result: "5x more client inquiries",
  },
  {
    id: "p6", title: "Brand Poster Series", cat: "Design" as Category, size: "normal", icon: Palette,
    tags: ["Print", "Social Media"], color: "#F0F5E8",
    description: "Visual campaign across print and digital channels",
    result: "Used across 12 touchpoints",
  },
  {
    id: "p7", title: "Instagram Growth Package", cat: "Social" as Category, size: "normal", icon: TrendingUp,
    tags: ["Strategy", "Content"], color: "#F5F0F0",
    description: "Full-service Instagram growth and content strategy",
    result: "2K → 18K followers in 3 months",
  },
  {
    id: "p8", title: "Logo System — TechCo", cat: "Branding" as Category, size: "tall", icon: Hexagon,
    tags: ["Logo", "Icon System"], color: "#F0EBF5",
    description: "Scalable logo system with 40+ icon variants",
    result: "Adopted across 6 product lines",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section
      id="portfolio"
      className="section-padding section-lazy"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="section-header">
          <div className="badge">Our Work</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            Selected Projects
          </span>
        </div>

        {/* Title + Filter row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-title"
          >
            Work That{" "}
            <span className="relative inline-block">
              Speaks.
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
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-tab ${active === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative overflow-hidden break-inside-avoid mb-5 cursor-pointer"
                style={{
                  background: project.color,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  minHeight: project.size === "tall" ? "340px" : "240px",
                }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <div className="flex justify-between items-start">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: "var(--radius-sm)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <project.icon size={24} style={{ color: "var(--text-primary)" }} />
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1.5 uppercase tracking-wider"
                      style={{
                        background: "rgba(0,0,0,0.07)",
                        color: "var(--text-secondary)",
                        borderRadius: "var(--radius-sm)",
                        fontFamily: "var(--font-space)",
                      }}
                    >
                      {project.cat}
                    </span>
                  </div>

                  <div>
                    {/* Description */}
                    <p
                      className="text-xs mb-2 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>

                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1"
                          style={{
                            background: "rgba(0,0,0,0.06)",
                            color: "var(--text-secondary)",
                            borderRadius: "var(--radius-sm)",
                            fontFamily: "var(--font-space)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="font-bold text-base"
                      style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Hover overlay — now shows result metric */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "rgba(255,214,10,0.12)", backdropFilter: "blur(3px)" }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-5 py-2.5"
                    style={{
                      background: "var(--text-primary)",
                      color: "#fff",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    View Project
                  </span>
                  <span
                    className="text-xs font-semibold px-3 py-1"
                    style={{
                      background: "var(--yellow)",
                      color: "var(--text-primary)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    {project.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-yellow group"
            data-analytics="portfolio-cta-primary"
          >
            Start Your Project
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              setActive("All");
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline"
            data-analytics="portfolio-cta-secondary"
          >
            View All Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
