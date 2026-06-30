"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, ArrowRight, Star, Zap, Eye } from "lucide-react";
import Image from "next/image";
import AnimatedCounter from "@/components/AnimatedCounter";

type FilterCategory =
  | "All"
  | "ERP"
  | "Restaurant"
  | "Business"
  | "Landing Page"
  | "Branding"
  | "Portfolio";

const filterCategories: FilterCategory[] = [
  "All",
  "ERP",
  "Restaurant",
  "Business",
  "Landing Page",
  "Branding",
  "Portfolio",
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
  caseStudyUrl: string;
  client: string;
  year: string;
  rating: number;
  metrics: string[];
  size: "large" | "small" | "wide";
}

const projects: Project[] = [
  {
    id: "gym-rrp",
    title: "Gym RRP Management ERP",
    categoryBadge: "ERP Software",
    filterCategories: ["All", "ERP", "Business"],
    image: "/assets/gymrrp.png",
    description: "Enterprise resource planning system for gyms with active attendance matrixes, automated membership tier subscriptions, payment analytics dashboards, and trainer-scheduling APIs.",
    tech: ["React", "Typescript", "Tailwind", "Supabase"],
    demoUrl: "https://gymrrp.vercel.app/",
    caseStudyUrl: "#",
    client: "Gym RRP Ltd.",
    year: "2026",
    rating: 5,
    metrics: ["Fast Load", "SEO 100", "99% Uptime"],
    size: "large",
  },
  {
    id: "restaurant-landing",
    title: "Bespoke Aroma Bistro Page",
    categoryBadge: "Restaurant",
    filterCategories: ["All", "Restaurant", "Landing Page"],
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
    description: "Premium culinary landing page showcasing virtual reservations, menu interactions, and dynamic booking systems.",
    tech: ["HTML", "CSS", "GSAP"],
    demoUrl: "https://restaurent-demo-landing-page.netlify.app/",
    caseStudyUrl: "#",
    client: "Aroma Bistro",
    year: "2025",
    rating: 5,
    metrics: ["Interactive", "Fluid", "GSAP Orbit"],
    size: "small",
  },
  {
    id: "cafe-website",
    title: "Elixir Coffee Storefront",
    categoryBadge: "Cafe Website",
    filterCategories: ["All", "Restaurant", "Business"],
    image: "/assets/cafe-demo.png",
    description: "Bespoke café digital storefront with integrated online ordering systems, gallery matrices, and responsive map locators.",
    tech: ["HTML", "CSS", "Vanilla JS"],
    demoUrl: "https://cafe-demo-17.netlify.app/",
    caseStudyUrl: "#",
    client: "Elixir Coffee",
    year: "2025",
    rating: 5,
    metrics: ["Lightweight", "Custom SVG", "SEO Opt"],
    size: "small",
  },
  {
    id: "business-portfolio",
    title: "Ayan Creative Portfolio",
    categoryBadge: "Portfolio",
    filterCategories: ["All", "Portfolio", "Business"],
    image: "/assets/ayan portfolio.png",
    description: "Award-winning portfolio for a graphic designer, built with buttery-smooth scroll physics and custom layout grids.",
    tech: ["HTML", "CSS", "GSAP"],
    demoUrl: "https://ayan-graphics-portfolio.netlify.app/",
    caseStudyUrl: "#",
    client: "Ayan Graphics",
    year: "2026",
    rating: 5,
    metrics: ["Ultra Smooth", "GSAP Scroll", "High Perf"],
    size: "wide",
  },
  {
    id: "pet-shop",
    title: "Paws & Claws Storefront",
    categoryBadge: "Business Website",
    filterCategories: ["All", "Business"],
    image: "/assets/petshop.png",
    description: "Charming digital storefront designed for a modern veterinary and premium pet supplies shop detailing appointments and care plans.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://petshop-demo.netlify.app/",
    caseStudyUrl: "#",
    client: "Paws & Claws Co.",
    year: "2025",
    rating: 5,
    metrics: ["Accessible", "Clean UI", "Responsive"],
    size: "small",
  },
  {
    id: "cafe-v2",
    title: "Brew & Bites Portal V2",
    categoryBadge: "React Web App",
    filterCategories: ["All", "Restaurant", "Business"],
    image: "/assets/cafedemo.png",
    description: "Next-gen café portal featuring reactive state filters, online payment gateways, and lightweight motion templates.",
    tech: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    demoUrl: "https://demo-website-19.netlify.app/",
    caseStudyUrl: "#",
    client: "Brew & Bites Corp.",
    year: "2026",
    rating: 5,
    metrics: ["Single Page App", "100% Flex", "Vite Speed"],
    size: "large",
  },
  {
    id: "interior-studio",
    title: "Hearth Design Studio",
    categoryBadge: "Architecture Portfolio",
    filterCategories: ["All", "Portfolio", "Business"],
    image: "/assets/interior studio.png",
    description: "An elegant minimal portfolio displaying high-resolution interior layouts, project metrics, and client review panels.",
    tech: ["HTML", "CSS", "Vanilla JS"],
    demoUrl: "https://demo-website-17.netlify.app/",
    caseStudyUrl: "#",
    client: "Hearth Studio",
    year: "2025",
    rating: 5,
    metrics: ["Minimalist", "Hi-Res Asset", "Layout Fluid"],
    size: "small",
  },
  {
    id: "coco-cafe",
    title: "Coco Cafe Branding Page",
    categoryBadge: "Branding",
    filterCategories: ["All", "Restaurant", "Branding", "Business"],
    image: "/assets/cocoicafe.png",
    description: "Official web storefront for Coco Cafe India focusing on luxury brand details, active menu guides, and organic SEO structures.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://cocoicafe.in/",
    caseStudyUrl: "#",
    client: "Coco Cafe India",
    year: "2026",
    rating: 5,
    metrics: ["Live Brand", "SEO Top 3", "Fluid Grid"],
    size: "wide",
  },
];

function ProjectImage({ src, alt, heightClass }: { src: string; alt: string; heightClass: string }) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className={`relative w-full overflow-hidden ${heightClass} bg-neutral-50`}>
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-neutral-100" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
        onLoad={() => setLoading(false)}
        onError={() => {
          if (src.includes("gym")) {
            setImgSrc("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80");
          } else if (src.includes("cafe") || src.includes("coco")) {
            setImgSrc("https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80");
          } else if (src.includes("pet")) {
            setImgSrc("https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80");
          } else if (src.includes("portfolio")) {
            setImgSrc("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80");
          } else if (src.includes("interior")) {
            setImgSrc("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80");
          } else {
            setImgSrc("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80");
          }
        }}
      />
    </div>
  );
}

function BentoCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // 12-column grid spans for layout
  const colSpanClass =
    project.size === "large"
      ? "md:col-span-8 lg:col-span-8"
      : project.size === "wide"
      ? "md:col-span-8 lg:col-span-8"
      : "md:col-span-4 lg:col-span-4";

  // Aspect ratio/height adjustments for cards
  const imageContainerHeight =
    project.size === "large"
      ? "h-[260px] sm:h-[340px] lg:h-[420px]"
      : project.size === "wide"
      ? "h-[220px] sm:h-[280px] lg:h-[320px]"
      : "h-[200px] sm:h-[240px] lg:h-[260px]";

  const cardEntryVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 16,
        delay: index * 0.04
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardEntryVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`group relative flex flex-col bg-white rounded-[28px] overflow-hidden border border-black/[0.05] p-8 transition-all duration-500 ease-out shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.14)] hover:-translate-y-[10px] hover:scale-[1.015] cursor-pointer ${colSpanClass}`}
    >
      {/* Floating custom cursor */}
      <motion.div
        className="absolute pointer-events-none z-30 bg-[#111111] text-white font-bold text-[11px] uppercase tracking-[0.15em] px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 border border-white/10"
        animate={{
          x: cursorPos.x - 55,
          y: cursorPos.y - 18,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      >
        <span>View Demo</span>
        <Eye size={12} className="text-[#FFC107]" />
      </motion.div>

      {/* Image Wrap */}
      <div className="relative w-full overflow-hidden rounded-[20px] mb-6">
        <ProjectImage src={project.image} alt={project.title} heightClass={imageContainerHeight} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

        {/* Top-Left Category Badge (Glassmorphic) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/70 backdrop-blur-md text-neutral-900 border border-white/40 shadow-sm">
            {project.categoryBadge}
          </span>
        </div>

        {/* Top-Right Year Badge */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-black/75 backdrop-blur-sm text-[#FFC107] border border-white/10 shadow-sm">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Content - Aligned and balanced height */}
      <div className="flex flex-col justify-between flex-grow" style={{ transform: "translateZ(10px)" }}>
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 mb-2 text-xs text-neutral-400 font-medium">
            <span className="font-bold text-neutral-500 uppercase tracking-widest">{project.client}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
            <span className="font-normal">{project.categoryBadge}</span>
          </div>

          {/* Card Title */}
          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-[#111111] mb-3 group-hover:text-[#FFC107] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Standardized description height */}
          <p className="text-neutral-500 text-sm leading-[1.8] mb-5 font-normal h-[50px] line-clamp-2 overflow-hidden">
            {project.description}
          </p>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[12px] font-medium px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-transparent transition-colors duration-300 group-hover:bg-neutral-50 group-hover:border-black/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          {/* Strictly Aligned Buttons */}
          <div className="flex items-center gap-3">
            {/* Primary Button */}
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] group/btn"
            >
              <span>View Live</span>
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
            
            {/* Secondary Button */}
            <a
              href={project.caseStudyUrl}
              onClick={(e) => {
                if (project.caseStudyUrl === "#") {
                  e.preventDefault();
                  alert(`Case study for ${project.title} is coming soon!`);
                }
              }}
              className="flex-1 py-3.5 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-50 border border-[#ECECEC] text-[#111111] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Case Study</span>
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Card Metrics Footer */}
          <div className="mt-6 pt-4 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-400 font-medium">
            <div className="flex items-center gap-0.5">
              <span className="text-[#FFC107] flex">
                <Star size={11} fill="#FFC107" strokeWidth={0} />
                <Star size={11} fill="#FFC107" strokeWidth={0} />
                <Star size={11} fill="#FFC107" strokeWidth={0} />
                <Star size={11} fill="#FFC107" strokeWidth={0} />
                <Star size={11} fill="#FFC107" strokeWidth={0} />
              </span>
              <span className="text-neutral-500 font-extrabold ml-1">5.0</span>
            </div>

            <div className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
              <span>Completed</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span className="text-neutral-600 font-bold">{project.year}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-bold uppercase tracking-wider">Responsive</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-bold uppercase tracking-wider">Fast</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.filterCategories.includes(activeFilter);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-[140px] bg-[#FAFAF8] text-[#111111] relative overflow-hidden noise-overlay grid-overlay"
    >
      {/* Gradient 1: Faint Large Radial Gradient Behind Header */}
      <div 
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-[0.08]"
        style={{
          background: "radial-gradient(circle at 20% 20%, rgba(255,196,0,0.12), transparent 60%)"
        }}
      />

      <div className="max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Left Aligned Section Header */}
        <div className="mb-[140px] flex flex-col items-start text-left max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-black/[0.04] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-600">
              SELECTED PROJECTS
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-neutral-900 mb-6 leading-[1.08]">
            Crafting Digital{" "}
            <span className="inline-block bg-gradient-to-r from-[#111827] to-[#FFC107] bg-clip-text text-transparent">
              Experiences.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-500 text-lg leading-[1.8] font-normal max-w-2xl">
            Premium websites, ERP systems and digital products engineered for ambitious businesses.
          </p>
        </div>

        {/* Portfolio Filters - Center Aligned */}
        <div className="flex justify-center mb-[100px] overflow-x-auto pb-4 pt-1 no-scrollbar border-b border-black/[0.04]">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-100/80 border border-black/[0.03] backdrop-blur-md">
            {filterCategories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "text-[#FFC107] bg-[#111111] shadow-md"
                      : "text-neutral-500 hover:bg-[#FFC107] hover:text-black hover:shadow-sm"
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Bento Grid - 12 columns layout */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-8 auto-rows-max"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <BentoCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gradient 2: CTA Split Layout Section */}
        <div className="mt-[140px] relative rounded-[32px] overflow-hidden bg-[#111827] text-white p-8 sm:p-14 lg:p-20 shadow-2xl border border-white/5">
          {/* Subtle Radial Gradient behind CTA (5% opacity) */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,196,0,0.1), transparent 70%)"
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Copywriting & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 text-[11px] uppercase tracking-[0.2em] font-bold text-[#FFC107]">
                <Sparkles size={12} />
                <span>Next Steps</span>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-white mb-6 leading-none">
                Ready to build something amazing?
              </h3>

              <p className="text-neutral-400 text-base leading-relaxed mb-10 max-w-xl font-normal">
                Let&apos;s engineer custom websites, enterprise-grade ERP systems and digital solutions designed to accelerate growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group w-full sm:w-auto px-9 py-4.5 rounded-full font-bold uppercase tracking-widest bg-[#FFC107] hover:bg-[#e0a800] text-[#111111] transition-all duration-300 shadow-[0_15px_30px_rgba(255,193,7,0.15)] hover:-translate-y-1 flex items-center justify-center gap-2 text-xs"
                >
                  Let&apos;s Start Your Project
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>

                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-9 py-4.5 rounded-full font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-xs"
                >
                  View All Services
                </a>
              </div>
            </div>

            {/* Right Side: Floating Abstract Graphic inside dark container */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="w-full max-w-[360px] aspect-square rounded-[24px] bg-neutral-900/50 border border-white/5 flex items-center justify-center relative overflow-hidden p-8 shadow-inner">
                {/* Abstract animated geometric visualizer */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                  {/* Outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-52 h-52 rounded-full border border-dashed border-[#FFC107]/10"
                  />
                  {/* Middle ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute w-36 h-36 rounded-full border border-[#FFC107]/20 border-t-transparent"
                  />
                  {/* Floating core */}
                  <motion.div
                    animate={{
                      y: [-12, 12, -12],
                      scale: [0.94, 1.06, 0.94],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFC107]/30 to-transparent flex items-center justify-center shadow-lg shadow-[#FFC107]/10"
                  >
                    <Zap size={28} className="text-[#FFC107]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
