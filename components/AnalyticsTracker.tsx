"use client";

import { useEffect, useRef } from "react";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    let vid = localStorage.getItem("rx_visitor_id");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem("rx_visitor_id", vid);
    }
    return vid;
  } catch {
    return "v_guest";
  }
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "sess";
  try {
    let sid = sessionStorage.getItem("rx_session_id");
    if (!sid) {
      sid = "s_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      sessionStorage.setItem("rx_session_id", sid);
    }
    return sid;
  } catch {
    return "s_guest";
  }
}

export default function AnalyticsTracker() {
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    const trackPageView = () => {
      const currentPath = window.location.pathname;
      if (lastTrackedPath.current === currentPath) return;
      lastTrackedPath.current = currentPath;

      const payload = {
        visitorId: getOrCreateVisitorId(),
        sessionId: getOrCreateSessionId(),
        pagePath: currentPath,
        pageTitle: document.title || "REDIX.MEDIA",
        referrer: document.referrer || "Direct",
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || "en",
      };

      try {
        const bodyStr = JSON.stringify(payload);
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/analytics/track", new Blob([bodyStr], { type: "application/json" }));
        } else {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyStr,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Non-blocking telemetry
      }
    };

    // Track on initial load
    trackPageView();

    // Listen to popstate for SPA navigation
    window.addEventListener("popstate", trackPageView);
    return () => {
      window.removeEventListener("popstate", trackPageView);
    };
  }, []);

  return null;
}
