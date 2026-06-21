"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "Our website packages start from ₹15,000 for a clean landing page and go up depending on complexity. A standard business website typically ranges from ₹25,000 to ₹75,000. We'll provide a detailed quote after understanding your specific needs during our free consultation.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend on the scope. A landing page can be delivered in 5–7 days, a full website in 2–4 weeks, and branding packages in 1–2 weeks. Social media management is an ongoing monthly service. We always agree on deadlines upfront and deliver on time.",
  },
  {
    question: "Do you provide social media management?",
    answer:
      "Absolutely! Social media management is one of our core services. We handle content creation, scheduling, community management, analytics, and growth strategy across platforms like Instagram, Facebook, LinkedIn, and more. Our packages are designed to grow your following and engagement consistently.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes, we specialize in website redesigns. Whether your current site looks outdated, performs poorly, or doesn't convert visitors — we'll transform it into a modern, fast, conversion-optimized website that represents your brand properly.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "We love working with small businesses and startups! REDIX.MEDIA was built to help growing businesses compete with bigger brands. Our flexible packages and direct communication style make us the perfect partner for businesses of any size looking for premium quality at fair prices.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Every project includes 2–3 rounds of revisions at no extra cost, depending on the service. For branding and web projects, we work closely with you throughout the design process to ensure we hit the mark. Additional revisions beyond the included rounds are available at a nominal fee.",
  },
  {
    question: "Will I own the website and all files?",
    answer:
      "Yes, 100%. Once the project is completed and final payment is made, you receive full ownership of all deliverables — website code, design files, brand assets, and content. Everything we create for you belongs to you. We'll also provide a clean handover package with all source files.",
  },
  {
    question: "Do you offer hosting and maintenance?",
    answer:
      "Yes! We offer optional hosting and maintenance packages starting from ₹500/month. This includes reliable hosting, regular backups, security updates, minor content updates, and priority support. We also handle domain setup and SSL certificates. You're free to host elsewhere if you prefer — we'll help with the transition.",
  },
  {
    question: "What happens after the project is done?",
    answer:
      "We don't disappear after delivery. Every client gets 30 days of free post-launch support for any issues or minor adjustments. After that, you can opt for our monthly maintenance package or reach out anytime for new projects. Many of our clients have been with us since day one — we build long-term relationships, not one-time transactions.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding section-lazy"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="badge" style={{ margin: "0 auto" }}>FAQ</div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="section-title mb-4"
          >
            Frequently Asked{" "}
            <span className="relative inline-block">
              Questions
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
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                className={`accordion-item ${isOpen ? "active" : ""}`}
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold flex-shrink-0"
                      style={{
                        color: isOpen ? "var(--yellow)" : "var(--text-muted)",
                        fontFamily: "var(--font-space)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen ? "var(--yellow)" : "var(--bg-secondary)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {isOpen ? (
                      <Minus size={14} style={{ color: "var(--text-primary)" }} />
                    ) : (
                      <Plus size={14} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="accordion-content">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            borderLeft: "4px solid var(--yellow)",
          }}
        >
          <div>
            <p
              className="font-bold text-base mb-1"
              style={{ fontFamily: "var(--font-space)", color: "var(--text-primary)" }}
            >
              Still have questions?
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Chat with us on WhatsApp or start your project directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://wa.me/919744206583"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs"
              data-analytics="faq-whatsapp-cta"
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-yellow text-xs group"
              data-analytics="faq-start-project-cta"
            >
              Start Your Project
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
