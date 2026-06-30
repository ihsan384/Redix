"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, ExternalLink, ArrowRight, Star, Layers, Zap, Heart, CheckCircle2 } from "lucide-react";
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
  size: "large" | "small" | "wide" | "tall";
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
    size: "tall",
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
    <div className={`relative w-full overflow-hidden ${heightClass} bg-neutral-100`}>
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200" style={{ backgroundSize: "200% 100%" }} />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
        onLoad={() => setLoading(false)}
        onError={() => {
          // Fallback to beautiful Unsplash images if local images are missing
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
  
  // Custom cursor follow position inside the card
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // For local cursor tracking
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    // For 3D tilt
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

  // Grid layout class based on size
  const colSpanClass =
    project.size === "large"
      ? "md:col-span-2 lg:col-span-2"
      : project.size === "wide"
      ? "md:col-span-2 lg:col-span-2"
      : "col-span-1";

  const imageContainerHeight =
    project.size === "large"
      ? "h-[280px] sm:h-[360px] lg:h-[420px]"
      : project.size === "wide"
      ? "h-[240px] sm:h-[300px] lg:h-[320px]"
      : project.size === "tall"
      ? "h-[300px] sm:h-[340px] lg:h-[380px]"
      : "h-[200px] sm:h-[240px] lg:h-[260px]";

  // Motion variants for stagger entry
  const cardEntryVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
        delay: index * 0.05
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
      className={`group relative flex flex-col bg-white rounded-[28px] overflow-hidden border border-black/[0.05] p-4 transition-all duration-500 ease-out shadow-[0_30px_80px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_100px_rgba(255,196,0,0.12),0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:scale-[1.02] cursor-pointer ${colSpanClass}`}
    >
      {/* Interactive cursor label */}
      <motion.div
        className="absolute pointer-events-none z-30 bg-[#FFD60A] text-black font-extrabold text-xs uppercase tracking-widest px-4 py-2.5 rounded-full shadow-xl flex items-center gap-1.5 border border-black/10"
        animate={{
          x: cursorPos.x - 60,
          y: cursorPos.y - 20,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      >
        <span>View Demo</span>
        <ArrowUpRight size={14} />
      </motion.div>

      {/* Image Container with Rounded Edge */}
      <div className="relative w-full overflow-hidden rounded-[20px]">
        <ProjectImage src={project.image} alt={project.title} heightClass={imageContainerHeight} />
        
        {/* Dark Overlay transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

        {/* Floating Category Badge (Glassmorphic) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/60 backdrop-blur-md text-[#111827] border border-white/40 shadow-sm">
            {project.categoryBadge}
          </span>
        </div>

        {/* Year Badge floating top-right */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="inline-flex items-center px-3 py-2 rounded-full text-[11px] font-black tracking-widest uppercase bg-black/75 backdrop-blur-sm text-[#FFD60A] border border-white/10 shadow-sm">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content Aligned below Image */}
      <div className="pt-6 pb-2 px-2 flex flex-col justify-between flex-grow" style={{ transform: "translateZ(20px)" }}>
        <div>
          {/* Client & Metadata Row */}
          <div className="flex items-center gap-2 mb-2 text-xs text-neutral-400 font-medium">
            <span className="font-bold text-neutral-500 uppercase tracking-widest">{project.client}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
            <span className="font-normal">{project.categoryBadge}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl lg:text-[24px] font-black tracking-tight text-[#111827] mb-3 group-hover:text-black transition-colors duration-300">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-neutral-500 text-sm leading-relaxed mb-5 font-normal">
            {project.description}
          </p>

          {/* Technology Chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-[#FFD60A] text-neutral-600 hover:text-black border border-transparent transition-all duration-300 transform hover:scale-105"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* Buttons: View Live & View Case Study */}
          <div className="flex items-center gap-3 mt-auto">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-wider bg-[#111827] text-[#FFD60A] border border-transparent hover:bg-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <span>View Live</span>
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <a
              href={project.caseStudyUrl}
              onClick={(e) => {
                if (project.caseStudyUrl === "#") {
                  e.preventDefault();
                  alert(`Case study for ${project.title} is coming soon!`);
                }
              }}
              className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-wider bg-neutral-50 hover:bg-neutral-100 border border-black/[0.06] text-[#111827] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Case Study</span>
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Project Metrics at bottom */}
          <div className="mt-5 pt-4 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-400 font-medium">
            <div className="flex items-center gap-0.5">
              <span className="text-[#FFC400] flex">
                <Star size={11} fill="#FFC400" strokeWidth={0} />
                <Star size={11} fill="#FFC400" strokeWidth={0} />
                <Star size={11} fill="#FFC400" strokeWidth={0} />
                <Star size={11} fill="#FFC400" strokeWidth={0} />
                <Star size={11} fill="#FFC400" strokeWidth={0} />
              </span>
              <span className="text-neutral-500 font-extrabold ml-1">5.0</span>
            </div>

            <div className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
              <span>Completed</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span className="text-neutral-600 font-bold">{project.year}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-black uppercase tracking-wider">Responsive</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-black uppercase tracking-wider">Fast</span>
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
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-28 md:py-36 lg:py-44 bg-[#FFFFFF] text-[#111111] relative overflow-hidden noise-overlay grid-overlay"
    >
      {/* Floating Blurred Gradient Circles */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] left-[3%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FFD60A]/10 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 70, -50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[3%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFC400]/8 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Premium Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-10">
          <div className="max-w-3xl flex flex-col items-start">
            {/* Styled Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-black/[0.05] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-black text-neutral-600">
                SELECTED PROJECTS
              </span>
            </div>

            {/* Premium Section Heading */}
            <h2 className="text-premium-heading text-neutral-900 mb-6 max-w-2xl leading-[1.08]">
              Crafting Digital{" "}
              <span className="inline-block bg-gradient-to-r from-[#111827] to-[#FFC400] bg-clip-text text-transparent">
                Experiences.
              </span>
            </h2>

            {/* Premium Description */}
            <p className="text-premium-description text-neutral-500 max-w-xl">
              Premium websites, ERP systems and digital products engineered for ambitious businesses.
            </p>
          </div>

          {/* Right Side - Animated Counters */}
          <div className="flex flex-wrap sm:flex-nowrap gap-10 lg:gap-14 bg-neutral-50/50 backdrop-blur-md p-8 rounded-[24px] border border-black/[0.03] shadow-sm">
            <div className="flex flex-col">
              <span className="text-4xl lg:text-[46px] font-black text-[#111111] flex items-center leading-none tracking-tight">
                <AnimatedCounter end={120} />
                <span className="text-[#FFC400] ml-0.5">+</span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold mt-2.5">
                Projects Delivered
              </span>
            </div>
            
            <div className="w-px h-12 bg-neutral-200/60 hidden sm:block self-center" />
            
            <div className="flex flex-col">
              <span className="text-4xl lg:text-[46px] font-black text-[#111111] flex items-center leading-none tracking-tight">
                <AnimatedCounter end={5} />
                <span className="text-[#FFC400] text-3xl ml-1">★</span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold mt-2.5">
                Client Rating
              </span>
            </div>

            <div className="w-px h-12 bg-neutral-200/60 hidden sm:block self-center" />

            <div className="flex flex-col">
              <span className="text-4xl lg:text-[46px] font-black text-[#111111] flex items-center leading-none tracking-tight">
                <AnimatedCounter end={99} />
                <span className="text-[#FFC400] ml-0.5">%</span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold mt-2.5">
                Success Rate
              </span>
            </div>
          </div>
        </div>

        {/* Floating Pill Filter Bar */}
        <div className="flex justify-center md:justify-start mb-16 md:mb-20 overflow-x-auto pb-4 pt-1 no-scrollbar border-b border-black/[0.05]">
          <div className="flex items-center gap-3 p-1.5 rounded-full bg-neutral-50 border border-black/[0.04] backdrop-blur-md">
            {filterCategories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "text-[#FFD60A] bg-[#111111] shadow-md"
                      : "text-neutral-500 hover:bg-[#FFD60A] hover:text-black hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-max"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <BentoCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Premium Dark CTA Section */}
        <div className="mt-32 md:mt-40 lg:mt-48 relative rounded-[32px] overflow-hidden bg-[#111827] text-white p-8 sm:p-16 lg:p-24 shadow-2xl border border-white/5">
          {/* Subtle Accent Glows */}
          <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-[#FFD60A]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Tiny Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 text-[11px] uppercase tracking-[0.2em] font-black text-[#FFD60A]">
              <Sparkles size={13} className="animate-spin-slow" />
              <span>Next Steps</span>
            </div>

            {/* Headline */}
            <h3 className="text-3xl sm:text-5xl lg:text-[64px] font-black tracking-tight text-white mb-6 leading-none max-w-3xl">
              Ready to build something amazing?
            </h3>

            {/* Sub-description */}
            <p className="text-base sm:text-lg lg:text-[20px] text-neutral-400 font-normal leading-relaxed mb-12 max-w-xl">
              Let&apos;s engineer custom websites, enterprise-grade ERP systems and digital solutions designed to accelerate growth.
            </p>

            {/* Glowing CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group w-full sm:w-auto px-9 py-5 rounded-full font-black uppercase tracking-widest bg-[#FFD60A] hover:bg-[#e6c000] text-[#111111] transition-all duration-300 shadow-[0_15px_30px_rgba(255,214,10,0.25)] hover:shadow-[0_20px_45px_rgba(255,214,10,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2.5 text-xs"
              >
                Let&apos;s Start Your Project
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-9 py-5 rounded-full font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2.5 text-xs"
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
