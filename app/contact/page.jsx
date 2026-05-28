"use client";
import { useState } from "react";
import axios from "axios";
import { ArrowRight, CheckCircle2, Mail, MapPin, Linkedin, Instagram, Youtube, Facebook, AtSign, Sparkles } from "lucide-react";
import { SITE } from "../../src/data";

const API = `/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", brand: "", message: "" });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source: "contact" });
      setDone(true);
    } catch {} finally { setSubmitting(false); }
  };

  return (
    <div className="pt-28 lg:pt-32" data-testid="contact-page">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="tmp-label">Contact</p>
            <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] text-white">
              Let's <span className="italic font-normal text-[#FF5A1F]">talk</span> revenue.
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-md">
              In a 30-minute call, we'll audit your marketplace, identify growth leaks and show you exactly how to scale. No pressure. No obligation. Just clarity.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-[#FF5A1F]" />
                <div><p className="mono text-xs tracking-[0.18em] uppercase text-zinc-500">Email</p><a href={`mailto:${SITE.email}`} className="font-medium text-white hover:text-[#FF5A1F]">{SITE.email}</a></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-[#FF5A1F]" />
                <div><p className="mono text-xs tracking-[0.18em] uppercase text-zinc-500">Based In</p><p className="font-medium text-white">India · Working with brands globally</p></div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { href: SITE.socials.instagram, icon: Instagram, tid: "contact-instagram" },
                { href: SITE.socials.threads, icon: AtSign, tid: "contact-threads" },
                { href: SITE.socials.youtube, icon: Youtube, tid: "contact-youtube" },
                { href: SITE.socials.facebook, icon: Facebook, tid: "contact-facebook" },
                { href: "https://www.linkedin.com/in/himanshu-singh-bhandari-728397238/", icon: Linkedin, tid: "contact-linkedin" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] hover:border-[#FF5A1F] hover:text-[#FF5A1F] text-zinc-300 transition" data-testid={s.tid}>
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="tmp-card p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="sticker"><Sparkles size={11} /> Free Audit</span>
                <span className="mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">24h Turnaround</span>
              </div>
              <h2 className="mt-1 text-3xl font-medium tracking-tight text-white">Get your conversion score in 24 hours.</h2>

              {!done ? (
                <form onSubmit={submit} className="mt-6 grid grid-cols-2 gap-3" data-testid="contact-form">
                  <input data-testid="contact-name" required placeholder="Your name *" className="tmp-input col-span-2 sm:col-span-1" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input data-testid="contact-email" required type="email" placeholder="Work email *" className="tmp-input col-span-2 sm:col-span-1" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <input data-testid="contact-phone" placeholder="Phone" className="tmp-input col-span-2 sm:col-span-1" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  <input data-testid="contact-brand" placeholder="Brand / Company" className="tmp-input col-span-2 sm:col-span-1" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
                  <textarea data-testid="contact-message" placeholder="What's your #1 marketplace challenge right now?" className="tmp-input col-span-2 min-h-[120px]" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  <button type="submit" disabled={submitting} className="btn-primary col-span-2 justify-center pulse-glow" data-testid="contact-submit">{submitting ? "Sending..." : <>Get My Free Growth Plan <ArrowRight size={16} /></>}</button>
                  <p className="col-span-2 text-[11px] text-zinc-500 text-center">100% transparent · No long-term contracts · Reply within 24h</p>
                </form>
              ) : (
                <div className="mt-6 border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 rounded-xl p-8" data-testid="contact-success">
                  <CheckCircle2 className="text-[#FF5A1F]" size={28} />
                  <p className="mt-3 text-xl font-medium text-white">You're in.</p>
                  <p className="mt-2 text-zinc-300">We'll deep-dive into your marketplace and send your conversion score within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
