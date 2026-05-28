import { useState } from "react";
import axios from "axios";
import { X, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const API = `/api`;

export default function AuditModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", brand: "", marketplace: "Amazon", revenue: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source: "audit" });
      setDone(true);
    } catch (e) {
      setErr(typeof e.response?.data?.detail === "string" ? e.response.data.detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" data-testid="audit-modal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] max-w-xl w-full relative rounded-2xl">
        <button onClick={() => { onClose(); setTimeout(() => { setDone(false); setForm({ name: "", email: "", phone: "", brand: "", marketplace: "Amazon", revenue: "", message: "" }); }, 200); }} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white" data-testid="audit-close"><X size={18} /></button>

        {!done ? (
          <form onSubmit={submit} className="p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="sticker"><Sparkles size={11} /> Free Audit</span>
              <span className="mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">24h Turnaround</span>
            </div>
            <h3 className="mt-1 text-2xl lg:text-3xl font-medium tracking-tight text-white">Get your listing conversion score in 24 hours.</h3>
            <p className="mt-2 text-sm text-zinc-400">No pressure. No obligation. Just clarity on where revenue is leaking.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <input data-testid="audit-name" required placeholder="Your name *" className="tmp-input col-span-2 sm:col-span-1" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input data-testid="audit-email" required type="email" placeholder="Work email *" className="tmp-input col-span-2 sm:col-span-1" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input data-testid="audit-phone" placeholder="Phone (optional)" className="tmp-input col-span-2 sm:col-span-1" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <input data-testid="audit-brand" placeholder="Brand / Company" className="tmp-input col-span-2 sm:col-span-1" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
              <select data-testid="audit-marketplace" className="tmp-input col-span-2 sm:col-span-1" value={form.marketplace} onChange={e => setForm({ ...form, marketplace: e.target.value })}>
                <option>Amazon</option>
                <option>Flipkart</option>
                <option>Multiple Marketplaces</option>
                <option>Just launching</option>
              </select>
              <select data-testid="audit-revenue" className="tmp-input col-span-2 sm:col-span-1" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                <option value="">Monthly revenue range</option>
                <option>Pre-launch</option>
                <option>{"< ₹10L / month"}</option>
                <option>₹10L – ₹50L / month</option>
                <option>₹50L – ₹2Cr / month</option>
                <option>{"> ₹2Cr / month"}</option>
              </select>
              <textarea data-testid="audit-message" placeholder="What's your #1 marketplace bottleneck right now?" className="tmp-input col-span-2 min-h-[90px]" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>

            {err && <p className="mt-3 text-sm text-red-400" data-testid="audit-error">{err}</p>}

            <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full justify-center pulse-glow" data-testid="audit-submit">
              {submitting ? "Sending..." : <>Get My Free Growth Plan <ArrowRight size={16} /></>}
            </button>
            <p className="mt-3 text-[11px] text-zinc-500 text-center">100% transparent · No long-term contracts · Reply within 24h</p>
          </form>
        ) : (
          <div className="p-10 text-center" data-testid="audit-success">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF5A1F]/15 grid place-items-center"><CheckCircle2 size={32} className="text-[#FF5A1F]" /></div>
            <h3 className="mt-4 text-2xl font-medium text-white">You're in.</h3>
            <p className="mt-2 text-zinc-400">We'll deep-dive into your marketplace and send your conversion score within 24 hours.</p>
            <button onClick={onClose} className="btn-outline mt-6">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
