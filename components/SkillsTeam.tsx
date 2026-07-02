"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { 
  Mail, 
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Video,
  Sliders,
  Film,
  Smartphone,
  Palette,
  PenTool,
  Award,
  Heart,
  Monitor,
  Printer,
  Sparkles,
  Database
} from "lucide-react";

// Social Custom Icons as lucide exports for them don't exist in older versions
const LinkedInIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const GitHubIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);


// Types
interface Skill {
  name: string;
  colorClass: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  initials: string;
  skills: Skill[];
  linkedin: string;
  github: string;
  instagram: string;
  email: string;
  glowColor: string;
  borderGradient: string;
  avatarGradient: string;
}

// Tech Icon component mapping
const SkillIcon = ({ name }: { name: string }) => {
  const normalized = name.toLowerCase().trim();

  // Custom SVG paths for major technology brands
  switch (normalized) {
    case "html5":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 6H7.9l.2 2.5h10.4l-.6 6.3-5.4 1.5-5.4-1.5-.3-3.8h2.5l.2 1.8 3 .8 3-.8.3-3.4H5.6L5 3.5h14.1l-.3 2.5z" />
        </svg>
      );
    case "css3":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm4.5 9.5h11l-.3 3.5-4.7 1.3-4.7-1.3-.2-2h-2.5l.4 4.5 7 2 7-2 .7-8.5H5.8l-.2-2.5h13.2l.2-2.5H5.1l.9 9z" />
        </svg>
      );
    case "javascript":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M0 0h24v24H0V0zm20 18.2c0-1.8-1-2.8-3-3.4l-1.1-.3c-.8-.2-1.2-.5-1.2-1 0-.5.4-.8 1.1-.8.7 0 1.2.3 1.4.8h2.3c-.3-1.6-1.5-2.8-3.7-2.8-2.3 0-3.6 1.3-3.6 3 0 1.8 1 2.7 3.1 3.2l1 .3c1 .3 1.3.6 1.3 1.1 0 .6-.5.9-1.2.9-.9 0-1.5-.4-1.8-1.2H11c.3 2 1.8 3.1 4.2 3.1 2.5 0 4.8-1.3 4.8-3.2zm-9.3-5.3H8.4V19c0 1.3-.7 2.1-2 2.1-1.2 0-1.8-.7-2.1-1.6H2c.3 2.2 1.7 3.6 4.3 3.6 3.6 0 4.4-2 4.4-4.2V12.9z" />
        </svg>
      );
    case "typescript":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M0 0h24v24H0V0zm22.4 18.2c0-1.8-1-2.8-3-3.4l-1.1-.3c-.8-.2-1.2-.5-1.2-1 0-.5.4-.8 1.1-.8.7 0 1.2.3 1.4.8h2.3c-.3-1.6-1.5-2.8-3.7-2.8-2.3 0-3.6 1.3-3.6 3 0 1.8 1 2.7 3.1 3.2l1 .3c1 .3 1.3.6 1.3 1.1 0 .6-.5.9-1.2.9-.9 0-1.5-.4-1.8-1.2h-2.3c.3 2 1.8 3.1 4.2 3.1 2.5 0 4.8-1.3 4.8-3.2zM8.3 15h5.4v-2.1H5.6V22h2.7v-7z" />
        </svg>
      );
    case "react":
      return (
        <svg className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "next.js":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16V8l8 8V8" />
        </svg>
      );
    case "node.js":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2L2 7.7v11.6L12 22l10-5.7V7.7L12 2zm-1 15.6V12.9l-3 1.7v-2.3l3-1.7V8.4l3 1.7v7.5l-3 1.7z" />
        </svg>
      );
    case "python":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.4 0 5 4.8 5 5v2h7V8H5c-3.1 0-5 1.9-5 5s1.9 5 5 5h1.5v-2.2c0-1.5 1.3-2.8 2.8-2.8h4.4c1.5 0 2.8-1.3 2.8-2.8V6.7C21.5 1.5 17.6 0 12 0zm-3 2.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 24c6.6 0 7-4.8 7-5v-2h-7v-1h7c3.1 0 5-1.9 5-5s-1.9-5-5-5h-1.5v2.2c0 1.5-1.3 2.8-2.8 2.8H10.4c-1.5 0-2.8 1.3-2.8 2.8v3.5c0 5.2 3.9 6.7 9.5 6.7zm3-2.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0-2.4z" />
        </svg>
      );
    case "tailwind css":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 6.5c-2.3 0-4.3 1-5.3 2.5 1-.5 2.2-.2 2.8.8.5.8.3 1.8-.4 2.5-.7.7-1.7.9-2.5.4 1 1 1.3 2.2.8 2.8-1 1-2.5.8-3.3-.4-.8-1.1-.5-2.6.6-3.1C3.7 9 3 6.8 4.7 5.2c1.7-1.6 4.3-1.2 5.5.8 1-1.2 2.4-2 4.1-2 2.4 0 4.1 1.7 4.1 4.1 0 1-.3 1.9-.9 2.5-.6.6-1.5.9-2.1.4-.7-.5-.9-1.5-.4-2.1.5-.6 1.5-.8 2.1-.3-.3-1-.9-1.6-1.7-2 .5 1.5.1 2.8-.8 3.3-1.1.7-2.6.4-3.1-.6-.6-.7-.4-1.7.3-2.4.7-.6 1.7-.8 2.3-.3-.8-1-2-1.6-3.8-1.6zm6.8 6c-1-.5-2.2-.2-2.8.8-.5.8-.3 1.8.4 2.5.7.7 1.7.9 2.5.4-1-1-1.3-2.2-.8-2.8 1-1 2.5-.8 3.3.4.8 1.1.5 2.6-.6 3.1-.8 1-1.5 3.2-3.2 4.8-1.7 1.6-4.3 1.2-5.5-.8-1 1.2-2.4 2-4.1 2-2.4 0-4.1-1.7-4.1-4.1 0-1 .3-1.9.9-2.5.6-.6 1.5-.9 2.1-.4.7.5.9 1.5.4 2.1-.5.6-1.5.8-2.1.3.3 1 .9 1.6 1.7 2-.5-1.5-.1-2.8.8-3.3 1.1-.7 2.6-.4 3.1.6.6.7.4 1.7-.3 2.4-.7.6-1.7.8-2.3.3.8 1 2 1.6 3.8 1.6 2.3 0 4.3-1 5.3-2.5z" />
        </svg>
      );
    case "firebase":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.9 18.3L5.4 5.2c.1-.8.7-1.4 1.5-1.4.3 0 .6.1.8.3L12 8.7l-8.1 9.6zm16.2 0L12.5 9.2l6.2-6c.4-.4 1-.4 1.3 0 .2.2.3.5.2.8l-1.9 12.8-1.8 1.5zM12 10.3l3.2 8.2-1.7 1.6c-.6.6-1.5.6-2.1 0L3.3 11.9l8.7-1.6z" />
        </svg>
      );
    case "supabase":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 11.5a.8.8 0 0 0-.6-.2H13V3.6a.8.8 0 0 0-1.4-.5L3 12.5a.8.8 0 0 0 .6 1.4H11v7.6a.8.8 0 0 0 1.4.5L21 12.1a.8.8 0 0 0 0-.6z" />
        </svg>
      );
    case "git":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.3 10.7L13.3.7C12.9.3 12.3.3 11.9.7L8.9 3.7l3.2 3.2c.8-.3 1.8-.1 2.4.6.6.6.8 1.5.5 2.3l3.2 3.2c.8-.3 1.7-.1 2.3.5.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.6-.6-.8-1.5-.5-2.3l-3.2-3.2c-.3.3-.7.5-1.2.5-.5 0-.9-.2-1.2-.5l-3.2 3.2c.3.8.1 1.7-.5 2.3-.8.8-2.1.8-2.9 0s-.8-2.1 0-2.9c.6-.6 1.5-.8 2.3-.5l3.2-3.2-3-3L.7 11.9c-.4.4-.4 1 0 1.4l10 10c.4.4 1 .4 1.4 0l11.2-11.2c.4-.4.4-1 0-1.4z" />
        </svg>
      );
    case "github":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .3C5.4.3 0 5.7 0 12.4c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 2.2 18.3 2.5 18.3 2.5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12.4C24 5.7 18.6.3 12 .3z" />
        </svg>
      );
    case "canva":
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.2 1.9c-5.2 0-9.4 4.2-9.4 9.4 0 2.2.8 4.3 2.1 5.9l.4-.4c-1.1-1.4-1.8-3.2-1.8-5.1 0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7c0 4.1-2.8 7.5-6.6 8.4l-.2.1c3.6-1.1 6.1-4.4 6.1-8.5.1-5.1-4.1-9.3-9.3-9.3zm-1.8 14.5c.2-.2.3-.5.3-.7 0-.3-.2-.5-.4-.7-.2-.2-.5-.3-.7-.3-.3 0-.5.2-.7.4-.2.2-.3.5-.3.7 0 .3.2.5.4.7.2.2.5.3.7.3.3 0 .5-.2.7-.4zm2-3.1c.3 0 .5-.2.7-.4.2-.2.3-.5.3-.7 0-.3-.2-.5-.4-.7-.2-.2-.5-.3-.7-.3-.3 0-.5.2-.7.4-.2.2-.3.5-.3.7 0 .3.2.5.4.7.2.2.5.3.7.3z" />
        </svg>
      );
    case "sql":
      return <Database className="w-3.5 h-3.5" aria-hidden="true" />;
    case "arduino":
    case "esp32":
      return <Cpu className="w-3.5 h-3.5" aria-hidden="true" />;
    case "rest api":
      return <Code2 className="w-3.5 h-3.5" aria-hidden="true" />;
    case "motion graphics":
      return <Layers className="w-3.5 h-3.5" aria-hidden="true" />;
    case "video editing":
    case "reels editing":
      return <Video className="w-3.5 h-3.5" aria-hidden="true" />;
    case "color grading":
      return <Sliders className="w-3.5 h-3.5" aria-hidden="true" />;
    case "short-form content":
      return <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />;
    case "logo design":
      return <PenTool className="w-3.5 h-3.5" aria-hidden="true" />;
    case "branding":
      return <Award className="w-3.5 h-3.5" aria-hidden="true" />;
    case "social media design":
      return <Heart className="w-3.5 h-3.5" aria-hidden="true" />;
    case "ui graphics":
      return <Monitor className="w-3.5 h-3.5" aria-hidden="true" />;
    case "print design":
      return <Printer className="w-3.5 h-3.5" aria-hidden="true" />;
    case "photoshop":
    case "adobe photoshop":
    case "illustrator":
    case "adobe illustrator":
    case "adobe premiere pro":
    case "adobe after effects":
    case "davinci resolve":
      return <Palette className="w-3.5 h-3.5" aria-hidden="true" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />;
  }
};

const team: TeamMember[] = [
  {
    id: "ihsan",
    name: "Ihsan",
    role: "Founder & Full Stack Developer",
    description: "Passionate full-stack developer specializing in modern web applications, scalable systems, ERP platforms, automation, and AI-powered solutions.",
    initials: "IK",
    glowColor: "rgba(255, 193, 7, 0.22)",
    borderGradient: "from-yellow-400/40 via-amber-500/20 to-transparent",
    avatarGradient: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
    linkedin: "https://linkedin.com/company/redixmedia",
    github: "https://github.com",
    instagram: "https://instagram.com/redixmedia",
    email: "mailto:ihsan.anas8281@gmail.com",
    skills: [
      { name: "HTML5", colorClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
      { name: "CSS3", colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { name: "JavaScript", colorClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
      { name: "TypeScript", colorClass: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20" },
      { name: "React", colorClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
      { name: "Next.js", colorClass: "bg-neutral-800/10 text-neutral-800 dark:text-neutral-200 border-neutral-800/20" },
      { name: "Node.js", colorClass: "bg-green-600/10 text-green-600 dark:text-green-400 border-green-600/20" },
      { name: "Express.js", colorClass: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20" },
      { name: "Python", colorClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
      { name: "Firebase", colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
      { name: "Supabase", colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
      { name: "SQL", colorClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
      { name: "Tailwind CSS", colorClass: "bg-sky-400/10 text-sky-500 dark:text-sky-400 border-sky-400/20" },
      { name: "Bootstrap", colorClass: "bg-violet-600/10 text-violet-600 dark:text-violet-400 border-violet-600/20" },
      { name: "Git", colorClass: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
      { name: "GitHub", colorClass: "bg-slate-800/10 text-slate-800 dark:text-slate-200 border-slate-800/20" },
      { name: "REST API", colorClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
      { name: "Arduino", colorClass: "bg-teal-600/10 text-teal-600 dark:text-teal-400 border-teal-600/20" },
      { name: "ESP32", colorClass: "bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 border-cyan-600/20" },
      { name: "Photoshop", colorClass: "bg-blue-700/10 text-blue-500 dark:text-blue-400 border-blue-700/20" },
      { name: "Illustrator", colorClass: "bg-amber-600/10 text-amber-600 dark:text-amber-400 border-amber-600/20" }
    ]
  },
  {
    id: "fahad",
    name: "Fahad",
    role: "Video Editor & Motion Designer",
    description: "Creative editor focused on cinematic storytelling, promotional content, motion graphics, and professional video production.",
    initials: "FN",
    glowColor: "rgba(139, 92, 246, 0.22)",
    borderGradient: "from-purple-400/40 via-violet-500/20 to-transparent",
    avatarGradient: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
    linkedin: "https://linkedin.com/company/redixmedia",
    github: "https://github.com",
    instagram: "https://instagram.com/redixmedia",
    email: "mailto:fahad@redix.in",
    skills: [
      { name: "Adobe Premiere Pro", colorClass: "bg-violet-800/10 text-violet-700 dark:text-violet-300 border-violet-800/20" },
      { name: "Adobe After Effects", colorClass: "bg-purple-800/10 text-purple-700 dark:text-purple-300 border-purple-800/20" },
      { name: "CapCut", colorClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
      { name: "DaVinci Resolve", colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { name: "Motion Graphics", colorClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
      { name: "Video Editing", colorClass: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
      { name: "Color Grading", colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
      { name: "Reels Editing", colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
      { name: "Short-form Content", colorClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" }
    ]
  },
  {
    id: "ayan",
    name: "Ayan",
    role: "Graphic Designer & Brand Designer",
    description: "Creative designer crafting modern brand identities, marketing materials, social media graphics, and visual experiences.",
    initials: "AG",
    glowColor: "rgba(20, 184, 166, 0.22)",
    borderGradient: "from-teal-400/40 via-emerald-500/20 to-transparent",
    avatarGradient: "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
    linkedin: "https://linkedin.com/company/redixmedia",
    github: "https://github.com",
    instagram: "https://instagram.com/redixmedia",
    email: "mailto:ayan@redix.in",
    skills: [
      { name: "Canva", colorClass: "bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 border-cyan-600/20" },
      { name: "Adobe Photoshop", colorClass: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20" },
      { name: "Adobe Illustrator", colorClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
      { name: "Logo Design", colorClass: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
      { name: "Branding", colorClass: "bg-violet-600/10 text-violet-600 dark:text-violet-400 border-violet-600/20" },
      { name: "Social Media Design", colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
      { name: "UI Graphics", colorClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
      { name: "Print Design", colorClass: "bg-amber-600/10 text-amber-600 dark:text-amber-400 border-amber-600/20" }
    ]
  }
];

// Framer Motion Animation Variants
const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } 
  },
  hover: {
    y: -10,
    transition: { duration: 0.35, ease: "easeInOut" }
  }
};

const skillsContainerVariants: Variants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.03
    }
  }
};

const skillBadgeVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.08, 
    y: -3,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
};

export default function SkillsTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Render initials avatar directly

  return (
    <section
      id="team"
      className="section-padding overflow-hidden relative"
      style={{ background: "var(--bg-primary)" }}
      ref={sectionRef}
      aria-label="Our Team and Skills"
    >
      {/* Decorative subtle ambient background light */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] pointer-events-none opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255, 193, 7, 0.15) 0%, transparent 80%)"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="section-header"
        >
          <div className="badge">Skills & Team</div>
          <span 
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
          >
            Our Expertise
          </span>
        </motion.div>

        {/* Section Heading & Subheading */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-title lg:col-span-3 text-left"
          >
            Our Team &{" "}
            <span className="relative inline-block highlight">
              Expertise
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-2 text-sm leading-relaxed self-end"
            style={{ color: "var(--text-secondary)" }}
          >
            Meet the professionals behind REDIX and explore the technologies and creative tools we use to build exceptional digital experiences.
          </motion.p>
        </div>

        {/* Team Cards Grid */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 items-stretch"
        >
          {team.map((member) => {
            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover="hover"
                whileFocus="hover"
                tabIndex={0}
                className="group relative flex flex-col h-full rounded-[24px] p-[1.5px] bg-gradient-to-br transition-shadow duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${member.borderGradient.split(" ").slice(1).join(" ")})`
                }}
              >
                {/* Glow Effect Element - Radial gradient styled background that becomes visible on hover */}
                <div 
                  className="absolute inset-0 -z-10 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${member.glowColor} 0%, transparent 75%)`,
                    transform: "scale(1.05)"
                  }}
                />

                {/* Inner glassmorphic card body */}
                <div 
                  className="flex flex-col h-full rounded-[22.5px] p-8 lg:p-10 border border-white/40 dark:border-white/5 shadow-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.55)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)"
                  }}
                >
                  {/* Top Row: Avatar & Metadata */}
                  <div className="flex items-center gap-5 mb-6">
                    {/* Avatar container with initials */}
                    <div 
                      className="relative w-18 h-18 rounded-2xl overflow-hidden border border-white/80 shrink-0 flex items-center justify-center font-bold text-white text-xl uppercase shadow-sm transition-transform duration-500 group-hover:scale-108"
                      style={{ background: member.avatarGradient }}
                    >
                      {member.initials}
                    </div>

                    {/* Meta */}
                    <div className="flex-grow min-w-0">
                      <h3 
                        className="font-bold text-xl leading-tight truncate text-neutral-900"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {member.name}
                      </h3>
                      <p 
                        className="text-[11px] font-bold uppercase tracking-wider mt-1.5 text-neutral-500"
                        style={{ fontFamily: "var(--font-space)" }}
                      >
                        {member.role}
                      </p>
                      {/* Skill Counter */}
                      <span className="inline-flex items-center gap-1 mt-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-neutral-950 text-white shadow-xs">
                        {member.skills.length} Skills
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-0.5 bg-neutral-900/10 rounded-full mb-5" />

                  {/* Description */}
                  <p 
                    className="text-[13.5px] leading-relaxed mb-6 flex-grow font-normal text-neutral-600"
                  >
                    {member.description}
                  </p>

                  {/* Skills Section */}
                  <div className="mb-8">
                    <h4 
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3.5"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      Core Skills
                    </h4>

                    {/* Skill Badges Container */}
                    <motion.ul 
                      variants={skillsContainerVariants}
                      className="flex flex-wrap gap-2 list-none p-0 m-0"
                      aria-label={`${member.name}'s skills list`}
                    >
                      {member.skills.map((skill) => (
                        <motion.li
                          key={skill.name}
                          variants={skillBadgeVariants}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-colors duration-300 ${skill.colorClass}`}
                        >
                          <span className="shrink-0" aria-hidden="true">
                            <SkillIcon name={skill.name} />
                          </span>
                          <span>{skill.name}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Footer: Social Connections */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-900/5 mt-auto">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider text-neutral-400"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      Connect
                    </span>
                    <div className="flex gap-2">
                      {[
                        { icon: <LinkedInIcon size={15} />, href: member.linkedin, label: `${member.name}'s LinkedIn profile` },
                        { icon: <GitHubIcon size={15} />, href: member.github, label: `${member.name}'s GitHub profile` },
                        { icon: <InstagramIcon size={15} />, href: member.instagram, label: `${member.name}'s Instagram profile` },
                        { icon: <Mail size={15} />, href: member.email, label: `Send email to ${member.name}` }
                      ].map(({ icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("mailto") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="w-8.5 h-8.5 flex items-center justify-center rounded-lg transition-all duration-300 bg-neutral-100 hover:bg-neutral-950 text-neutral-500 hover:text-white border border-neutral-200/50 shadow-2xs"
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
