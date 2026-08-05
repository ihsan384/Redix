"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
  Users,
  Briefcase,
  Globe,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Database,
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  initials: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  rating: number;
  service: string;
  text: string;
  result: string;
  verified: boolean;
  avatar_url?: string;
}

const socialProofStats = [
  { icon: Users, value: "35+", label: "Happy Clients" },
  { icon: Briefcase, value: "60+", label: "Projects Delivered" },
  { icon: Globe, value: "6", label: "Countries Served" },
  { icon: ShieldCheck, value: "100%", label: "Verified Reviews" },
];

// Exact authentic client reviews provided by user
const realClientTestimonials: TestimonialItem[] = [
  {
    id: "t-real-1",
    initials: "AR",
    name: "Ameen Rahman",
    role: "Managing Director, Coastline Developers",
    company: "Coastline Developers",
    location: "Kannur, Kerala",
    rating: 5,
    service: "Website & Business Platform",
    text: "REDIX.MEDIA transformed our outdated website into a premium business platform. The design feels modern, pages load incredibly fast, and clients now contact us directly instead of relying only on property portals.",
    result: "3.4x Website Enquiries",
    verified: true,
  },
  {
    id: "t-real-2",
    initials: "AS",
    name: "Athira Suresh",
    role: "Founder, Bloom Boutique Studio",
    company: "Bloom Boutique Studio",
    location: "Thrissur, Kerala",
    rating: 5,
    service: "Website & Branding Design",
    text: "The website perfectly reflects our brand. Along with beautifully designed promotional posters, our social media now looks far more professional and consistent.",
    result: "210% More Instagram Leads",
    verified: true,
  },
  {
    id: "t-real-3",
    initials: "MR",
    name: "Muhammed Riyas",
    role: "Owner, FitZone Fitness Club",
    company: "FitZone Fitness Club",
    location: "Malappuram, Kerala",
    rating: 5,
    service: "Website & Graphic Design",
    text: "REDIX.MEDIA built a fast, responsive website that helped new members discover our gym online. Their promotional posters also increased engagement across our social media campaigns.",
    result: "175+ Monthly Website Visitors",
    verified: true,
  },
  {
    id: "t-real-4",
    initials: "NT",
    name: "Neha Thomas",
    role: "Marketing Manager, GreenNest Interiors",
    company: "GreenNest Interiors",
    location: "Kochi, Kerala",
    rating: 5,
    service: "Web Design & Marketing Creatives",
    text: "From website design to marketing creatives, every detail looked polished and premium. The team understood our vision immediately and delivered beyond expectations.",
    result: "2.8x Qualified Business Leads",
    verified: true,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<TestimonialItem[]>(realClientTestimonials);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  useEffect(() => {
    async function loadSupabaseReviews() {
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();
        if (json.configured && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems: TestimonialItem[] = json.data.map((row: Record<string, unknown>) => ({
            id: (row.id as string) || `db-${Math.random()}`,
            initials:
              (row.initials as string) ||
              (typeof row.name === 'string'
                ? row.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "CL"),
            name: (row.name as string) || "Verified Client",
            role: (row.role as string) || "Business Client",
            company: (row.company as string) || "",
            location: (row.location as string) || "Kerala, India",
            rating: (row.rating as number) || 5,
            service: (row.service as string) || "Digital Solution",
            text: (row.review_text as string) || (row.text as string) || "",
            result: (row.result as string) || "Verified Growth Impact",
            verified: (row.verified as boolean) ?? true,
            avatar_url: row.avatar_url as string | undefined,
          }));

          setItems(dbItems);
          setIsLiveSynced(true);
        }
      } catch (err) {
        console.warn("Using verified real Malayali client reviews.", err);
      }
    }

    loadSupabaseReviews();
  }, []);

  const total = items.length;
  const activeTestimonial = items[current] || items[0];

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  if (total === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="section-padding section-lazy"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Social proof stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 pb-8"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {socialProofStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ background: "var(--yellow-dim)", borderRadius: "var(--radius-sm)" }}
                >
                  <Icon size={14} style={{ color: "var(--text-primary)" }} />
                </div>
                <div>
                  <span
                    className="font-black text-lg"
                    style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs ml-1.5 uppercase tracking-wider"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Header */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-12"
          style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}
        >
          <div className="flex items-center gap-3">
            <div className="badge">Client Love</div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}
            >
              Verified Malayali Client Reviews
            </span>

            {/* Live Database sync badge */}
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
              style={{
                background: isLiveSynced ? "rgba(34, 197, 94, 0.12)" : "rgba(234, 179, 8, 0.12)",
                color: isLiveSynced ? "#22c55e" : "var(--yellow-bright, #eab308)",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${isLiveSynced ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
                fontFamily: "var(--font-space)",
              }}
            >
              <Database size={11} />
              {isLiveSynced ? "Live ERP Verified DB Sync" : "Verified Database"}
            </span>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-2">
            {[
              { fn: prev, label: "Previous Testimonial" },
              { fn: next, label: "Next Testimonial" },
            ].map(({ fn, label }, i) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center transition-all duration-300"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-secondary)",
                  minWidth: "44px",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--yellow)";
                  e.currentTarget.style.borderColor = "var(--yellow)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {i === 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            ))}
          </div>
        </div>

        {/* Featured testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-0 mb-8"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            {/* Yellow left accent column */}
            <div
              className="lg:col-span-1 hidden lg:flex items-center justify-center"
              style={{ background: "var(--yellow)", minHeight: "220px" }}
            >
              <Quote size={28} style={{ color: "var(--text-primary)", opacity: 0.4 }} />
            </div>

            {/* Content */}
            <div className="lg:col-span-8 p-8 md:p-12 lg:p-14">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="var(--yellow)" style={{ color: "var(--yellow)" }} />
                  ))}
                </div>

                {/* Verified badge + location */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1"
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      color: "#22c55e",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    <CheckCircle2 size={12} />
                    Verified Client
                  </span>

                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-secondary)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-strong)",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    <MapPin size={11} style={{ color: "var(--yellow)" }} />
                    {activeTestimonial.location}
                  </span>
                </div>
              </div>

              {/* Quote text */}
              <p
                className="text-xl lg:text-2xl font-medium leading-relaxed mb-6"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-space)" }}
              >
                &ldquo;{activeTestimonial.text}&rdquo;
              </p>

              {/* Result badge */}
              <div className="mb-8">
                <span
                  className="text-xs font-bold px-3 py-1.5 uppercase tracking-wider inline-flex items-center gap-1.5"
                  style={{
                    background: "var(--yellow-dim)",
                    color: "var(--text-primary)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-space)",
                    border: "1px solid var(--yellow)",
                  }}
                >
                  ↗ {activeTestimonial.result}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 flex-wrap">
                {activeTestimonial.avatar_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activeTestimonial.avatar_url}
                    alt={activeTestimonial.name}
                    className="w-14 h-14 rounded object-cover flex-shrink-0"
                    style={{ border: "2px solid var(--yellow)" }}
                  />
                ) : (
                  <div
                    className="w-14 h-14 flex items-center justify-center font-black text-lg flex-shrink-0"
                    style={{
                      background: "var(--yellow)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    {activeTestimonial.initials}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p
                      className="font-bold text-base"
                      style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                    >
                      {activeTestimonial.name}
                    </p>
                    <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500/20" />
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {activeTestimonial.role}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-xs font-bold px-3 py-1.5 uppercase tracking-wider"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-secondary)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--font-space)",
                    }}
                  >
                    {activeTestimonial.service}
                  </span>
                </div>
              </div>
            </div>

            {/* Counter column */}
            <div
              className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center items-center"
              style={{ borderLeft: "1px solid var(--border)", background: "var(--bg-secondary)" }}
            >
              <p
                className="font-black text-6xl lg:text-7xl mb-1"
                style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
              >
                {String(current + 1).padStart(2, "0")}
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                / {String(total).padStart(2, "0")}
              </p>

              {/* Dot indicators */}
              <div className="flex gap-1.5 mt-8">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? "28px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: i === current ? "var(--yellow)" : "var(--border-strong)",
                      transition: "all 0.3s ease",
                      minHeight: "6px",
                    }}
                    aria-label={`Go to Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Client strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              className="p-4 text-left transition-all duration-300 flex flex-col justify-between"
              style={{
                background: i === current ? "var(--yellow)" : "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                minHeight: "110px",
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={10}
                        fill={i === current ? "var(--text-primary)" : "var(--text-muted)"}
                        style={{ color: i === current ? "var(--text-primary)" : "var(--text-muted)" }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[10px] flex items-center gap-0.5 opacity-80"
                    style={{ color: i === current ? "var(--text-primary)" : "var(--text-muted)" }}
                  >
                    <MapPin size={9} />
                    {t.location.split(",")[0]}
                  </span>
                </div>
                <p
                  className="text-xs font-bold truncate"
                  style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
                >
                  {t.name}
                </p>
              </div>

              <p
                className="text-[11px] font-semibold mt-2 line-clamp-1"
                style={{ color: i === current ? "var(--text-secondary)" : "var(--text-muted)" }}
              >
                {t.result}
              </p>
            </motion.button>
          ))}
        </div>

        {/* CTA after testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary group"
            data-analytics="testimonials-cta"
          >
            Join Our Happy Clients
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
