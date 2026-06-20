"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
      className="section-padding"
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
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: "easeOut" }}
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
      </div>
    </section>
  );
}
