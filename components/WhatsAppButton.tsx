"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Smartphone, Video, Palette, TrendingUp, Edit3, MessageSquare } from "lucide-react";
import { useState } from "react";

const whatsappServices = [
  {
    name: "Website Development",
    Icon: Globe,
    color: "#3b82f6",
    message: "Hi REDIX.MEDIA! I'm interested in Website Development for my business."
  },
  {
    name: "Social Media Management",
    Icon: Smartphone,
    color: "#ec4899",
    message: "Hi REDIX.MEDIA! I'm interested in Social Media Management services."
  },
  {
    name: "Video Editing",
    Icon: Video,
    color: "#eab308",
    message: "Hi REDIX.MEDIA! I'm interested in your Video Editing services."
  },
  {
    name: "Branding & Design",
    Icon: Palette,
    color: "#a855f7",
    message: "Hi REDIX.MEDIA! I'm interested in Branding & Design for my brand."
  },
  {
    name: "Digital Marketing",
    Icon: TrendingUp,
    color: "#22c55e",
    message: "Hi REDIX.MEDIA! I'm interested in Digital Marketing services."
  },
  {
    name: "Content Creation",
    Icon: Edit3,
    color: "#f97316",
    message: "Hi REDIX.MEDIA! I'm interested in Content Creation."
  },
  {
    name: "General Inquiry / Other",
    Icon: MessageSquare,
    color: "#64748b",
    message: "Hi REDIX.MEDIA! I'd like to chat about your services."
  }
];

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceClick = (msg: string) => {
    window.open(`https://wa.me/919744206583?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 select-none">
      {/* Interactive Service Selector Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-[calc(100vw-2rem)] max-w-[360px] sm:w-[380px] flex flex-col shadow-2xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              borderRadius: "2px",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-primary)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/logo.svg"
                    alt="Redix Media Logo"
                    className="w-9 h-9 object-cover rounded-full border"
                    style={{ borderColor: "var(--border)" }}
                  />
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2"
                    style={{ borderColor: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <h4
                    className="font-bold text-sm leading-none tracking-tight"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    REDIX.MEDIA
                  </h4>
                  <span className="text-[10px] opacity-70">Typically replies in minutes</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: "var(--bg-primary)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 overflow-y-auto max-h-[350px] space-y-3" style={{ background: "var(--bg-card)" }}>
              <div
                className="p-3 rounded-sm"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Hey there! 👋 Select a service below to start a conversation with our team on WhatsApp:
                </p>
              </div>

              {/* Service Buttons */}
              <div className="space-y-2 pt-1">
                {whatsappServices.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => handleServiceClick(service.message)}
                    className="w-full flex items-center gap-3 p-2 text-left transition-all duration-200 group cursor-pointer"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--yellow)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-yellow-400 group-hover:border-yellow-400"
                      style={{
                        background: "var(--bg-secondary)",
                        borderRadius: "2px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <service.Icon
                        size={13}
                        style={{ color: service.color }}
                        className="group-hover:text-black transition-colors duration-200"
                      />
                    </div>
                    <span
                      className="text-xs font-semibold transition-colors duration-200 group-hover:text-yellow-400"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-space)" }}
                    >
                      {service.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close-able Hint Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            className="flex items-center gap-2 px-4 py-2.5 shadow-lg"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              borderRadius: "2px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <span
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-space)" }}
            >
              Chat with us 👋
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              style={{ color: "var(--text-muted)" }}
              aria-label="Close"
              className="ml-1 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        id="whatsapp-float-btn"
        data-analytics="whatsapp-float-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        aria-label="Chat on WhatsApp"
        aria-expanded={isOpen}
        className="w-14 h-14 flex items-center justify-center relative cursor-pointer outline-none border-0"
        style={{
          background: "#25d366",
          borderRadius: "2px",
          boxShadow: "var(--shadow-md)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "whatsapp"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <X size={24} color="white" />
            ) : (
              <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
