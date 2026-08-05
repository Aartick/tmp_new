import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const API = `/api`;

// Compact inline hero form: 3 fields → enriches modal on submit
export default function InlineLeadForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", revenue: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setErr("Name and email are required"); return; }
    setErr(""); setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source: "hero-inline" });
      setDone(true);
      onSuccess?.(form);
    } catch (e) {
      setErr("Try again — something went wrong.");
    } finally { setSubmitting(false); }
  };

  if (done) {
    return (
      <div className="glass p-6 rounded-2xl border-[var(--accent)]/30" data-testid="inline-form-success">
        <CheckCircle2 className="text-[#FF5A1F]" size={28} />
        <p className="mt-3 text-lg font-medium text-white">You're in, {form.name.split(' ')[0] || 'there'} 🎯</p>
        <p className="mt-1 text-sm text-zinc-400">Your free Marketplace Audit is being prepared. We'll be in your inbox within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass p-5 rounded-2xl" data-testid="inline-lead-form">
      <div className="flex items-center gap-2 mb-3">
        <span className="sticker"><Sparkles size={11} /> Free Audit</span>
        <span className="mono text-[10px] tracking-[0.2em] uppercase text-zinc-400">24h Turnaround</span>
      </div>
      <p className="text-white font-medium mb-3 text-lg">Get your free Marketplace Audit</p>
      <div className="grid grid-cols-1 gap-2.5">
        <input data-testid="inline-name" required placeholder="Your name" className="tmp-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input data-testid="inline-email" required type="email" placeholder="Work email" className="tmp-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <select data-testid="inline-revenue" className="tmp-input" value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})}>
          <option value="">Current monthly revenue</option>
          <option>Pre-launch</option>
          <option>{"< ₹10L / mo"}</option>
          <option>₹10L – ₹50L / mo</option>
          <option>₹50L – ₹2Cr / mo</option>
          <option>{"> ₹2Cr / mo"}</option>
        </select>
      </div>
      {err && <p className="mt-2 text-xs text-red-400" data-testid="inline-err">{err}</p>}
      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-3 pulse-glow" data-testid="inline-submit">
        {submitting ? "Sending..." : <>Book an audit <ArrowRight size={16} /></>}
      </button>
      <p className="mt-3 text-[11px] text-zinc-500 text-center">No obligation · 100% transparent · Reply within 24h</p>
    </form>
  );
}
