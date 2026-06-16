"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const scaleX = useSpring(0, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      scaleX.set(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scaleX]);

  return (
    <motion.div
      ref={progressRef}
      className="scroll-progress"
      style={{ scaleX, width: "100%" }}
    />
  );
}
