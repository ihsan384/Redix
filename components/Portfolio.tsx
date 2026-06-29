"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type Category =
  | "All"
  | "Web Development"
  | "ERP Software"
  | "Branding"
  | "UI/UX"
  | "Posters"
  | "Video Editing"
  | "Social Media";

const categories: Category[] = [
  "All",
  "Web Development",
  "ERP Software",
  "Branding",
  "UI/UX",
  "Posters",
  "Video Editing",
  "Social Media",
];

const projects = [
  {
    id: "p1",
    title: "FusionFit Gym ERP",
    category: "ERP Software" as Category,
    industry: "Fitness / SaaS",
    description: "Complete gym management platform with memberships, trainer management, billing, attendance, analytics and mobile-first UI.",
    image: "/projects/gym_erp.png",
    tech: ["React", "Supabase", "Tailwind CSS"],
    results: ["80% Faster Operations", "40% Less Admin Work"]
  },
  {
    id: "p2",
    title: "Aura E-Commerce",
    category: "Web Development" as Category,
    industry: "Retail / Fashion",
    description: "A high-performance headless e-commerce store with real-time stock management, custom checkout flow, and 3D product previews.",
    image: "/projects/aura_ecommerce.png",
    tech: ["Next.js", "Shopify API", "Three.js"],
    results: ["+140% Conversion Rate", "50% Faster Page Load"]
  },
  {
    id: "p3",
    title: "Nova Banking App",
    category: "UI/UX" as Category,
    industry: "Fintech",
    description: "A minimal digital banking mobile app redesign prioritizing intuitive navigation, instant peer-to-peer transfers, and smart budgeting.",
    image: "/projects/nova_banking.png",
    tech: ["Figma", "React Native", "Framer Motion"],
    results: ["4.9 App Store Rating", "+250k Active Users"]
  },
  {
    id: "p4",
    title: "The Brew Lab Branding",
    category: "Branding" as Category,
    industry: "Food & Beverage",
    description: "Complete visual identity, custom packaging design, and brand strategy for a premium organic coffee roaster chain.",
    image: "/projects/brew_lab.png",
    tech: ["Adobe Illustrator", "Cinema 4D", "Brand Strategy"],
    results: ["42% More Recognition", "100% Sustainable Packaging"]
  },
  {
    id: "p5",
    title: "Vaporwave Exhibition Posters",
    category: "Posters" as Category,
    industry: "Art & Culture",
    description: "A collection of limited-edition retro-futuristic posters designed for a digital art festival using bold typography and neon aesthetics.",
    image: "/projects/vaporwave.png",
    tech: ["Photoshop", "InDesign", "Creative Direction"],
    results: ["Sold Out Exhibition", "15k+ Physical Visitors"]
  },
  {
    id: "p6",
    title: "Solitude: Cinematic Brand Film",
    category: "Video Editing" as Category,
    industry: "Fashion & Travel",
    description: "High-impact cinematic promotional video and dynamic transitions designed for a luxury outdoor apparel brand launch campaign.",
    image: "/projects/solitude.png",
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    results: ["3M+ Video Views", "+180% Campaign Engagement"]
  },
  {
    id: "p7",
    title: "Zeta Tech Social Growth",
    category: "Social Media" as Category,
    industry: "Technology / SaaS",
    description: "Full-service social media strategy and content creation package driving viral organic engagement across TikTok, Instagram, and LinkedIn.",
    image: "/projects/zeta_tech.png",
    tech: ["Social Strategy", "CapCut", "Copywriting"],
    results: ["+400% Organic Growth", "12M+ Impressions"]
  }
];

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full bg-[#F3F4F6] overflow-hidden">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{ backgroundSize: '200% 100%' }} />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="portfolio-card-img"
        onLoad={() => setLoading(false)}
        loading="lazy"
      />
    </div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 18,
      },
    },
  };


  return (
    <section
      id="portfolio"
      className="section-padding section-lazy portfolio-bg"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC928] animate-pulse-glow" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#6B7280] portfolio-body">
              Selected Projects
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] portfolio-title">
                Our Works
              </h2>
            </div>
            <div className="lg:max-w-md">
              <p className="text-base text-[#6B7280] leading-relaxed portfolio-body">
                We create digital experiences that help ambitious businesses grow through strategy, design, and technology.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`portfolio-filter-tab ${active === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid with Framer Motion Layout animations */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="columns-1 md:columns-2 lg:columns-3 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="portfolio-card group flex flex-col overflow-hidden cursor-pointer break-inside-avoid mb-8 lg:mb-10"
              >
                {/* 65% Image Thumbnail container */}
                <div className="portfolio-card-img-container relative w-full overflow-hidden">
                  <ProjectImage src={project.image} alt={project.title} />
                  
                  {/* Soft overlay fade in on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Content aligned to bottom */}
                <div className="p-6 lg:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Badges: Category & Industry */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 bg-[#111111] text-[#FFFFFF] rounded-[4px] portfolio-body">
                        {project.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-[4px] portfolio-body">
                        {project.industry}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold mb-2 tracking-tight text-[#111111] portfolio-title">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#6B7280] mb-5 leading-relaxed portfolio-body">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-[4px] portfolio-body font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Client Results (optional) */}
                    {project.results && project.results.length > 0 && (
                      <div className="border-t border-[#E9E9E9] pt-4 mt-2 flex flex-wrap gap-x-6 gap-y-2 mb-6">
                        {project.results.map((res, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-bold portfolio-body">Result</span>
                            <span className="text-xs font-bold text-[#111111] portfolio-body">{res}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Case Study Button slides upward */}
                  <div className="pt-2 overflow-hidden h-6 relative mt-auto">
                    <div className="flex items-center text-sm font-bold text-[#111111] transition-all duration-300 transform translate-y-6 group-hover:translate-y-0">
                      <span className="mr-1.5 portfolio-body">View Case Study</span>
                      <ArrowRight size={15} />
                    </div>
                    <div className="absolute top-0 left-0 flex items-center text-sm font-bold text-[#6B7280] transition-all duration-300 transform group-hover:-translate-y-6">
                      <span className="mr-1.5 portfolio-body">Explore Project</span>
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-28 py-16 text-center border-t border-[#E9E9E9]">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] mb-4 portfolio-title">
            Have a project in mind?
          </h3>
          <p className="text-lg md:text-xl text-[#6B7280] mb-8 portfolio-body">
            Let's build something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-full font-bold bg-[#FFC928] hover:bg-[#FFD84D] text-[#111111] transition-all duration-300 shadow-md hover:-translate-y-1 flex items-center gap-2 portfolio-body"
            >
              Start Your Project
              <ArrowRight size={16} />
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                setActive("All");
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-full font-bold border border-[#E9E9E9] hover:border-[#111111] text-[#111111] transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 portfolio-body"
            >
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
