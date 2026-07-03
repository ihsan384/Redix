"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, X, ShieldAlert, Info } from "lucide-react";

interface DemoCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoCredentialsModal({ isOpen, onClose }: DemoCredentialsModalProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const emailVal = "demo@redix.media";
  const passwordVal = "demo123";
  const demoUrl = "https://fusionfitgym.vercel.app";

  const triggerToast = (setter: (val: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  const copyBoth = async () => {
    const text = `Email: ${emailVal}\nPassword: ${passwordVal}`;
    try {
      await navigator.clipboard.writeText(text);
      triggerToast(setCopiedAll);
    } catch (err) {
      console.error("Failed to copy credentials:", err);
    }
  };

  const copyField = async (text: string, setter: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      triggerToast(setter);
    } catch (err) {
      console.error("Failed to copy field:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Glassmorphic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 240 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAFAF8] rounded-[32px] border border-black/5 shadow-[0_30px_80px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden text-[#111111]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 p-2.5 rounded-full hover:bg-neutral-100 transition-all duration-300 z-30 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
          {/* Header */}
          <div className="space-y-2 text-left pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC107]/10 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#B78A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
              Live Demo Access
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-none flex items-center gap-2">
              Fusion Fit ERP Live Demo
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed font-normal font-sans">
              Explore the complete Gym ERP using our public demo account.
            </p>
          </div>

          {/* Demo account card */}
          <div className="relative p-5 bg-[#FFF9E6] border border-[#FFC107]/35 rounded-[24px] shadow-[0_12px_35px_rgba(183,138,0,0.10)] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#7A5C00]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC107]/20">
                  <Info size={16} aria-hidden="true" />
                </span>
                <h4 className="text-sm font-extrabold tracking-tight text-neutral-900">Demo Account</h4>
              </div>
              <span className="rounded-full bg-[#FFC107] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-black shadow-sm">
                Demo Account
              </span>
            </div>
            
            {/* Email Field */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-neutral-50 border border-neutral-200/50 rounded-[18px] transition-colors duration-300 hover:border-[#FFC107]/30">
              <div className="text-left">
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email</span>
                <span className="text-sm font-bold text-neutral-800 break-all select-all">{emailVal}</span>
              </div>
              <button
                onClick={() => copyField(emailVal, triggerToast.bind(null, setCopiedEmail))}
                className="self-end sm:self-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                {copiedEmail ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <p className="border-t border-[#FFC107]/20 pt-3 text-left text-xs leading-relaxed text-[#6B550B]">
              Use these credentials to explore all ERP features without creating an account.
            </p>

            {/* Password Field */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-neutral-50 border border-neutral-200/50 rounded-[18px] transition-colors duration-300 hover:border-[#FFC107]/30">
              <div className="text-left">
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Password</span>
                <span className="text-sm font-bold text-neutral-800 select-all">{passwordVal}</span>
              </div>
              <button
                onClick={() => copyField(passwordVal, triggerToast.bind(null, setCopiedPassword))}
                className="self-end sm:self-center px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                {copiedPassword ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
                <span>{copiedPassword ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-left">
              Features Available
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {[
                "Dashboard",
                "Member Management",
                "Attendance",
                "Billing & Invoicing",
                "Personal Training",
                "Reports",
                "Analytics",
                "QR Check-in"
              ].map((feat) => (
                <motion.div
                  key={feat}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-center gap-2.5 py-2 px-3.5 bg-white border border-black/[0.03] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                >
                  <div className="flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#FFC107]/10 flex items-center justify-center">
                    <span className="text-[#B78A00] font-bold text-[9px]">✔</span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-700">{feat}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notice Panel */}
          <div className="p-4 bg-yellow-50 border border-yellow-200/80 rounded-[20px] text-[11px] text-yellow-800 leading-relaxed font-semibold text-left space-y-2">
            <div className="flex gap-2.5">
              <ShieldAlert size={14} className="text-yellow-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-extrabold text-yellow-900 uppercase tracking-wider text-[10px]">Notice</p>
                <p>This is a public demonstration account.</p>
                <p>Data may reset periodically.</p>
                <p>Please do not change important demo information.</p>
              </div>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={copyBoth}
              className="flex-1 py-3.5 px-6 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-50 border border-[#ECECEC] text-[#111111] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Copy size={13} />
              <span>Copy Credentials</span>
            </button>

            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex-1 py-3.5 px-6 rounded-full text-center text-xs font-bold uppercase tracking-wider bg-[#FFC107] hover:bg-[#e0a800] text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_10px_20px_rgba(255,193,7,0.15)] active:scale-[0.98] cursor-pointer"
            >
              <span>Open Live Demo</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {(copiedAll || copiedEmail || copiedPassword) && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 bg-[#111111] text-white rounded-full flex items-center gap-2 border border-white/10 shadow-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            <Check size={14} className="text-[#FFC107]" />
            <span>Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
