"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Send, CheckCircle2, AlertCircle, User, Mail, Phone, DollarSign } from "lucide-react";

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Custom Website",
    budget_range: "₹10,000 – ₹25,000",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setSubmitted(true);
      setQuoteNumber(data.quote_number || "");
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-14 sm:py-24 px-4 sm:px-6 flex flex-col items-center justify-center" style={{ background: "var(--bg-primary, #0B0F17)", color: "var(--text-primary, #FFFFFF)" }}>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "var(--yellow, #FFD700)" }}>
            <Quote size={14} /> Request a Custom Proposal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ fontFamily: "var(--font-space)" }}>
            Instant Quote Request
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Tell us about your project requirements and receive a customized quote directly in your inbox.
          </p>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 sm:p-10 bg-white/5 border border-yellow-500/30 rounded-2xl text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-400 text-black rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Quote Request Submitted!</h3>
            {quoteNumber && (
              <p className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest mb-3">
                Reference ID: {quoteNumber}
              </p>
            )}
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Our sales & engineering leads will review your requirement and send an official proposal within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition">
              Request Another Quote
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-10 bg-white/5 border border-white/10 rounded-2xl space-y-4 sm:space-y-6">
            {error && (
              <div className="p-3.5 sm:p-4 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-red-300">
                <AlertCircle size={16} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Beckham"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="david@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Phone / WhatsApp</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94970 13275"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Required Service *</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                >
                  <option value="Custom Website">Custom Website</option>
                  <option value="Custom CRM Solution">Custom CRM Solution</option>
                  <option value="Custom ERP System">Custom ERP System</option>
                  <option value="ERP + CRM Ecosystem">ERP + CRM Ecosystem</option>
                  <option value="Branding & Design">Branding & Design</option>
                  <option value="Video Editing & Production">Video Editing & Production</option>
                  <option value="Social Media Management">Social Media Management</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Estimated Budget Range</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  placeholder="e.g. ₹10,000 – ₹25,000 or Custom (Let's Talk)"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Project Requirements & Timeline</label>
              <textarea
                rows={5}
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Describe your project goals, preferred stack/design preferences, target deadline..."
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Request Official Quote</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
