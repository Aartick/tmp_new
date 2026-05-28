import Marquee from "react-fast-marquee";
import { BRANDS, MARKETPLACES } from "../data";

// Marketplace logos strip — dark themed
export function MarketplaceStrip() {
  return (
    <section className="border-y border-[#1a1a1a] bg-[#0a0a0a] py-8 overflow-hidden" data-testid="marketplace-strip">
      <Marquee gradient gradientColor="#0a0a0a" gradientWidth={120} speed={45} pauseOnHover>
        {[...MARKETPLACES, ...MARKETPLACES, ...MARKETPLACES].map((m, i) => (
          <div key={i} className="flex items-center gap-3 mx-12 opacity-60 hover:opacity-100 transition">
            <img src={m.logo} alt={m.name} className="h-8 w-auto object-contain" style={{ maxWidth: 130, filter: "brightness(1.15) contrast(0.9)" }} />
            <span className="hidden md:inline mono text-xs tracking-[0.18em] uppercase text-zinc-500">{m.name}</span>
          </div>
        ))}
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
  return (
    <section className="brand-marquee-wrap relative overflow-hidden" data-testid="brand-marquee-section">
      {title && (
        <div className="container-tmp mb-10">
          <p className="tmp-label">Brands That Trust Us</p>
          <h2 className="mt-2 text-white text-3xl md:text-5xl font-medium tracking-[-0.03em]">A roster built on results.</h2>
        </div>
      )}
      <Marquee gradient gradientColor="#0a0a0a" gradientWidth={100} speed={45} pauseOnHover>
        {BRANDS.map((b, i) => (
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
        {BRANDS.slice().reverse().map((b, i) => (
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
