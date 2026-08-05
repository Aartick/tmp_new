"use client";
import { Linkedin, Quote, Target, Zap, Shield } from "lucide-react";
import { FOUNDERS, FOUNDER_MESSAGE, METRICS, WHY_US } from "../../src/data";
import BrandMarquee from "../../src/components/BrandMarquee";
import CountUp from "../../src/components/CountUp";

const ICONS = [Target, Zap, Shield];

export default function About() {
  return (
    <div className="pt-28 lg:pt-32" data-testid="about-page">
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="hero-glow-2"></div>
        <div className="container-tmp relative grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="tmp-label">About TMP</p>
            <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] text-white">
              Built by <span className="italic font-normal text-zinc-300">Marketplace</span> <span className="text-[#FF5A1F]">Operators.</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-zinc-400 max-w-2xl">
              The Marketplace Peeps is a marketplace growth and operations agency helping brands scale across Amazon, Flipkart, and emerging ecommerce ecosystems through performance-driven strategies, operational excellence, and conversion-focused execution.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {METRICS.map((m, i) => (
              <div key={i} className="metric-tile p-5 border border-[#1a1a1a] rounded-2xl bg-[#0a0a0a] overflow-hidden">
                <p className="stat-num stat-num-accent text-[34px] lg:text-[40px]"><CountUp value={m.value} /></p>
                <p className="tmp-label mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="container-tmp">
          <p className="tmp-label">Our Leadership</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] max-w-3xl text-white">
            Meet the minds scaling marketplace brands.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="tmp-card">
                <div className="flex items-start gap-5">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-[#1a1a1a] border border-[#27272a]">
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-medium tracking-tight text-white">{f.name}</h3>
                    <p className="text-sm text-zinc-500">{f.role}</p>
                  </div>
                </div>
                <div className="mt-6 border-l-2 border-[#FF5A1F] pl-4">
                  <Quote size={16} className="text-[#FF5A1F]" />
                  <p className="mt-2 text-lg font-medium tracking-tight text-white italic">"{f.quote}"</p>
                </div>
                <p className="mt-6 text-zinc-400 text-sm">{f.bio}</p>
                <p className="mt-6 tmp-label">Expertise</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  {f.expertise.map(e => <li key={e} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF5A1F] flex-shrink-0"></span>{e}</li>)}
                </ul>
                <a href={f.linkedin} target="_blank" rel="noreferrer" className="btn-outline mt-6 text-sm">
                  <Linkedin size={14} /> Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-[#FF5A1F]/30 bg-gradient-to-br from-[#FF5A1F]/10 to-transparent rounded-2xl p-10">
            <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">A Note From The Founders</p>
            <p className="mt-5 text-2xl lg:text-3xl font-medium tracking-tight leading-snug text-white">"{FOUNDER_MESSAGE.body}"</p>
            <p className="mt-4 text-xl text-[#FF5A1F]">{FOUNDER_MESSAGE.emphasis}</p>
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="py-20">
        <div className="container-tmp">
          <p className="tmp-label">Why Brands Choose Us</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] max-w-3xl text-white">Partners, not vendors.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {WHY_US.map((w, i) => {
              const Ic = ICONS[i];
              return (
                <div key={i} className="tmp-card">
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-[#FF5A1F]/15 text-[#FF5A1F] mb-5"><Ic size={20} /></div>
                  <h3 className="text-xl font-medium tracking-tight text-white">{w.title}</h3>
                  <p className="mt-3 text-zinc-400 text-sm">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
