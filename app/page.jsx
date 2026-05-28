"use client";
import { useAudit } from './AuditContext';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Linkedin, Plus, Minus, Quote,
  Zap, Shield, Target,
  Rocket, Megaphone, Search, Star, LayoutDashboard, Palette,
  TrendingUp, Users, BarChart3, Sparkles, MessageSquareHeart, Layers,
} from "lucide-react";
import { METRICS, FRAMEWORK, SERVICES, TESTIMONIALS, WHY_US, FOUNDERS, FOUNDER_MESSAGE, CASE_STUDIES, FAQS, ECOSYSTEM } from "../src/data";
import BrandMarquee, { MarketplaceStrip, RevenueTicker } from "../src/components/BrandMarquee";
import InlineLeadForm from "../src/components/InlineLeadForm";
import MarketplaceScore from "../src/components/MarketplaceScore";
import CountUp from "../src/components/CountUp";

const pillarClass = (p) => p === "ACQUIRE" ? "pillar-acquire" : p === "CONVERT" ? "pillar-convert" : "pillar-scale";

const SERVICE_ICONS = {
  Rocket, Megaphone, Search, Star, LayoutDashboard, Palette,
};

// Icons for the ecosystem sub-items (9 total)
const ECOSYSTEM_ICONS = {
  "Marketplace Management": LayoutDashboard,
  "Performance Marketing": TrendingUp,
  "Social Media": Users,
  "Design & Asset Creation": Palette,
  "Influencer Marketing & UGC": MessageSquareHeart,
  "Ratings & Reviews": Star,
  "Marketplace Operations": Layers,
  "Brand Expansion": Rocket,
  "Analytics & Reporting": BarChart3,
};

function FAQItem({ q, a, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border-b border-[#1a1a1a]" data-testid={`faq-${idx}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group gap-4">
        <span className="text-base lg:text-lg font-medium tracking-tight text-white group-hover:text-[#FF5A1F] transition">{q}</span>
        {open ? <Minus size={18} className="text-[#FF5A1F] flex-shrink-0" /> : <Plus size={18} className="text-zinc-500 group-hover:text-[#FF5A1F] flex-shrink-0" />}
      </button>
      {open && <p className="pb-6 text-zinc-400 max-w-2xl leading-relaxed">{a}</p>}
    </div>
  );
}

const WHY_ICONS = [Target, Zap, Shield];

export default function Home() {
  const { openAudit } = useAudit();
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="container-tmp relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="accent-line"></span>
                <p className="mono text-[11px] tracking-[0.22em] uppercase text-zinc-400">Marketplace Growth Agency · India</p>
              </div>
              <h1 className="text-[40px] sm:text-[56px] lg:text-[76px] leading-[1.0] tracking-[-0.04em] font-medium text-white">
                Not Just Management.<br />
                <span className="italic font-normal text-zinc-200">Marketplace</span>{" "}
                <span className="text-[#FF5A1F]" style={{ textShadow: "0 0 60px rgba(255,90,31,0.4)" }}>Domination.</span>
              </h1>
              <p className="mt-5 text-xl lg:text-2xl text-zinc-300 max-w-2xl font-medium tracking-tight">
                Where Marketplace Strategy Meets Performance.
              </p>
              <p className="mt-5 text-base lg:text-lg text-zinc-400 max-w-2xl">
                We scale brands across Amazon, Flipkart, and quick-commerce platforms through performance marketing, marketplace operations, optimized listings, and conversion-focused growth strategies.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={openAudit} className="btn-primary pulse-glow" data-testid="hero-cta-audit">
                  Book a Free Audit <ArrowRight size={16} />
                </button>
                <Link href="/services" className="btn-ghost" data-testid="hero-cta-services">Explore Services <ArrowUpRight size={16} /></Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <div className="flex -space-x-2">
                  {FOUNDERS.map((f, i) => (
                    <img key={i} src={f.image} alt={f.name} className="w-9 h-9 rounded-full object-cover border-2 border-[#050505]" />
                  ))}
                  <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border-2 border-[#050505] grid place-items-center text-[10px] text-[#FF5A1F] font-bold">+80</div>
                </div>
                <div>
                  <p className="text-sm text-white">Trusted by 80+ D2C brands</p>
                  <p className="text-xs text-zinc-500">₹200Cr+ marketplace GMV scaled · ROAS 6–11.5×</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-5">
              <InlineLeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      <MarketplaceStrip />
      <RevenueTicker />

      {/* VALUE PROP */}
      <section className="py-24 lg:py-32 relative" data-testid="value-prop-section">
        <div className="container-tmp grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="tmp-label">Our Mission</p>
            <h2 className="mt-3 text-4xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
              We turn marketplace listings into <span className="text-[#FF5A1F]">revenue machines.</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400 max-w-xl">
              "If your listings aren't converting, we fix the system — not just the ads." Most agencies manage. We drive measurable growth.
            </p>
            <p className="mt-3 text-zinc-400 max-w-xl">
              With <strong className="text-white">10+ years</strong> across Amazon and Flipkart, we identify what's broken, fix what's leaking revenue, and scale what's working. From listings to ads to creatives — we handle the full growth engine.
            </p>
            <button onClick={openAudit} className="btn-primary mt-8" data-testid="value-cta">Book a Free Audit <ArrowRight size={16} /></button>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {METRICS.map((m, i) => (
              <div key={i} className="metric-tile p-5 lg:p-6 border border-[#1a1a1a] rounded-2xl bg-[#0a0a0a] overflow-hidden">
                <p className="stat-num stat-num-accent text-[34px] lg:text-[44px]"><CountUp value={m.value} /></p>
                <p className="tmp-label mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION I — SERVICES (6 cards) */}
      <section className="py-24 lg:py-32 border-y border-[#1a1a1a] relative" data-testid="services-overview-section">
        <div className="container-tmp">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="tmp-label">Services</p>
              <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
                How we can help you <span className="italic font-normal text-[#FF5A1F]">grow.</span>
              </h2>
              <p className="mt-4 text-lg text-zinc-400">Click any service to see deliverables, platforms, and proof.</p>
            </div>
            <Link href="/services" className="link-underline text-sm font-medium text-zinc-300">All Services →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => {
              const Ic = SERVICE_ICONS[s.iconName] || Rocket;
              return (
                <Link href={`/services/${s.slug}`} key={s.slug} className="tmp-card flex flex-col" data-testid={`service-card-${s.slug}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 grid place-items-center rounded-xl bg-[#FF5A1F]/12 text-[#FF5A1F] border border-[#FF5A1F]/20">
                      <Ic size={20} />
                    </div>
                    <span className="mono text-xs text-zinc-500 tracking-[0.22em]">0{i+1}</span>
                  </div>
                  <span className={`pillar-tag ${pillarClass(s.pillar)} self-start`}>{s.pillar}</span>
                  <p className="mt-4 text-xl font-medium tracking-tight text-white">{s.name}</p>
                  <p className="mt-2 text-sm text-zinc-400 flex-1">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-[#FF5A1F] link-underline">Learn more <ArrowUpRight size={13} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 STEP FRAMEWORK */}
      <section className="py-24 lg:py-32" data-testid="framework-section">
        <div className="container-tmp">
          <div className="max-w-3xl">
            <p className="tmp-label">How We Work</p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] text-white">
              Our proven 3-step framework to increase sales & visibility.
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              A structured, data-driven approach used to optimize, scale and dominate your marketplace presence.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {FRAMEWORK.map((f) => (
              <div key={f.step} className="border-t-2 border-[#FF5A1F] pt-6">
                <p className="mono text-sm text-[#FF5A1F]">{f.step}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{f.title}</h3>
                <p className="mt-3 text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="tag-pill">Start in days, not weeks</span>
            <span className="tag-pill">No long-term contracts</span>
            <span className="tag-pill">100% transparent execution</span>
          </div>
        </div>
      </section>

      {/* MARKETPLACE SCORE QUIZ */}
      <section className="py-24 lg:py-32 border-y border-[#1a1a1a] bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505] relative overflow-hidden" data-testid="score-section">
        <div className="hero-glow-2" style={{ left: "auto", right: "-150px", top: "30%" }}></div>
        <div className="container-tmp relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="sticker"><Zap size={11} /> 60-Second Quiz</span>
            <h2 className="mt-4 text-4xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.05]">
              What's your <span className="text-[#FF5A1F]">Marketplace Score?</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-400 max-w-xl">
              Answer 4 quick questions and we'll calculate exactly how much revenue you're leaving on the table — and where.
            </p>
            <div className="mt-8 space-y-3 max-w-md">
              {[
                "See your performance vs category leaders",
                "Identify the #1 leak in your funnel",
                "Get a personalized PDF roadmap",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle2 size={18} className="text-[#FF5A1F] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs mono tracking-[0.18em] uppercase text-zinc-500">No spam · Score in your inbox · Built by operators</p>
          </div>
          <div className="lg:col-span-6">
            <MarketplaceScore />
          </div>
        </div>
      </section>

      {/* SECTION II — ECOSYSTEM (9 sub-items in 3 columns) */}
      <section className="py-24 lg:py-32" data-testid="ecosystem-section">
        <div className="container-tmp">
          <div className="max-w-3xl">
            <p className="tmp-label">Our Ecosystem</p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
              How we turn products into <span className="text-[#FF5A1F]">category leaders.</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-400">
              A performance-driven ecosystem designed to increase visibility, conversions and revenue across every touchpoint.
            </p>
          </div>

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {ECOSYSTEM.map((col) => (
              <div key={col.pillar} className="border border-[#1a1a1a] bg-[#0a0a0a] rounded-2xl p-7 hover:border-[#FF5A1F]/30 transition">
                <div className="flex items-center justify-between mb-6">
                  <span className={`pillar-tag ${pillarClass(col.pillar)}`}>{col.pillar}</span>
                  <span className="mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase">{col.subtitle}</span>
                </div>
                <div className="space-y-5">
                  {col.items.map((it) => {
                    const Ic = ECOSYSTEM_ICONS[it.name] || Sparkles;
                    return (
                      <div key={it.name} className="flex items-start gap-3 group">
                        <div className="w-9 h-9 grid place-items-center rounded-lg bg-[#FF5A1F]/10 text-[#FF5A1F] flex-shrink-0 group-hover:bg-[#FF5A1F]/20 transition">
                          <Ic size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-medium tracking-tight text-white">{it.name}</p>
                          <p className="text-sm text-zinc-400 mt-0.5">{it.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-[#1a1a1a] rounded-2xl bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#FF5A1F]/5 p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">Why This Matters</p>
              <p className="mt-3 text-2xl lg:text-3xl font-medium tracking-tight text-white">
                Most marketplace brands lose 30–40% of potential revenue to poor listings, unoptimized ads, and broken review systems. We fix all three.
              </p>
              <p className="mt-4 mono text-[12px] tracking-[0.15em] uppercase text-zinc-500">Traffic → Conversion → Retention → Scale</p>
            </div>
            <button onClick={openAudit} className="btn-primary self-start">Audit My Account <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* CASE STUDIES PEEK */}
      <section className="py-24 lg:py-32 border-y border-[#1a1a1a]" data-testid="cases-peek-section">
        <div className="container-tmp">
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <p className="tmp-label">Client Results</p>
              <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] text-white">Efficient scaling with strong returns.</h2>
            </div>
            <Link href="/case-studies" className="hidden md:inline-flex items-center gap-1 link-underline text-sm font-medium text-zinc-300 whitespace-nowrap">All case studies <ArrowUpRight size={14} /></Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {CASE_STUDIES.slice(0,3).map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="tmp-card flex flex-col" data-testid={`case-card-${c.slug}`}>
                {c.flagship && <span className="sticker self-start mb-3">Flagship</span>}
                <p className="text-2xl font-medium tracking-tight text-white">{c.brand}</p>
                <p className="mt-1 mono text-xs uppercase tracking-[0.18em] text-zinc-500">{c.category}</p>
                <p className="mt-4 text-lg text-white font-medium flex-1">{c.headline}</p>
                <p className="mt-2 text-sm text-zinc-400">{c.sub}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-[#FF5A1F] link-underline">Read case study <ArrowUpRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandMarquee />

      {/* LEADERSHIP */}
      <section className="py-24 lg:py-32" data-testid="leadership-section">
        <div className="container-tmp">
          <p className="tmp-label">Our Leadership</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] max-w-3xl text-white">
            Meet the minds scaling <span className="text-[#FF5A1F]">marketplace brands.</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">A team of marketplace specialists focused on driving real, measurable growth.</p>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="tmp-card" data-testid={`founder-${f.shortName.toLowerCase()}`}>
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-full overflow-hidden flex-shrink-0 border border-[#27272a]">
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-medium tracking-tight text-white">{f.name}</h3>
                    <p className="text-sm text-zinc-500">{f.role}</p>
                    <p className="text-sm text-[#FF5A1F] mt-1">{f.tagline}</p>
                  </div>
                </div>
                <div className="mt-6 border-l-2 border-[#FF5A1F] pl-4">
                  <Quote size={16} className="text-[#FF5A1F]" />
                  <p className="mt-2 text-lg font-medium tracking-tight text-white italic">"{f.quote}"</p>
                </div>
                <p className="mt-5 text-zinc-400 text-sm">{f.bio}</p>
                <a href={f.linkedin} target="_blank" rel="noreferrer" className="btn-outline mt-6 text-sm" data-testid={`linkedin-${f.shortName.toLowerCase()}`}>
                  <Linkedin size={14} /> Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-[#FF5A1F]/30 bg-gradient-to-br from-[#FF5A1F]/10 to-transparent rounded-2xl p-10">
            <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">A Note From The Founders</p>
            <p className="mt-4 text-2xl lg:text-3xl font-medium tracking-tight leading-snug text-white">
              "{FOUNDER_MESSAGE.body}"
            </p>
            <p className="mt-3 text-lg font-medium text-[#FF5A1F]">{FOUNDER_MESSAGE.emphasis}</p>
            <p className="mt-4 text-sm text-zinc-400">— Himanshu Singh Bhandari & Divya Chaturvedi</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 lg:py-32 border-y border-[#1a1a1a]" data-testid="why-us-section">
        <div className="container-tmp">
          <p className="tmp-label">Why Brands Choose Us</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] max-w-3xl text-white">
            These are the people who can scale your business — and here's proof.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {WHY_US.map((w, i) => {
              const Ic = WHY_ICONS[i];
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

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32" data-testid="testimonials-section">
        <div className="container-tmp">
          <p className="tmp-label">Clients · Founders speak</p>
          <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] max-w-3xl text-white">
            What founders say.
          </h2>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="tmp-card" data-testid={`testimonial-${i}`}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="mono text-[10px] tracking-[0.22em] text-[#FF5A1F] uppercase">{t.metric}</span>
                  <span className="mono text-[10px] tracking-[0.22em] text-zinc-300 uppercase border border-[#1a1a1a] px-2 py-1 rounded">{t.brand}</span>
                </div>
                <p className="mt-4 text-lg text-zinc-200 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
                  <p className="font-medium text-white">{t.person}</p>
                  <p className="text-sm text-zinc-500">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 border-y border-[#1a1a1a]" data-testid="faq-section">
        <div className="container-tmp grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="tmp-label">Questions</p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-white">Frequently asked questions.</h2>
            <p className="mt-5 text-zinc-400">Still have a question? Drop us a note — we reply within a business day.</p>
            <Link href="/contact" className="btn-outline mt-6 text-sm">Talk to us <ArrowUpRight size={14} /></Link>
          </div>
          <div className="lg:col-span-8 border-t border-[#1a1a1a]">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} idx={i} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden" data-testid="final-cta-section">
        <div className="hero-glow" style={{ top: "auto", bottom: "-200px", right: "auto", left: "-200px" }}></div>
        <div className="absolute inset-0 grain"></div>
        <div className="container-tmp relative z-10">
          <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">Stop Guessing. Start Scaling.</p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] max-w-4xl text-white">
            Ready to scale your <span className="text-[#FF5A1F]" style={{ textShadow: "0 0 60px rgba(255,90,31,0.5)" }}>marketplace revenue?</span>
          </h2>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl">
            In a 30-minute call, we'll audit your marketplace, identify growth leaks and show you exactly how to scale. No pressure. No obligation. Just clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={openAudit} className="btn-primary pulse-glow" data-testid="final-cta-audit">Book a Free Audit <ArrowRight size={16} /></button>
            <Link href="/case-studies" className="btn-ghost">Not ready? Explore case studies <ArrowUpRight size={14} /></Link>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
            {METRICS.slice(0,3).map((m, i) => (
              <div key={i}>
                <p className="stat-num text-4xl lg:text-5xl"><CountUp value={m.value} /></p>
                <p className="tmp-label mt-2">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
