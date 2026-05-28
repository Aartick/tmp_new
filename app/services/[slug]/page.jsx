"use client";
import { useAudit } from '../../AuditContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, CheckCircle2,
  Rocket, Megaphone, Search, Star, LayoutDashboard, Palette,
} from "lucide-react";
import { SERVICES } from "../../../src/data";

export default function ServiceDetail({ params }) {
  const { openAudit } = useAudit();
  const { slug } = useParams();
  const svc = SERVICES.find(s => s.slug === slug);
  if (!svc) {
    return <div className="pt-32 container-tmp"><p className="text-zinc-400">Service not found.</p><Link href="/services" className="link-underline text-[#FF5A1F]">Back to services</Link></div>;
  }
  const Ic = SERVICE_ICONS[svc.iconName] || Rocket;
  const others = SERVICES.filter(s => s.slug !== slug).slice(0, 3);
  return (
    <div className="pt-28 lg:pt-32" data-testid={`service-detail-${slug}`}>
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <Link href="/services" className="text-sm text-zinc-500 hover:text-[#FF5A1F]">← All services</Link>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-14 h-14 grid place-items-center rounded-2xl bg-[#FF5A1F]/12 text-[#FF5A1F] border border-[#FF5A1F]/20">
              <Ic size={26} />
            </div>
            <span className={`pillar-tag ${pillarClass(svc.pillar)}`}>{svc.pillar}</span>
          </div>
          <h1 className="mt-5 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] max-w-4xl text-white">{svc.name}</h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-3xl">{svc.short}</p>
        </div>
      </section>

      <section className="py-12 border-y border-[#1a1a1a]">
        <div className="container-tmp grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="tmp-label">What we do</p>
            <p className="mt-4 text-lg text-zinc-300 leading-relaxed">{svc.long}</p>
          </div>
          <div className="lg:col-span-5">
            <p className="tmp-label">Deliverables</p>
            <ul className="mt-4 space-y-3">
              {svc.deliverables.map(d => (
                <li key={d} className="flex items-start gap-3 text-zinc-200"><CheckCircle2 size={18} className="text-[#FF5A1F] mt-0.5 flex-shrink-0" /> {d}</li>
              ))}
            </ul>
            <button onClick={openAudit} className="btn-primary mt-8 pulse-glow">Book a Free Audit <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-tmp">
          <p className="tmp-label">More Services</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white">Built to work together.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {others.map((s) => {
              const OIc = SERVICE_ICONS[s.iconName] || Rocket;
              return (
                <Link href={`/services/${s.slug}`} key={s.slug} className="tmp-card flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#FF5A1F]/12 text-[#FF5A1F]"><OIc size={18} /></div>
                    <span className={`pillar-tag ${pillarClass(s.pillar)}`}>{s.pillar}</span>
                  </div>
                  <p className="text-xl font-medium tracking-tight text-white">{s.name}</p>
                  <p className="mt-2 text-sm text-zinc-400">{s.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
