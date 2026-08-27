"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MessageCircle, Phone, MapPin, Send, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

const contactLinks = [
  { Icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919497013275", color: "#25d366" },
  { Icon: Mail, label: "Email", value: "hello@redix.media", href: "mailto:hello@redix.media", color: "var(--text-primary)" },
  { Icon: Phone, label: "Call", value: "+91 94970 13275", href: "tel:+919497013275", color: "var(--text-primary)" },
  { Icon: MapPin, label: "Location", value: "Based in India · Serving Remotely", href: "#", color: "var(--text-muted)" },
];

const services = [
  "Custom Website",
  "Custom CRM (One-Time)",
  "Custom ERP (One-Time)",
  "ERP + CRM Solution",
  "Social Media Posters",
  "Video Editing",
  "Social Media Management",
  "Branding & Design",
  "Other",
];

const serviceBudgets: Record<string, string[]> = {
  "Custom Website": [
    "₹3,000 – ₹5,000",
    "₹5,000 – ₹10,000",
    "₹10,000 – ₹25,000",
    "₹25,000+",
    "Custom (Let's Talk)",
  ],
  "Custom CRM (One-Time)": [
    "₹5,000 – ₹10,000",
    "₹10,000 – ₹20,000",
    "₹20,000 – ₹35,000",
    "₹35,000+",
    "Custom (Let's Talk)",
  ],
  "Custom ERP (One-Time)": [
    "₹4,000 – ₹10,000",
    "₹10,000 – ₹20,000",
    "₹20,000 – ₹35,000",
    "₹35,000+",
    "Custom (Let's Talk)",
  ],
  "ERP + CRM Solution": [
    "₹10,000 – ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000+",
    "Custom (Let's Talk)",
  ],
  "Social Media Posters": [
    "₹299 / design",
    "₹1,000 – ₹3,000 (Pack)",
    "₹3,000 – ₹5,000",
    "₹5,000+",
    "Custom (Let's Talk)",
  ],
  "Video Editing": [
    "₹499 – ₹1,500 / video",
    "₹1,500 – ₹3,500 / video",
    "₹3,500 – ₹7,500 / video",
    "₹7,500+",
    "Custom (Let's Talk)",
  ],
  "Social Media Management": [
    "Under ₹3,000 / mo",
    "₹3,000 – ₹7,000 / mo",
    "₹7,000 – ₹15,000 / mo",
    "₹15,000+ / mo",
    "Custom (Let's Talk)",
  ],
  "Branding & Design": [
    "Under ₹3,000",
    "₹3,000 – ₹7,000",
    "₹7,000 – ₹15,000",
    "₹15,000+",
    "Custom (Let's Talk)",
  ],
  "Other": [
    "Under ₹3,000",
    "₹3,000 – ₹7,000",
    "₹7,000 – ₹15,000",
    "₹15,000+",
    "Custom (Let's Talk)",
  ]
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      service: e.target.value,
      budget: "", // Reset budget selection when service changes
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", service: "", budget: "", message: "" });
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="section-header">
          <div className="badge">Contact</div>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>
            Get In Touch
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="section-title mb-4">
              Let&apos;s Build{" "}
              <span className="relative inline-block">
                Something Together
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
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)", maxWidth: "380px" }}>
              Fill out the form and we&apos;ll get back to you within 24 hours with a detailed proposal tailored to your needs.
            </p>

            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {contactLinks.map(({ Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-4 transition-all duration-300 group"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-strong)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: "var(--bg-secondary)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>{label}</div>
                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919497013275"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderLeft: "4px solid var(--yellow)",
                borderRadius: "var(--radius-md)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--yellow)", borderRadius: "var(--radius-sm)" }}
              >
                <Sparkles size={20} style={{ color: "var(--text-primary)" }} />
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
                  Free 30-Min Strategy Call
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Book via WhatsApp and get expert advice for your brand.
                </p>
              </div>
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full min-h-[400px] p-10"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderTop: "4px solid var(--yellow)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center mb-6"
                  style={{ background: "var(--yellow)", borderRadius: "var(--radius-md)" }}
                >
                  <CheckCircle2 size={28} style={{ color: "var(--text-primary)" }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}>
                  Message Sent!
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-5 p-8 lg:p-10"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderTop: "4px solid var(--yellow)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {error && (
                  <div
                    className="p-4 flex items-start gap-3 text-sm text-red-400 bg-red-950/30 border border-red-500/30 rounded-md"
                    style={{ borderRadius: "var(--radius-sm)" }}
                  >
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <div>{error}</div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>Name *</label>
                    <input id="contact-name" type="text" required placeholder="John Smith" className="form-input"
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>Email *</label>
                    <input id="contact-email" type="email" required placeholder="john@example.com" className="form-input"
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>Service *</label>
                  <select id="contact-service" required className="form-input appearance-none"
                    value={formData.service} onChange={handleServiceChange}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>Budget</label>
                  <select id="contact-budget" className="form-input appearance-none"
                    value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    disabled={!formData.service}
                  >
                    <option value="">{formData.service ? "Select range" : "Please select a service first"}</option>
                    {formData.service && serviceBudgets[formData.service]?.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-space)" }}>Details *</label>
                  <textarea id="contact-message" required rows={5} placeholder="Tell us about your project, goals, and timeline..."
                    className="form-input resize-none"
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                </div>

                <motion.button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="btn-yellow w-full justify-center"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <span>Sending...</span>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
