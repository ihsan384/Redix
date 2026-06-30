"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";

type FilterCategory =
  | "All"
  | "Web Development"
  | "Business Websites"
  | "ERP Software"
  | "Landing Pages"
  | "Portfolio"
  | "Restaurant"
  | "Cafe"
  | "Branding";

const filterCategories: FilterCategory[] = [
  "All",
  "Web Development",
  "Business Websites",
  "ERP Software",
  "Landing Pages",
  "Portfolio",
  "Restaurant",
  "Cafe",
  "Branding",
];

interface Project {
  id: string;
  title: string;
  categoryBadge: string;
  filterCategories: FilterCategory[];
  image: string;
  description: string;
  tech: string[];
  demoUrl: string;
  isLiveClient?: boolean;
  size: "large" | "regular" | "tall";
}

const projects: Project[] = [
  {
    id: "Gym RRP",
    title: "Gym RRP",
    categoryBadge: "ERP Software",
    filterCategories: ["All", "ERP Software", "Web Development"],
    image: "/assets/gymrrp.png",
    description: "Comprehensive gym management ERP platform with member management, attendance tracking, membership plans, trainer scheduling, payment management, analytics dashboards, and responsive admin tools designed to streamline daily fitness center operations.",
    tech: ["React", "Tailwind CSS", "Typescript", "Supabase"],
    demoUrl: "https://gymrrp.vercel.app/",
    size: "large",
  },
  {
    id: "restaurant-landing",
    title: "Restaurant Landing Page",
    categoryBadge: "Restaurant Website",
    filterCategories: ["All", "Restaurant", "Landing Pages", "Web Development"],
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
    description: "Luxury restaurant landing page with responsive design, modern hero section, menu showcase, and elegant typography.",
    tech: ["HTML", "CSS"],
    demoUrl: "https://restaurent-demo-landing-page.netlify.app/",
    size: "regular",
  },
  {
    id: "cafe-website",
    title: "Cafe Website",
    categoryBadge: "Business Website",
    filterCategories: ["All", "Cafe", "Business Websites", "Web Development"],
    image: "/assets/cafe-demo.png",
    description: "Modern responsive café website featuring menu, gallery, Google Maps integration, and online ordering.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://cafe-demo-17.netlify.app/",
    size: "tall",
  },
  {
    id: "pet-shop",
    title: "Pet Shop Website",
    categoryBadge: "Business Website",
    filterCategories: ["All", "Business Websites", "Web Development"],
    image: "/assets/petshop.png",
    description: "Responsive pet shop website showcasing services, products, appointments, and clean modern UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://petshop-demo.netlify.app/",
    size: "regular",
  },
  {
    id: "business-portfolio",
    title: "Business Portfolio",
    categoryBadge: "Portfolio",
    filterCategories: ["All", "Portfolio", "Business Websites", "Web Development"],
    image: "/assets/ayan portfolio.png",
    description: "Modern business portfolio with smooth animations, responsive layouts, and premium visual presentation.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://ayan-graphics-portfolio.netlify.app/",
    size: "regular",
  },
  {
    id: "cafe-v2",
    title: "Cafe Website Version 2",
    categoryBadge: "React Website",
    filterCategories: ["All", "Cafe", "Web Development", "Business Websites"],
    image: "/assets/cafedemo.png",
    description: "Modern React-powered café website built with Tailwind CSS and Vite for speed and performance.",
    tech: ["React", "Tailwind CSS", "Vite"],
    demoUrl: "https://demo-website-19.netlify.app/",
    size: "large",
  },
  {
    id: "interior-studio",
    title: "Interior Studio Portfolio",
    categoryBadge: "Portfolio",
    filterCategories: ["All", "Portfolio", "Business Websites", "Web Development"],
    image: "/assets/interior studio.png",
    description: "Elegant interior design studio website showcasing projects, services, galleries, and contact information.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://demo-website-17.netlify.app/",
    size: "tall",
  },
  {
    id: "coco-cafe",
    title: "Coco Cafe Website",
    categoryBadge: "Live Client Project",
    filterCategories: ["All", "Cafe", "Branding", "Business Websites", "Web Development"],
    image: "/assets/cocoicafe.png",
    description: "Official website developed for Coco Cafe with responsive layout, premium branding, and optimized performance.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://cocoicafe.in/",
    isLiveClient: true,
    size: "large",
  },
];

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full bg-[#F3F4F6] overflow-hidden">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" style={{ backgroundSize: "200% 100%" }} />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-top transform group-hover:scale-105 transition-transform duration-[350ms] ease-out"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects = projects.filter((p) => p.filterCategories.includes(activeFilter));

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
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 20,
      },
    },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 bg-[#FAFAFA] text-[#111111] relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFD60A]/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="mb-14 md:mb-20 flex flex-col items-start max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#111111]">
              SELECTED PROJECTS
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111111] mb-6 leading-[1.08]">
            Our Works
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-[#666666] font-normal leading-relaxed max-w-3xl">
            We create premium websites, ERP software, and digital experiences that help businesses grow faster.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 md:mb-20 no-scrollbar border-b border-black/[0.06]">
          {filterCategories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-[350ms] cursor-pointer ${isActive ? "text-[#111111]" : "text-[#666666] hover:text-[#111111]"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBackground"
                    className="absolute inset-0 bg-[#FFD60A] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Masonry Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Determine card column span and height classes based on size
              const colSpanClass =
                project.size === "large"
                  ? "md:col-span-2 lg:col-span-2"
                  : "col-span-1";

              const imageContainerHeight =
                project.size === "large"
                  ? "h-[360px] sm:h-[440px] lg:h-[480px]"
                  : project.size === "tall"
                    ? "h-[380px] sm:h-[460px]"
                    : "h-[300px] sm:h-[360px]";

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  onClick={() => window.open(project.demoUrl, "_blank", "noopener,noreferrer")}
                  className={`group relative flex flex-col bg-white rounded-[20px] overflow-hidden border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-[#111111]/30 transition-all duration-[350ms] cursor-pointer ${colSpanClass}`}
                >
                  {/* Large Image Container occupying approx 70% of the card */}
                  <div className={`relative w-full overflow-hidden ${imageContainerHeight}`}>
                    <ProjectImage src={project.image} alt={project.title} />

                    {/* Dark Overlay transition */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms] pointer-events-none z-10" />

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#111111] shadow-sm">
                        {project.categoryBadge}
                      </span>

                      {project.isLiveClient && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase bg-[#111111] text-[#FFD60A] shadow-md animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A]" />
                          LIVE CLIENT
                        </span>
                      )}
                    </div>

                    {/* Hover Floating Action Icon */}
                    <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-[350ms] pointer-events-none hidden sm:flex">
                      <div className="w-11 h-11 rounded-full bg-[#FFD60A] text-[#111111] flex items-center justify-center shadow-lg">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content Aligned to Bottom */}
                  <div className="p-6 sm:p-8 flex flex-col justify-end flex-grow bg-white z-20">
                    <div>
                      {/* Project Title with Upward Shift on Hover */}
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] mb-3 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-[350ms]">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm sm:text-base text-[#666666] leading-relaxed mb-6 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technology Chips */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-semibold px-3 py-1 rounded-md bg-[#F3F4F6] text-[#4B5563] border border-gray-200/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Live Demo Button fading in on hover */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] opacity-80 group-hover:opacity-100 transition-opacity duration-[350ms]">
                        <span>Live Demo</span>
                        <ExternalLink size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-[350ms] text-[#111111]" />
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] group-hover:text-[#111111] transition-colors duration-[350ms]">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Premium CTA Section */}
        <div className="mt-28 md:mt-36 lg:mt-44 relative rounded-[24px] overflow-hidden bg-[#111111] text-white p-8 sm:p-14 lg:p-20 shadow-2xl border border-white/10">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD60A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFD60A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6 text-xs uppercase tracking-widest font-semibold text-[#FFD60A]">
              <Sparkles size={14} />
              <span>Next Steps</span>
            </div>

            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Ready to build your next digital product?
            </h3>

            <p className="text-base sm:text-lg lg:text-xl text-[#A1A1AA] font-normal leading-relaxed mb-10 max-w-2xl">
              Let&apos;s create something that stands out and delivers real business results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-[#FFD60A] hover:bg-[#e6c000] text-[#111111] transition-all duration-[350ms] shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 text-base"
              >
                Start Your Project
                <ArrowRight size={18} />
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white transition-all duration-[350ms] hover:-translate-y-1 flex items-center justify-center gap-2 text-base"
              >
                View All Services
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
