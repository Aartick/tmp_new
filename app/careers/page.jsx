"use client";
import { useState } from "react";
import axios from "axios";
import { CheckCircle2, ArrowRight, MapPin, Briefcase, Zap, BookOpen, TrendingUp, Mail } from "lucide-react";
import { CAREERS, CAREER_CULTURE, SITE } from "../../src/data";

const API = `/api`;
const CULTURE_ICONS = [TrendingUp, BookOpen, Zap];

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(CAREERS[0].title);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: CAREERS[0].title, portfolio: "", message: "" });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/careers/apply`, { ...form, role: selectedRole });
      setDone(true);
    } catch {} finally { setSubmitting(false); }
  };

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

      <section className="py-16">
        <div className="container-tmp">
          <p className="tmp-label">Open Roles</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white">On-site positions only — be in the room where the work happens.</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {CAREERS.map(r => (
              <button
                key={r.slug}
                onClick={() => { setSelectedRole(r.title); setForm(f => ({...f, role: r.title})); }}
                className={`text-left p-7 rounded-2xl border transition ${selectedRole === r.title ? "border-[#FF5A1F] bg-[#FF5A1F]/10" : "border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#27272a]"}`}
                data-testid={`role-${r.slug}`}
              >
                <h3 className="text-2xl font-medium tracking-tight text-white">{r.title}</h3>
                <div className="mt-3 flex flex-wrap gap-3 text-xs mono uppercase tracking-[0.18em] text-zinc-400">
                  <span className="inline-flex items-center gap-1"><MapPin size={12} />{r.location}</span>
                  <span className="inline-flex items-center gap-1"><Briefcase size={12} />{r.type}</span>
                </div>
                <p className="mt-4 text-sm text-zinc-400">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-[#1a1a1a]">
        <div className="container-tmp max-w-2xl">
          <p className="tmp-label">Apply Now</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-tight text-white">Pitch us in 2 minutes.</h2>
          <p className="mt-3 text-zinc-400">Applying for: <strong className="text-[#FF5A1F]">{selectedRole}</strong></p>
          <p className="mt-1 text-sm text-zinc-500 inline-flex items-center gap-2"><Mail size={12} /> Or write directly to <a href={`mailto:${SITE.email}`} className="text-zinc-300 hover:text-[#FF5A1F]">{SITE.email}</a></p>

          {!done ? (
            <form onSubmit={submit} className="mt-8 space-y-4" data-testid="careers-form">
              <input data-testid="careers-name" required placeholder="Full name *" className="tmp-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input data-testid="careers-email" required type="email" placeholder="Email *" className="tmp-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input data-testid="careers-phone" placeholder="Phone" className="tmp-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <input data-testid="careers-portfolio" placeholder="Portfolio / LinkedIn / Resume URL" className="tmp-input" value={form.portfolio} onChange={e => setForm({...form, portfolio: e.target.value})} />
              <textarea data-testid="careers-message" placeholder="Why TMP? What have you scaled before?" className="tmp-input min-h-[140px]" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <button type="submit" disabled={submitting} className="btn-primary pulse-glow" data-testid="careers-submit">{submitting ? "Sending..." : <>Apply Now <ArrowRight size={16} /></>}</button>
            </form>
          ) : (
            <div className="mt-8 border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 rounded-xl p-8" data-testid="careers-success">
              <CheckCircle2 className="text-[#FF5A1F]" size={28} />
              <p className="mt-3 text-xl font-medium text-white">Application received.</p>
              <p className="mt-2 text-sm text-zinc-300">If your background aligns, we'll reach out within 5 business days.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
