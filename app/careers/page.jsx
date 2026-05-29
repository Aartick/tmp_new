import React from "react";
import { Zap, BookOpen, TrendingUp } from "lucide-react";
import { CAREERS, CAREER_CULTURE } from "../../src/data";
import { getDb } from "@/lib/mongodb";
import CareersApplicationForm from "@/components/CareersApplicationForm";

export const metadata = {
  title: "Careers at The Marketplace Peeps | Join the Team",
  description: "We're a small, high-leverage team scaling India's top D2C brands. Own outcomes, not tickets. Explore open roles and apply.",
};

const CULTURE_ICONS = [TrendingUp, BookOpen, Zap];

export default async function Careers() {
  let dbOpenings = [];
  try {
    const db = await getDb();
    dbOpenings = await db.collection("career_openings")
      .find({ published: true }, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .toArray();
  } catch (err) {
    console.error("Failed to fetch career openings in SSR:", err);
  }

  // Merge dynamic + static, dynamic takes precedence
  const allRoles = [...dbOpenings];
  const dynamicSlugs = new Set(dbOpenings.map(o => o.slug));
  CAREERS.forEach(staticRole => {
    if (!dynamicSlugs.has(staticRole.slug)) {
      allRoles.push({
        title: staticRole.title,
        slug: staticRole.slug,
        location: staticRole.location,
        type: staticRole.type,
        description: staticRole.desc,
        published: true,
      });
    }
  });

  return (
    <div className="pt-28 lg:pt-32" data-testid="careers-page">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow-2"></div>
        <div className="container-tmp relative">
          <p className="tmp-label">Careers</p>
          <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] max-w-4xl text-white">
            Build the team that scales <span className="italic font-normal text-[#FF5A1F]">India's</span> top D2C brands.
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl">
            We're a small, high-leverage team. You'll own outcomes, not tickets. Compensation reflects impact.
          </p>
        </div>
      </section>

      {/* Culture pillars */}
      <section className="py-16 border-y border-[#1a1a1a]" data-testid="culture-section">
        <div className="container-tmp">
          <p className="tmp-label">Our Culture</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white max-w-3xl">What working at TMP looks like.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {CAREER_CULTURE.map((c, i) => {
              const Ic = CULTURE_ICONS[i] || Zap;
              return (
                <div key={c.title} className="tmp-card">
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-[#FF5A1F]/15 text-[#FF5A1F] mb-5"><Ic size={20} /></div>
                  <h3 className="text-xl font-medium tracking-tight text-white">{c.title}</h3>
                  <p className="mt-3 text-zinc-400 text-sm">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client component for interactive roles + application form */}
      <CareersApplicationForm roles={allRoles} />
    </div>
  );
}
