"use client";
import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function StickyCTABar({ onClick }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset on route change
    setDismissed(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const onScroll = () => {
      // Show after scrolling past 80% of viewport height
      setShow(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!show || dismissed || pathname.startsWith("/admin")) return null;

  return (
    <div className="sticky-cta-bar grid grid-cols-[1fr_auto_auto] items-center gap-3 max-w-3xl mx-auto" data-testid="sticky-cta-bar">
      <div className="flex items-center gap-3 min-w-0">
        <span className="sticker hidden sm:inline-flex"><Sparkles size={11} /> Free</span>
        <div className="min-w-0">
          <p className="text-white font-medium truncate text-sm sm:text-base">Get your marketplace conversion score in 24h.</p>
          <p className="text-zinc-400 text-xs hidden sm:block">No obligation. Trusted by 80+ D2C brands.</p>
        </div>
      </div>
      <button onClick={onClick} className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap" data-testid="sticky-cta-btn">
        Book Audit <ArrowRight size={14} />
      </button>
      <button onClick={() => setDismissed(true)} className="text-zinc-500 hover:text-white p-1" aria-label="Dismiss" data-testid="sticky-cta-close">
        <X size={16} />
      </button>
    </div>
  );
}
