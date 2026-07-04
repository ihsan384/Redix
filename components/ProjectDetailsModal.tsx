"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import type { Project } from "./Portfolio";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoCredentials?: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
  onOpenDemoCredentials,
}: ProjectDetailsModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, lightboxImage]);

  if (!isOpen || !project) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  } as const;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/65"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl h-[90vh] md:h-[85vh] lg:h-[90vh] bg-[#FAFAF8] rounded-[28px] border border-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden text-[#111111]"
      >
        {/* Top Right Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 p-2.5 rounded-full hover:bg-neutral-100 transition-all duration-300 z-30 cursor-pointer"
          aria-label="Close modal"
        >
          <span className="text-xl font-light block leading-none w-4 h-4 flex items-center justify-center">✕</span>
        </button>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] h-full overflow-y-auto lg:overflow-hidden">
          
          {/* Left Column (Image) */}
          <div className="relative w-full h-[280px] sm:h-[400px] lg:h-full bg-neutral-100 border-b lg:border-b-0 lg:border-r border-black/5 overflow-hidden group select-none">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            {/* Soft cover shadow for layout elegance */}
            <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
          </div>

          {/* Right Column (Scrollable Information) */}
          <div className="w-full h-auto lg:h-full overflow-y-auto flex flex-col bg-[#FAFAF8]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 p-6 md:p-10 lg:p-12 space-y-12 text-left"
            >
              {/* Header Details */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                <span className="inline-block px-3 py-1 rounded-full bg-neutral-200/50 border border-black/5 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                  {project.categoryBadge}
                </span>
                
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight leading-tight text-neutral-900">
                  {project.title}
                </h2>

                {/* Metadata Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-black/5">
                  <div>
                    <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                      Client
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                      Year
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                      Duration
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {project.duration}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                      Industry
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {project.industry}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project Overview */}
              <motion.div variants={fadeInUp} className="space-y-4 max-w-[600px]">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Overview
                </h3>
                <div className="text-[14px] leading-[1.8] text-neutral-600 space-y-4 font-normal">
                  <p>
                    <strong className="text-neutral-900 font-semibold block mb-1">The Problem</strong>
                    {project.overview.problem}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-semibold block mb-1">The Solution</strong>
                    {project.overview.solution}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-semibold block mb-1">The Result</strong>
                    {project.overview.result}
                  </p>
                </div>
              </motion.div>

              {/* Special Live Demo Section for Fusion Fit ERP */}
              {project.id === "gym-rrp" && (
                <motion.div
                  variants={fadeInUp}
                  className="space-y-5 p-6 bg-[#FFFDF5] border border-[#FFC107]/20 rounded-[28px] text-left shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFC107]/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC107]/10 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#B78A00]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
                      Live Demo
                    </span>
                    <h4 className="text-base font-extrabold text-neutral-900 leading-tight">
                      Explore the complete Fusion Fit ERP with sample data.
                    </h4>
                  </div>

                  {/* Demo Features list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      "Dashboard",
                      "Member Management",
                      "Attendance",
                      "Billing",
                      "Personal Training",
                      "Reports",
                      "Analytics"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="text-[#FFC107] font-bold text-[10px]">✔</span>
                        <span className="text-xs font-bold text-neutral-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Yellow Notice */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200/80 rounded-[20px] text-xs font-semibold text-yellow-800 leading-relaxed">
                    No signup required.
                    <br />
                    You&apos;ll automatically enter the demo environment.
                  </div>

                  {/* Action buttons inside the section */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (onOpenDemoCredentials) onOpenDemoCredentials();
                      }}
                      className="flex-1 py-3 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-[#FFC107] hover:bg-[#e0a800] text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
                    >
                      Launch Live Demo
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-5 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-50 border border-[#ECECEC] text-[#111111] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                      >
                        View Source
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Image Gallery */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Gallery
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 snap-x snap-mandatory">
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="relative flex-none w-[260px] sm:w-[320px] aspect-[16/10] rounded-[28px] overflow-hidden border border-black/5 shadow-sm cursor-zoom-in snap-start group bg-neutral-100"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 260px, 320px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Features Section */}
              {project.id !== "gym-rrp" && (
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <motion.div
                        key={feature}
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center gap-3.5 p-4.5 bg-white border border-black/[0.05] rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FFC107]/10 flex items-center justify-center">
                          <span className="text-[#FFC107] font-bold text-xs">✔</span>
                        </div>
                        <span className="text-xs font-bold text-neutral-800">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tech Stack */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-bold px-4 py-2 rounded-full bg-white text-neutral-700 border border-black/[0.05] shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-colors duration-300 hover:border-[#FFC107] select-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Project Metrics */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Metrics & Performance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="p-5.5 bg-white border border-black/[0.05] rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between h-[120px] text-left"
                    >
                      <span className="text-2xl font-black text-neutral-900 tracking-tight leading-none">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        {metric.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Client Testimonial */}
              <motion.div variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-8 bg-white border border-black/[0.05] rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-left space-y-4"
                >
                  <div className="flex gap-1 text-[#FFC107]">
                    {Array.from({ length: project.testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <blockquote className="text-neutral-700 italic text-xs sm:text-sm leading-relaxed font-normal">
                    &ldquo;{project.testimonial.text}&rdquo;
                  </blockquote>
                  <cite className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 not-italic">
                    &mdash; {project.testimonial.author}
                  </cite>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bottom Sticky Footer */}
            <div className="sticky bottom-0 left-0 right-0 bg-[#FAFAF8] border-t border-black/5 p-4.5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
              <button
                onClick={onClose}
                className="w-full sm:w-auto order-3 sm:order-1 px-8 py-3.5 rounded-full text-center text-[11px] font-bold uppercase tracking-widest border border-neutral-200 hover:bg-neutral-50 text-[#111111] transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-center text-[11px] font-bold uppercase tracking-widest bg-white hover:bg-neutral-50 border border-[#ECECEC] text-[#111111] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {project.id === "gym-rrp" ? "View Source" : "Visit Github"}
                  </a>
                )}
                
                {project.id === "gym-rrp" ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (onOpenDemoCredentials) onOpenDemoCredentials();
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-center text-[11px] font-bold uppercase tracking-widest bg-[#FFC107] hover:bg-[#e0a800] text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    Launch Live Demo
                  </button>
                ) : (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-center text-[11px] font-bold uppercase tracking-widest bg-[#FFC107] hover:bg-[#e0a800] text-black transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Live Website
                  </a>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>

      {/* Lightbox Modal (renders on top of the main modal dialog) */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => setLightboxImage(null)}
            >
              <span className="text-xl font-light block leading-none w-4 h-4 flex items-center justify-center">✕</span>
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-5xl max-h-[80vh] aspect-video w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Enlarged screenshot view"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
