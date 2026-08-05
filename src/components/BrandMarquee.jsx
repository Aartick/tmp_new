"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { BRANDS, MARKETPLACES } from "../data";

// Marketplace logos strip — dark themed
export function MarketplaceStrip() {
  return (
    <section className="border-y border-[#1a1a1a] bg-[#0a0a0a] py-8 overflow-hidden" data-testid="marketplace-strip">
      <Marquee gradient gradientColor="#0a0a0a" gradientWidth={120} speed={45} pauseOnHover>
        {[...MARKETPLACES, ...MARKETPLACES, ...MARKETPLACES].map((m, i) => {
          const heightClass = {
            Flipkart: "h-10",
            Instamart: "h-11",
            Blinkit: "h-[34px]",
            Amazon: "h-7",
            Myntra: "h-9",
            Nykaa: "h-9",
            Zepto: "h-7"
          }[m.name] || "h-7";

          return (
            <div 
              key={i} 
              className="group flex items-center gap-4 mx-12 cursor-pointer"
            >
              <img 
                src={m.logo} 
                alt={m.name} 
                className={`${heightClass} w-auto object-contain filter grayscale brightness-[2.2] contrast-[0.85] opacity-60 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:opacity-100 transition duration-300`} 
                style={{ maxWidth: 120 }} 
              />
              <span className="hidden md:inline mono text-xs tracking-[0.18em] uppercase text-zinc-500 group-hover:text-white transition duration-300">
                {m.name}
              </span>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}

// Revenue ticker — proof of real client revenue
export function RevenueTicker() {
  const items = [
    { val: "₹3.08 Cr / mo", brand: "Naturaltein" },
    { val: "+260% growth", brand: "Woolah Tea" },
    { val: "₹1.5 Cr+", brand: "Phitku" },
    { val: "11.5× ROAS peak", brand: "Naturaltein" },
    { val: "28× growth", brand: "Nutrispray" },
    { val: "₹200Cr+ GMV", brand: "TMP portfolio" },
    { val: "3 marketplaces", brand: "HealthAid" },
    { val: "80+ brands", brand: "scaled" },
  ];
  return (
    <section className="revenue-ticker" data-testid="revenue-ticker">
      <Marquee gradient gradientColor="#050505" gradientWidth={60} speed={38} pauseOnHover>
        {[...items, ...items].map((i, idx) => (
          <span key={idx} className="ticker-chip">
            <span className="dot" />
            <span className="text-white font-medium">{i.val}</span>
            <span className="text-zinc-500">/ {i.brand}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export default function BrandMarquee({ title = true }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await axios.get("/api/brands");
        if (res.data && res.data.brands && res.data.brands.length > 0) {
          setBrands(res.data.brands);
        } else {
          setBrands(BRANDS);
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
        setBrands(BRANDS);
      }
    }
    fetchBrands();
  }, []);

  return (
    <section className="brand-marquee-wrap relative overflow-hidden" data-testid="brand-marquee-section">
      {title && (
        <div className="container-tmp mb-10">
          <p className="tmp-label">Brands That Trust Us</p>
          <h2 className="mt-2 text-white text-3xl md:text-5xl font-medium tracking-[-0.03em]">A roster built on results.</h2>
        </div>
      )}
      <Marquee gradient gradientColor="#0a0a0a" gradientWidth={100} speed={45} pauseOnHover>
        {brands.map((b, i) => (
          b.logo ? (
            <div key={i} className="brand-logo-tile" title={b.name}>
              <img src={b.logo} alt={b.name} loading="lazy" />
            </div>
          ) : (
            <div key={i} className="brand-chip">{b.name}</div>
          )
        ))}
      </Marquee>
      <Marquee gradient gradientColor="#0a0a0a" gradientWidth={100} speed={38} direction="right" pauseOnHover className="mt-4">
        {brands.slice().reverse().map((b, i) => (
          b.logo ? (
            <div key={i} className="brand-logo-tile" title={b.name}>
              <img src={b.logo} alt={b.name} loading="lazy" />
            </div>
          ) : (
            <div key={i} className="brand-chip">{b.name}</div>
          )
        ))}
      </Marquee>
    </section>
  );
}
