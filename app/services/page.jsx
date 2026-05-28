"use client";
import { useAudit } from '../AuditContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, CheckCircle2,
  Rocket, Megaphone, Search, Star, LayoutDashboard, Palette,
} from "lucide-react";
import { SERVICES } from "../../src/data";

const pillarClass = (p) => p === "ACQUIRE" ? "pillar-acquire" : p === "CONVERT" ? "pillar-convert" : "pillar-scale";
const SERVICE_ICONS = { Rocket, Megaphone, Search, Star, LayoutDashboard, Palette };

export default function ServicesList({ params }) {
  const { openAudit } = useAudit();
  const pillars = ["ACQUIRE", "CONVERT", "SCALE"];
  return (
    <div className="pt-28 lg:pt-32" data-testid="services-page">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <p className="tmp-label">Services</p>
          <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] max-w-4xl text-white">
            How we turn products into <span className="italic font-normal text-[#FF5A1F]">category leaders.</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-zinc-400 max-w-2xl">
            A performance-driven ecosystem designed to increase visibility, conversions and revenue across every touchpoint.
          </p>
        </div>
      </section>

      {pillars.map(p => {
        const items = SERVICES.filter(s => s.pillar === p);
        const desc = p === "ACQUIRE" ? "Traffic & Visibility" : p === "CONVERT" ? "Sales & Trust" : "Operations & Growth";
        return (
          <section key={p} className="py-20 border-t border-[#1a1a1a]">
            <div className="container-tmp">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <span className={`pillar-tag ${pillarClass(p)}`}>{p}</span>
                  <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white">{desc}</h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {items.map((s) => {
                  const Ic = SERVICE_ICONS[s.iconName] || Rocket;
                  return (
                    <Link href={`/services/${s.slug}`} key={s.slug} className="tmp-card flex flex-col" data-testid={`service-${s.slug}`}>
                      <div className="w-11 h-11 grid place-items-center rounded-xl bg-[#FF5A1F]/12 text-[#FF5A1F] border border-[#FF5A1F]/20 mb-4">
                        <Ic size={20} />
                      </div>
                      <p className="text-2xl font-medium tracking-tight text-white">{s.name}</p>
                      <p className="mt-3 text-zinc-400">{s.short}</p>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm text-[#FF5A1F] link-underline">Learn more <ArrowUpRight size={14} /></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Process */}
      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-tmp">
          <p className="tmp-label">Our Process</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white">Three steps. Start in days, not weeks.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { step: "01", t: "Audit", d: "Identify revenue leaks and hidden growth opportunities." },
              { step: "02", t: "Strategy", d: "Build a plan mapped to your actual growth targets." },
              { step: "03", t: "Onboarding", d: "Clear roadmap, timelines, deliverables and an execution plan." },
            ].map((p) => (
              <div key={p.step} className="border-t-2 border-[#FF5A1F] pt-6">
                <p className="mono text-sm text-[#FF5A1F]">{p.step}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{p.t}</h3>
                <p className="mt-3 text-zinc-400">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us strip */}
      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-tmp">
          <p className="tmp-label">Why Choose Us</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white max-w-3xl">We build systems, not one-off campaigns.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { t: "Revenue, not vanity metrics", d: "ROI tracked monthly. Real money moved, not slides." },
              { t: "Documented playbooks", d: "Every engagement comes with a growth playbook your team owns." },
              { t: "Operator mindset", d: "We treat your P&L like our own." },
            ].map((x) => (
              <div key={x.t} className="tmp-card">
                <h3 className="text-xl font-medium tracking-tight text-white">{x.t}</h3>
                <p className="mt-3 text-zinc-400 text-sm">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-tmp flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <h2 className="text-3xl lg:text-5xl font-medium tracking-tight max-w-2xl text-white">Need all of it working together? That's what we do.</h2>
          <button onClick={openAudit} className="btn-primary self-start pulse-glow">Book a Free Audit <ArrowRight size={16} /></button>
        </div>
      </section>
    </div>
  );
}

