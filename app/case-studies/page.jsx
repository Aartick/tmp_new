import React from "react";
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Target, Award, Clock } from "lucide-react";
import { CASE_STUDIES, TESTIMONIALS } from "../../src/data";
import { getDb } from "@/lib/mongodb";
import NaturalteinChart from "@/components/NaturalteinChart";

export const metadata = {
  title: "Case Studies & Client Success Stories | The Marketplace Peeps",
  description: "Real revenue. Real numbers. Real brands who scaled with disciplined marketplace execution.",
};

export default async function CaseStudiesList() {
  let dbStudies = [];
  try {
    const db = await getDb();
    dbStudies = await db.collection("case_studies")
      .find({ published: true })
      .sort({ created_at: -1 })
      .toArray();
  } catch (err) {
    console.error("Failed to query case studies in SSR:", err);
  }

  // Combine static and dynamic studies, avoiding duplicate slugs (custom ones take precedence!)
  const allStudies = [...dbStudies];
  const dynamicSlugs = new Set(dbStudies.map(s => s.slug));
  
  CASE_STUDIES.forEach(staticStudy => {
    if (!dynamicSlugs.has(staticStudy.slug)) {
      allStudies.push({
        brand: staticStudy.brand,
        slug: staticStudy.slug,
        category: staticStudy.category,
        headline: staticStudy.headline,
        sub: staticStudy.sub,
        cover_image: staticStudy.cover || "",
        flagship: staticStudy.flagship || false,
        published: true
      });
    }
  });

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
          {allStudies.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="tmp-card flex flex-col" data-testid={`case-${c.slug}`}>
              {c.flagship ? (
                <span className="sticker self-start mb-4">Flagship</span>
              ) : (
                <span className="mono text-[10px] tracking-[0.18em] uppercase text-zinc-500 mb-4">{c.category}</span>
              )}
              <h3 className="text-3xl font-medium tracking-tight text-white">{c.brand}</h3>
              <p className="mt-2 text-sm mono uppercase tracking-[0.18em] text-zinc-500">{c.category}</p>
              <p className="mt-5 text-lg text-white font-medium flex-1">{c.headline}</p>
              <p className="mt-2 text-sm text-zinc-400">{c.sub || c.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm text-[#FF5A1F] link-underline">Read case study <ArrowUpRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export function NaturalteinCase() {
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
          <div className="mt-8">
            <NaturalteinChart />
          </div>
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

export function GenericCase({ slug, brand, category, headline, sub, cover_image, content }) {
  // Use either dynamic database variables or fallback static mapping
  const c = CASE_STUDIES.find(x => x.slug === slug);
  const displayBrand = brand || c?.brand || "Brand Case Study";
  const displayCategory = category || c?.category || "E-commerce Strategy";
  const displayHeadline = headline || c?.headline || "Proven Marketplace Scaling";
  const displaySub = sub || c?.sub || "Disciplined scaling with strong, profit-first returns.";
  const displayCover = cover_image || c?.cover || "";
  
  const t = TESTIMONIALS.find(x => x.brand.toLowerCase().includes(displayBrand.toLowerCase().split(' ')[0] || ""));

  return (
    <div className="pt-28 lg:pt-32" data-testid={`case-${slug}`}>
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <Link href="/case-studies" className="text-sm text-zinc-500 hover:text-[#FF5A1F]">← All case studies</Link>
          <p className="mt-6 mono text-[11px] tracking-[0.22em] uppercase text-zinc-500">{displayCategory}</p>
          <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] text-white">{displayBrand}</h1>
          <p className="mt-5 text-2xl lg:text-3xl font-medium text-zinc-200 max-w-3xl tracking-tight">{displayHeadline}</p>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">{displaySub}</p>
        </div>
      </section>

      {displayCover && (
        <section className="pb-10 container-tmp">
          <img src={displayCover} alt={displayBrand} className="w-full max-h-[500px] object-cover rounded-2xl border border-[#1a1a1a]" />
        </section>
      )}

      {content && (
        <section className="py-12 border-t border-[#1a1a1a]">
          <div className="container-tmp max-w-3xl text-zinc-300 leading-relaxed text-lg space-y-6">
            {content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {t && (
        <section className="py-20 border-y border-[#1a1a1a] bg-[#0a0a0a]">
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
          <Link href="/case-studies/naturaltein" className="link-underline text-[#FF5A1F] text-lg font-medium">Want a deep-dive case study? → Read Naturaltein</Link>
        </div>
      </section>
    </div>
  );
}
