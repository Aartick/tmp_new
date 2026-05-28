import { useEffect, useRef, useState } from "react";

// Animated count-up number on viewport entry
export default function CountUp({ value, duration = 1400, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const startedRef = useRef(false);

  // Parse numeric portion from value (handles "₹400Cr+", "6–11.5×", "80+", etc.)
  const numMatch = String(value).match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : null;
  const before = numMatch ? value.slice(0, numMatch.index) : "";
  const after = numMatch ? value.slice(numMatch.index + numMatch[0].length) : "";
  const isFloat = num != null && String(num).includes(".");

  useEffect(() => {
    if (num == null) { setDisplay(String(value)); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = num * eased;
          setDisplay(`${before}${isFloat ? cur.toFixed(1) : Math.round(cur)}${after}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num, value, duration, before, after, isFloat]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}
