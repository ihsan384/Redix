"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const founders = [
  {
    id: "f1",
    initials: "IK",
    name: "Ihsan A",
    role: "Founder & Creative Director",
    bio: "Visionary behind REDIX.MEDIA. Ihsan leads brand strategy, creative direction, and overall studio vision — combining design thinking with business growth.",
    instagram: "https://instagram.com/redixmedia",
    linkedin: "https://linkedin.com/company/redixmedia",
    email: "mailto:ihsan.anas8281@gmail.com",
  },
  {
    id: "f2",
    initials: "AR",
    name: "Fahad ",
    role: "Founder & Marketing Strategist",
    bio: "The technical backbone of REDIX.MEDIA. Ali architects the websites and digital systems that power client projects — fast, scalable, and always pixel-perfect.",
    instagram: "https://instagram.com/redixmedia",
    linkedin: "https://linkedin.com/company/redixmedia",
    email: "mailto:fahad.nasir445566@gmail.com",
  },
  {
    id: "f3",
    initials: "SM",
    name: "Ayan",
    role: "Founder & Content Strategist",
    bio: "Ayan drives the content strategy and social media engine at REDIX.MEDIA — turning raw ideas into engaging narratives that grow brands online.",
    instagram: "https://instagram.com/redixmedia",
    linkedin: "https://linkedin.com/company/redixmedia",
    email: "mailto:[EMAIL_ADDRESS]",
  },
];

export default function Founders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="founders"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="badge">The Team</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            Meet the Founders
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-title lg:col-span-3"
          >
            Meet The People{" "}
            <span className="relative inline-block">
              Behind REDIX
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-2 text-sm leading-relaxed self-end"
            style={{ color: "var(--text-secondary)" }}
          >
            Young, ambitious creators obsessed with results and design excellence.
            Every project at REDIX is touched by this team directly.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {founders.map((founder, i) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              className="group relative p-8"
              style={{ background: "var(--bg-primary)" }}
            >
              {/* Yellow top bar on hover */}
              <motion.div
                style={{ position: "absolute", top: 0, left: 0, height: "3px", background: "var(--yellow)", width: 0 }}
                animate={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Avatar */}
              <div
                className="w-16 h-16 flex items-center justify-center font-black text-xl mb-6 group-hover:bg-yellow-400 transition-colors duration-300"
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "2px",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-space)",
                }}
              >
                {founder.initials}
              </div>

              <h3
                className="font-bold text-lg mb-1"
                style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
              >
                {founder.name}
              </h3>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
              >
                {founder.role}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                {founder.bio}
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: <InstagramIcon size={15} />, href: founder.instagram, label: "Instagram" },
                  { icon: <LinkedInIcon size={15} />,  href: founder.linkedin,  label: "LinkedIn" },
                  { icon: <Mail size={15} />, href: founder.email,    label: "Email" },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "var(--bg-secondary)",
                      borderRadius: "2px",
                      color: "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--yellow)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--bg-secondary)";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
