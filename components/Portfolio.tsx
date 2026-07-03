"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import DemoCredentialsModal from "./DemoCredentialsModal";
import ProjectDetailsModal from "./ProjectDetailsModal";


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

export interface Project {
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
  size: "large" | "small" | "wide";
  // Case Study Redesign fields
  duration: string;
  industry: string;
  overview: {
    problem: string;
    solution: string;
    result: string;
  };
  features: string[];
  githubUrl?: string;
  metrics: {
    value: string;
    label: string;
  }[];
  gallery: string[];
  testimonial: {
    rating: number;
    text: string;
    author: string;
  };
}

const projects: Project[] = [
  {
    id: "gym-rrp",
    title: "Gym RRP Management ERP",
    categoryBadge: "ERP Software",
    filterCategories: ["All", "ERP", "Business"],
    image: "/assets/gymrrp.png",
    description: "Enterprise resource planning system for gyms with active attendance matrixes, automated membership tier subscriptions, payment analytics dashboards, and trainer-scheduling APIs.",
    tech: ["React", "Typescript", "Tailwind CSS", "Supabase", "Framer Motion", "Lucide"],
    demoUrl: "https://fusionfitgym.vercel.app",
    caseStudyUrl: "#",
    client: "Fusion Fit Gym",
    year: "2026",
    size: "large",
    duration: "5 Weeks",
    industry: "Fitness",
    overview: {
      problem: "Fusion Fit Gym was struggling with manual spreadsheets, slow member check-ins, and fragmented billing systems that caused substantial revenue leakage.",
      solution: "We engineered a custom enterprise management ERP featuring automated membership subscription tiers, an active attendance tracking matrix, and trainer-scheduling APIs.",
      result: "Streamlined operations by 40%, eliminated billing discrepancies, and introduced instant Bio-metric check-in functionality for all active members."
    },
    features: [
      "Member Management",
      "Attendance Tracking",
      "Billing & Subscriptions",
      "Trainer Management",
      "Analytics Dashboard",
      "Bio-metric Check-in"
    ],
    githubUrl: "https://github.com/ihsan384/GymRRP",
    metrics: [
      { value: "99%", label: "Performance" },
      
      { value: "2.1s", label: "Load Time" },
      { value: "Responsive", label: "Desktop • Tablet • Mobile" }
    ],
    gallery: [
      "/assets/1.png",
      "/assets/2.png",
      "/assets/3.png"
    ],
    testimonial: {
      rating: 5,
      text: "REDIX.MEDIA delivered exactly what we needed. The system streamlined our operations.",
      author: "Fusion Fit Gym"
    }
  },
  {
    id: "restaurant-landing",
    title: "Bespoke Aroma Bistro Page",
    categoryBadge: "Restaurant",
    filterCategories: ["All", "Restaurant", "Landing Page"],
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
    description: "Premium culinary landing page showcasing virtual reservations, menu interactions, and dynamic booking systems.",
    tech: ["HTML", "Tailwind CSS", "GSAP", "JavaScript"],
    demoUrl: "https://restaurent-demo-landing-page.netlify.app/",
    caseStudyUrl: "#",
    client: "Aroma Bistro",
    year: "2025",
    size: "small",
    duration: "2 Weeks",
    industry: "Culinary",
    overview: {
      problem: "Aroma Bistro lacked a premium digital presence, causing them to miss reservation bookings and fail to capture their high-end restaurant atmosphere online.",
      solution: "We designed a bespoke, highly interactive single-page booking application with smooth GSAP animations and web reservation integration.",
      result: "Online table reservations increased by 65% in the first month, and session duration on the website tripled."
    },
    features: [
      "Virtual Reservations",
      "Interactive Menu Guide",
      "Table Selection Map",
      "Chef Showcases",
      "Event Planner Module",
      "SMS Confirmation API"
    ],
    githubUrl: "https://github.com/ihsan384/aroma-bistro",
    metrics: [
      { value: "98%", label: "Performance" },
      { value: "96", label: "SEO Score" },
      { value: "1.2s", label: "Load Time" },
      { value: "Smooth", label: "GSAP Animations" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "The booking flow is flawless. Our customers frequently praise the design when making reservations.",
      author: "Aroma Bistro"
    }
  },
  {
    id: "cafe-website",
    title: "Elixir Coffee Storefront",
    categoryBadge: "Cafe Website",
    filterCategories: ["All", "Restaurant", "Business"],
    image: "/assets/cafe-demo.png",
    description: "Bespoke café digital storefront with integrated online ordering systems, gallery matrices, and responsive map locators.",
    tech: ["HTML", "CSS", "Vanilla JS", "Netlify"],
    demoUrl: "https://cafe-demo-17.netlify.app/",
    caseStudyUrl: "#",
    client: "Elixir Coffee",
    year: "2025",
    size: "small",
    duration: "3 Weeks",
    industry: "Food & Beverage",
    overview: {
      problem: "Elixir Coffee had a static social page but no direct ordering pipeline, relying on third-party food delivery apps that charged high commissions.",
      solution: "We built a fast storefront with light cart capabilities, dynamic store maps, and mobile-first responsive architecture.",
      result: "Allowed the client to take direct pickups, capturing 100% of ordering margins and building a direct customer relationship."
    },
    features: [
      "Mobile Ordering Cart",
      "Bespoke Menu Grid",
      "Real-time Store Status",
      "Integrated Map Locator",
      "Interactive Gallery",
      "Loyalty Signup Form"
    ],
    metrics: [
      { value: "100%", label: "Mobile Score" },
      { value: "98", label: "SEO Rank" },
      { value: "0.9s", label: "Load Time" },
      { value: "Zero", label: "Server Costs" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "It has never been easier for our regulars to place orders. We saved thousands in commission fees.",
      author: "Elixir Coffee"
    }
  },
  {
    id: "business-portfolio",
    title: "Ayan Creative Portfolio",
    categoryBadge: "Portfolio",
    filterCategories: ["All", "Portfolio", "Business"],
    image: "/assets/ayan portfolio.png",
    description: "Award-winning portfolio for a graphic designer, built with buttery-smooth scroll physics and custom layout grids.",
    tech: ["HTML", "CSS", "GSAP", "Vanilla JS"],
    demoUrl: "https://ayan-graphics-portfolio.netlify.app/",
    caseStudyUrl: "#",
    client: "Ayan Graphics",
    year: "2026",
    size: "wide",
    duration: "3 Weeks",
    industry: "Design & Media",
    overview: {
      problem: "Ayan Graphics needed a portfolio that matched his high level of visual art, requiring animations that felt tactile, smooth, and premium.",
      solution: "We built a custom portfolio using advanced layout grids, custom scroll physics, and heavy animation composition via GSAP.",
      result: "Featured on several design galleries, gaining direct inbound leads for the designer."
    },
    features: [
      "Custom Scroll Physics",
      "Layout Grid Matrices",
      "High-Res Image Zoom",
      "Dark/Light Mode Theme",
      "Inbound Contact Funnel",
      "Dynamic Project Filters"
    ],
    githubUrl: "https://github.com/ihsan384/ayan-portfolio",
    metrics: [
      { value: "95%", label: "Performance" },
      { value: "100", label: "SEO Score" },
      { value: "1.8s", label: "Load Time" },
      { value: "Awwwards", label: "Nominated" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "REDIX.MEDIA understood my aesthetic completely. The animations are incredibly polished.",
      author: "Ayan Graphics"
    }
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
    size: "small",
    duration: "3 Weeks",
    industry: "Pet Care",
    overview: {
      problem: "A local pet boutique wanted to scale their reach and enable appointment scheduling for pet grooming without calling the reception desk.",
      solution: "We designed a friendly, highly-accessible storefront with an automated booking wizard and interactive care plans.",
      result: "Reduced front-desk booking inquiries by 50% while increasing overall retail store traffic by 30%."
    },
    features: [
      "Booking Scheduler",
      "Pet Profile Creator",
      "Interactive Care Plans",
      "Staff Calendar Sync",
      "Automated Reminders",
      "Local SEO Setup"
    ],
    metrics: [
      { value: "99%", label: "Accessibility" },
      { value: "95", label: "Performance" },
      { value: "1.4s", label: "Load Time" },
      { value: "50%", label: "Booking Uplift" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80",
      "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "Our clients love the simplicity of scheduling groomings. It has streamlined our workflow.",
      author: "Paws & Claws Co."
    }
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
    year: "2024",
    size: "large",
    duration: "6 Weeks",
    industry: "Hospitality",
    overview: {
      problem: "Brew & Bites needed a scalable web application that could handle multi-location ordering, real-time ticket kitchen views, and payment gateways.",
      solution: "We engineered a Next-gen café portal featuring reactive state filters, online payment gateways, and lightweight motion templates built with React.",
      result: "Reduced ordering processing times from minutes to seconds, improving guest satisfaction scores across three locations."
    },
    features: [
      "Reactive Menu Filters",
      "Multi-Location Support",
      "Kitchen Display System",
      "Payment Gateway Sync",
      "Real-time Order Status",
      "Admin Dashboard"
    ],
    githubUrl: "https://github.com/ihsan384/brew-bites-v2",
    metrics: [
      { value: "97%", label: "Mobile Load" },
      { value: "98", label: "Performance" },
      { value: "1.1s", label: "Interactive Time" },
      { value: "Secured", label: "PCI Compliance" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "The technology provided by REDIX.MEDIA helped us scale our operations to three locations with ease.",
      author: "Brew & Bites Corp."
    }
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
    size: "small",
    duration: "3 Weeks",
    industry: "Architecture",
    overview: {
      problem: "An upscale architecture firm needed an elegant digital canvas to display high-resolution architectural works without compromising site speed.",
      solution: "We developed a minimal portfolio showcasing high-resolution gallery matrices, responsive map locators, and optimized client reviews.",
      result: "The studio won two new corporate interior contracts after presenting their new digital catalog to prospective clients."
    },
    features: [
      "High-Res Image Optimization",
      "Interactive Project Pins",
      "Client Review Panel",
      "Minimal Layout Grid",
      "Inbound Inquiry Form",
      "SVG Blueprint Visuals"
    ],
    metrics: [
      { value: "100%", label: "Image Optimization" },
      { value: "99", label: "SEO Rating" },
      { value: "1.5s", label: "Page Load" },
      { value: "Minimalist", label: "Apple-inspired UX" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "The website feels like our physical studio space—clean, spacious, and perfectly executed.",
      author: "Hearth Studio"
    }
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
    year: "2022",
    size: "wide",
    duration: "5 Weeks",
    industry: "Food & Beverage",
    overview: {
      problem: "Coco Cafe India launched a luxury branch but was struggling with local search discovery, losing out on coffee lovers in premium metro areas.",
      solution: "We built a luxury-focused branding portal with organic schema markup and search engine structured tables.",
      result: "Attained Rank #1 for regional specialty cafes, driving a steady stream of foot traffic to their physical locations."
    },
    features: [
      "Luxury Brand Storytelling",
      "Menu Carousel Slider",
      "Structured SEO Metadata",
      "Location Store Guide",
      "Event Booking Module",
      "Social Media Aggregator"
    ],
    githubUrl: "https://github.com/ihsan384/coco-cafe",
    metrics: [
      { value: "100%", label: "SEO Score" },
      { value: "96", label: "Performance" },
      { value: "1.0s", label: "First Content Paint" },
      { value: "#1 Rank", label: "Google Local Search" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80"
    ],
    testimonial: {
      rating: 5,
      text: "Organic search traffic rose by over 200%. The site perfectly mirrors our brand aesthetic.",
      author: "Coco Cafe India"
    }
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
        className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-110"
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

function BentoCard({
  project,
  index,
  onOpenDemoCredentials,
  onOpenProjectDetails,
}: {
  project: Project;
  index: number;
  onOpenDemoCredentials: () => void;
  onOpenProjectDetails: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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
      ? "h-[320px] sm:h-[420px] lg:h-[520px]"
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
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`group relative flex flex-col bg-white rounded-[32px] overflow-hidden border border-neutral-200 p-6 transition-all duration-500 ease-out hover:-translate-y-3 hover:border-[#FFC107] hover:shadow-[0_35px_80px_rgba(0,0,0,0.08)] ${colSpanClass}`}
    >
      {/* Image Wrap */}
      <div className="relative w-full overflow-hidden rounded-[20px] mb-6">
        <ProjectImage src={project.image} alt={project.title} heightClass={imageContainerHeight} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

        {/* Top-Left Category Badge (Glassmorphic) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/80 text-white text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-xl">
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
          <h3 className="text-3xl font-black tracking-tight text-neutral-900 mb-2 group-hover:text-black transition-all duration-300">
            {project.title}
          </h3>

          {/* Standardized description height */}
          <p className="text-neutral-500 text-[15px] leading-7 mb-6 line-clamp-2">
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
            {project.id === "gym-rrp" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onOpenDemoCredentials();
                }}
                className="flex-1 py-3.5 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] group/btn cursor-pointer"
              >
                <span>🚀 Explore Live Demo</span>
              </button>
            ) : (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] group/btn"
              >
                <span>Live Preview →</span>
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            )}
            <button
              type="button"
              onClick={() => onOpenProjectDetails(project)}
              className="flex-1 py-3.5 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-white text-[#111111] border border-neutral-200 hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] cursor-pointer"
            >
              <span>Case Study</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectDetails = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

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
            Every project is handcrafted to deliver exceptional design, outstanding performance, and measurable business growth.
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
                  className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer overflow-hidden ${isActive
                    ? "bg-[#FFC107] text-black shadow-md"
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
              <BentoCard
                key={project.id}
                project={project}
                index={idx}
                onOpenDemoCredentials={() => setIsDemoModalOpen(true)}
                onOpenProjectDetails={handleOpenProjectDetails}
              />
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

      {/* Demo Credentials Modal */}
      <AnimatePresence>
        {isProjectModalOpen && selectedProject && (
          <ProjectDetailsModal
            key={selectedProject.id}
            project={selectedProject}
            isOpen={isProjectModalOpen}
            onClose={handleCloseProjectDetails}
            onOpenDemoCredentials={() => setIsDemoModalOpen(true)}
          />
        )}
        {isDemoModalOpen && (
          <DemoCredentialsModal
            isOpen={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
