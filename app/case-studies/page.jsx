"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Target, Award, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { CASE_STUDIES, NATURALTEIN_DATA, TESTIMONIALS } from "../../src/data";

export default function CaseStudiesList() {
  return (
    <div className="pt-28 lg:pt-32" data-testid="cases-page">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <p className="tmp-label">Case Studies</p>
          <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] max-w-4xl text-white">
            We don't guess. <span className="italic font-normal text-[#FF5A1F]">We prove.</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-zinc-400 max-w-2xl">
            Real revenue. Real numbers. Real brands who scaled with disciplined marketplace execution.
          </p>
        </div>
      </section>

      <section className="pb-24 border-t border-[#1a1a1a] pt-16">
        <div className="container-tmp grid lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="tmp-card flex flex-col" data-testid={`case-${c.slug}`}>
              {c.flagship ? (
                <span className="sticker self-start mb-4">Flagship</span>
              ) : (
                <span className="mono text-[10px] tracking-[0.18em] uppercase text-zinc-500 mb-4">{c.category}</span>
              )}
              <h3 className="text-3xl font-medium tracking-tight text-white">{c.brand}</h3>
              <p className="mt-2 text-sm mono uppercase tracking-[0.18em] text-zinc-500">{c.category}</p>
              <p className="mt-5 text-lg text-white font-medium flex-1">{c.headline}</p>
              <p className="mt-2 text-sm text-zinc-400">{c.sub}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm text-[#FF5A1F] link-underline">Read case study <ArrowUpRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function NaturalteinCase() {
  const peak = Math.max(...NATURALTEIN_DATA.map(d => d.revenue));
  return (
    <div className="pt-28 lg:pt-32" data-testid="case-naturaltein">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <Link href="/case-studies" className="text-sm text-zinc-500 hover:text-[#FF5A1F]">← All case studies</Link>
          <span className="sticker mt-6 inline-flex">Flagship · Amazon India</span>
          <h1 className="mt-4 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] text-white">
            Naturaltein × <span className="text-[#FF5A1F]">TMP</span>
          </h1>
          <p className="mt-5 text-2xl lg:text-3xl font-medium text-zinc-200 max-w-3xl tracking-tight">
            From <span className="text-[#FF5A1F]">₹80 Lakhs</span> to <span className="text-[#FF5A1F]">₹3+ Crores</span> per month — organically.
          </p>
          <p className="mt-4 text-lg text-zinc-400 max-w-3xl">
            How Naturaltein scaled <strong className="text-white">3.8×</strong> on Amazon India in 14 months with disciplined ad management, catalog quality and operational execution — not unbounded spend.
          </p>
        </div>
      </section>

      <section className="py-12 border-y border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="container-tmp grid md:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, num: "3.8×", label: "Revenue Growth" },
            { icon: Target, num: "₹3+ Cr", label: "Peak Monthly Revenue" },
            { icon: Award, num: "6–11.5×", label: "Sustained ROAS" },
            { icon: Clock, num: "14 mo", label: "Timeline" },
          ].map((m, i) => (
            <div key={i} className="metric-tile">
              <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#FF5A1F]/15 text-[#FF5A1F]"><m.icon size={18} /></div>
              <p className="mt-4 stat-num stat-num-accent text-5xl">{m.num}</p>
              <p className="tmp-label mt-2">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-tmp">
          <p className="tmp-label">Monthly Revenue · ₹ in Lakhs</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight text-white">14 months. One trajectory.</h2>
          <div className="mt-8 h-[420px] bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={NATURALTEIN_DATA}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF5A1F" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#FF5A1F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1a1a1a" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, color: "white" }} formatter={(v) => [`₹${v}L`, "Revenue"]} />
                <ReferenceLine y={200} stroke="#52525b" strokeDasharray="3 3" label={{ value: "₹2Cr threshold", fill: "#71717a", fontSize: 10, position: "right" }} />
                <Area type="monotone" dataKey="revenue" stroke="#FF5A1F" strokeWidth={2.5} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Peak: ₹{peak.toFixed(0)}L · March 2026 · 3.8× engagement-start baseline</p>
        </div>
      </section>

      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="container-tmp grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="tmp-label">The Challenge</p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight text-white">Scaling without sacrificing efficiency.</h2>
            <p className="mt-5 text-zinc-300 leading-relaxed">
              Naturaltein had strong products and brand identity, but the infrastructure to scale profitably on Amazon was underdeveloped. The challenge wasn't growth at any cost — it was sustainable, margin-conscious growth in one of the most competitive categories on the platform.
            </p>
            <ul className="mt-6 space-y-3 text-zinc-300">
              <li>• Scaling without proportional ad spend increase</li>
              <li>• Catalog fragmentation and inconsistent A+ content</li>
              <li>• Reactive operations causing stockouts and wasted spend</li>
              <li>• Maintaining strong ROAS while growing total ad volume</li>
              <li>• Intense category competition with heavy D2C entrants</li>
              <li>• Conversion rate gaps despite strong traffic</li>
            </ul>
          </div>
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FF5A1F]/10 to-transparent border border-[#FF5A1F]/30 rounded-2xl p-8">
            <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">Brand Snapshot</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-zinc-500">Category</dt><dd className="font-medium text-white">Protein & Supplements</dd></div>
              <div><dt className="text-zinc-500">Primary Channel</dt><dd className="font-medium text-white">Amazon India</dd></div>
              <div><dt className="text-zinc-500">Engagement Start</dt><dd className="font-medium text-white">February 2025</dd></div>
              <div><dt className="text-zinc-500">Baseline Revenue</dt><dd className="font-medium text-white">~₹80 Lakhs/month</dd></div>
              <div><dt className="text-zinc-500">Peak Revenue</dt><dd className="font-medium text-[#FF5A1F]">₹3+ Crores/month</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-tmp">
          <p className="tmp-label">Our Approach</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight max-w-3xl text-white">A full-stack marketplace growth approach — no single lever.</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { t: "Amazon Marketplace Scaling", d: "Structured account architecture, seller health management, platform-specific growth planning." },
              { t: "Ad Optimisation & ROAS", d: "Keyword harvesting, negative match discipline, bid strategy by funnel stage — ROAS held at 6–11.5×." },
              { t: "Catalog & Listing Hygiene", d: "Systematic audit and reoptimisation of titles, bullets, backend search terms and category placement." },
              { t: "A+ Content & Conversion", d: "Rebuilt A+ modules and brand storefront to improve conversion rate and reduce bounce." },
              { t: "Inventory Planning", d: "Forecasting models aligned with demand trends, promotional cycles and seasonality — reducing stockouts." },
              { t: "Profitable SKU Scaling", d: "Concentrated spend on highest-leverage SKUs by contribution margin and organic rank velocity." },
            ].map((x, i) => (
              <div key={i} className="tmp-card">
                <p className="mono text-xs text-[#FF5A1F]">0{i+1}</p>
                <p className="mt-2 font-medium text-lg text-white">{x.t}</p>
                <p className="mt-2 text-sm text-zinc-400">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-tmp">
          <p className="tmp-label">Detailed Monthly Data</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight text-white">The receipts.</h2>
          <div className="mt-8 overflow-x-auto border border-[#1a1a1a] rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-[#0a0a0a] text-zinc-300 mono text-xs uppercase tracking-[0.18em]">
                <tr>
                  <th className="text-left py-4 px-4">Month</th>
                  <th className="text-right py-4 px-4">Total Revenue (₹)</th>
                  <th className="text-right py-4 px-4">Ad Spend (₹)</th>
                  <th className="text-right py-4 px-4">Ad Sales (₹)</th>
                  <th className="text-right py-4 px-4">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {NATURALTEIN_DATA.map((r, i) => {
                  const highlight = r.revenue >= 200;
                  return (
                    <tr key={i} className={`border-t border-[#1a1a1a] ${highlight ? "bg-[#FF5A1F]/5" : ""}`}>
                      <td className="py-3 px-4 font-medium text-white">{r.month}</td>
                      <td className="py-3 px-4 text-right tabular-nums text-zinc-300">{(r.revenue * 100000).toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4 text-right tabular-nums text-zinc-300">{(r.adSpend * 100000).toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4 text-right tabular-nums text-zinc-300">{(r.adSales * 100000).toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4 text-right tabular-nums font-medium text-[#FF5A1F]">{r.roas}×</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">Highlighted rows: months exceeding ₹2 Cr in revenue · All figures rounded.</p>
        </div>
      </section>

      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-tmp max-w-4xl">
          <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">In the founder's words</p>
          <p className="mt-6 text-2xl lg:text-3xl leading-snug font-medium tracking-tight text-white">
            "{TESTIMONIALS[0].quote}"
          </p>
          <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
            <p className="font-medium text-white">{TESTIMONIALS[0].person}</p>
            <p className="text-sm text-zinc-500">{TESTIMONIALS[0].title}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function GenericCase({ slug }) {
  const c = CASE_STUDIES.find(x => x.slug === slug);
  const t = TESTIMONIALS.find(x => x.brand.toLowerCase().includes(c?.brand.toLowerCase().split(' ')[0] || ""));
  if (!c) return <div className="pt-32 container-tmp text-zinc-400"><p>Case not found.</p></div>;
  return (
    <div className="pt-28 lg:pt-32" data-testid={`case-${slug}`}>
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <Link href="/case-studies" className="text-sm text-zinc-500 hover:text-[#FF5A1F]">← All case studies</Link>
          <p className="mt-6 mono text-[11px] tracking-[0.22em] uppercase text-zinc-500">{c.category}</p>
          <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] text-white">{c.brand}</h1>
          <p className="mt-5 text-2xl lg:text-3xl font-medium text-zinc-200 max-w-3xl tracking-tight">{c.headline}</p>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">{c.sub}</p>
        </div>
      </section>

      {t && (
        <section className="py-20 border-y border-[#1a1a1a]">
          <div className="container-tmp max-w-4xl">
            <p className="mono text-[11px] tracking-[0.22em] uppercase text-[#FF5A1F]">{t.metric}</p>
            <p className="mt-6 text-2xl lg:text-3xl leading-snug font-medium tracking-tight text-white">"{t.quote}"</p>
            <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
              <p className="font-medium text-white">{t.person}</p>
              <p className="text-sm text-zinc-500">{t.title}</p>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container-tmp">
          <Link href="/case-studies/naturaltein" className="link-underline text-[#FF5A1F]">Want a deep-dive case study? → Read Naturaltein</Link>
        </div>
      </section>
    </div>
  );
}

