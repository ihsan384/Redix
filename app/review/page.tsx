"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2, AlertCircle, Send, Building, User, Briefcase, Image as ImageIcon } from "lucide-react";

function ReviewContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const clientId = searchParams.get("client_id") || "";

  const [verifying, setVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [clientInfo, setClientInfo] = useState<{
    review_request_id?: string;
    client_id?: string;
    client_name?: string;
    client_email?: string;
    company?: string;
  }>({});

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [service, setService] = useState("Website Development & Digital Strategy");
  const [review, setReview] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function verifyLink() {
      if (!token && !clientId) {
        setVerifying(false);
        setValidToken(false);
        setErrorMessage("Please use a valid client review invitation link provided by REDIX ERP.");
        return;
      }

      try {
        const query = token ? `token=${encodeURIComponent(token)}` : `client_id=${encodeURIComponent(clientId)}`;
        const res = await fetch(`/api/review/verify?${query}`);
        const data = await res.json();

        if (res.ok && data.valid) {
          setValidToken(true);
          setClientInfo(data);
          if (data.client_name) setName(data.client_name);
          if (data.company) setCompany(data.company);
        } else {
          setValidToken(false);
          setErrorMessage(data.error || "This review invitation link is invalid or expired.");
        }
      } catch (err: any) {
        setValidToken(false);
        setErrorMessage("Failed to verify invitation link. Please try again.");
      } finally {
        setVerifying(false);
      }
    }

    verifyLink();
  }, [token, clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) {
      setSubmitError("Please fill in your name and review text.");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/review/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          client_id: clientInfo.client_id || clientId,
          review_request_id: clientInfo.review_request_id,
          name,
          company,
          position,
          service,
          rating,
          review,
          logo_url: logoUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center" style={{ background: "var(--bg-primary, #0B0F17)", color: "var(--text-primary, #FFFFFF)" }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "var(--yellow, #FFD700)" }}>
            <ShieldCheck size={14} /> Verified Client Review
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ fontFamily: "var(--font-space)" }}>
            Share Your Experience with REDIX
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Your feedback helps us continuously elevate our creative and engineering standards.
          </p>
        </div>

        {/* Loading State */}
        {verifying && (
          <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-10 h-10 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-zinc-400">Verifying client invitation link...</p>
          </div>
        )}

        {/* Invalid Token Alert */}
        {!verifying && !validToken && (
          <div className="p-8 bg-red-950/40 border border-red-500/30 rounded-2xl text-center">
            <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-200 mb-2">Review Invitation Invalid</h3>
            <p className="text-sm text-red-300/80 mb-6">{errorMessage}</p>
            <a href="/" className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition">
              Return to Website
            </a>
          </div>
        )}

        {/* Success State */}
        {!verifying && validToken && submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 bg-white/5 border border-yellow-500/30 rounded-2xl text-center">
            <div className="w-16 h-16 bg-yellow-400 text-black rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You for Your Review!</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Your review has been submitted to REDIX ERP moderation. Once approved by our team, it will be showcased on our public website.
            </p>
            <a href="/" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 transition">
              Back to Home
            </a>
          </motion.div>
        )}

        {/* Review Form */}
        {!verifying && validToken && !submitted && (
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 bg-white/5 border border-white/10 rounded-2xl space-y-6">
            {submitError && (
              <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-3 text-sm text-red-300">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Rating Stars */}
            <div className="text-center py-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Overall Rating *</label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl focus:outline-none transition-transform hover:scale-125"
                  >
                    <Star
                      size={28}
                      className={
                        (hoverRating || rating) >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-600"
                      }
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-yellow-400 font-bold mt-2">
                {rating === 5 ? "Excellent (5 Stars)" : `${rating} out of 5 Stars`}
              </p>
            </div>

            {/* Name & Company */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Company / Organization</label>
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Position & Service */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Job Title / Position</label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Founder & CEO"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Service Provided</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. Custom ERP & Branding"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                />
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Your Review / Testimonial *</label>
              <textarea
                required
                rows={5}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience working with REDIX..."
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white resize-none"
              />
            </div>

            {/* Logo / Photo URL (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Logo or Profile Image URL (Optional)</label>
              <div className="relative">
                <ImageIcon size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-yellow-400/50 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <>
                  <span>Submit Client Review</span>
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

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
