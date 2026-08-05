import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Target, TrendingUp, Star, Package, Sparkles } from "lucide-react";

const API = `/api`;

// Interactive Marketplace Score widget
// 4 quick questions → score (0-100) → email capture → personalized result
const QUESTIONS = [
  {
    icon: TrendingUp,
    key: "revenue",
    label: "Monthly marketplace revenue",
    options: [
      { val: "Pre-launch", score: 10 },
      { val: "< ₹10L / mo", score: 30 },
      { val: "₹10L – ₹50L / mo", score: 55 },
      { val: "₹50L – ₹2Cr / mo", score: 75 },
      { val: "> ₹2Cr / mo", score: 90 },
    ],
  },
  {
    icon: Package,
    key: "skus",
    label: "Active SKUs you sell",
    options: [
      { val: "1 – 5", score: 35 },
      { val: "6 – 20", score: 55 },
      { val: "21 – 100", score: 75 },
      { val: "100+", score: 85 },
    ],
  },
  {
    icon: Target,
    key: "roas",
    label: "Current ad ROAS",
    options: [
      { val: "Don't track it", score: 15 },
      { val: "Below 3×", score: 35 },
      { val: "3× – 5×", score: 60 },
      { val: "5× – 8×", score: 80 },
      { val: "Above 8×", score: 95 },
    ],
  },
  {
    icon: Star,
    key: "rating",
    label: "Average product rating",
    options: [
      { val: "Below 4.0", score: 25 },
      { val: "4.0 – 4.3", score: 55 },
      { val: "4.3 – 4.6", score: 80 },
      { val: "Above 4.6", score: 95 },
    ],
  },
];

export default function MarketplaceScore({ onLeadCapture }) {
  const [step, setStep] = useState(0); // 0..3 questions, 4 = email, 5 = result
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const totalScore = () => {
    const max = QUESTIONS.length * 100;
    const got = QUESTIONS.reduce((acc, q) => acc + (answers[q.key]?.score || 0), 0);
    return Math.round((got / max) * 100);
  };

  const pickAnswer = (qkey, opt) => {
    setAnswers({ ...answers, [qkey]: opt });
    if (step < QUESTIONS.length - 1) setTimeout(() => setStep(s => s + 1), 200);
    else setTimeout(() => setStep(QUESTIONS.length), 250);
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const score = totalScore();
      await axios.post(`${API}/leads`, {
        name: contact.name,
        email: contact.email,
        source: "marketplace-score",
        revenue: answers.revenue?.val || "",
        message: `Score: ${score}/100 · SKUs: ${answers.skus?.val} · ROAS: ${answers.roas?.val} · Rating: ${answers.rating?.val}`,
      });
      setDone(true);
      onLeadCapture?.();
      setStep(QUESTIONS.length + 1);
    } catch (err) {
      // proceed anyway to result
      setStep(QUESTIONS.length + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const score = totalScore();
  const verdict =
    score >= 80 ? { tag: "Category Leader", desc: "Your fundamentals are strong. Time to compound — scale the wins, plug the leaks." } :
    score >= 60 ? { tag: "On Track", desc: "Solid foundation. With sharper execution you can break the next ceiling fast." } :
    score >= 40 ? { tag: "Revenue Leaking", desc: "There's 30–40% revenue being lost across listings, ads or reviews. Fixable in 60–90 days." } :
                  { tag: "Pre-Scale", desc: "Major infrastructure gaps. The good news: every fix compounds. Let's build the system." };

  if (step <= QUESTIONS.length - 1) {
    const q = QUESTIONS[step];
    const Icon = q.icon;
    return (
      <div className="glass p-7 rounded-2xl" data-testid="score-widget">
        <div className="flex items-center justify-between mb-5">
          <span className="mono text-[11px] tracking-[0.2em] uppercase text-[#FF5A1F]">Marketplace Score · {step+1}/{QUESTIONS.length+1}</span>
          <div className="flex gap-1.5">
            {QUESTIONS.map((_, i) => (
              <span key={i} className={`h-1 w-6 rounded-full ${i <= step ? "bg-[#FF5A1F]" : "bg-zinc-800"}`}/>
            ))}
            <span className="h-1 w-6 rounded-full bg-zinc-800" />
          </div>
        </div>
        <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#FF5A1F]/15 text-[#FF5A1F]"><Icon size={18} /></div>
            <h3 className="text-xl lg:text-2xl font-medium tracking-tight text-white">{q.label}</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt) => (
              <button
                key={opt.val}
                onClick={() => pickAnswer(q.key, opt)}
                className={`text-left px-4 py-3 rounded-xl border transition ${answers[q.key]?.val === opt.val ? "border-[#FF5A1F] bg-[#FF5A1F]/10 text-white" : "border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/60"}`}
                data-testid={`score-opt-${q.key}-${opt.val.replace(/[^a-z0-9]/gi,'').toLowerCase()}`}
              >
                {opt.val}
              </button>
            ))}
          </div>
        </motion.div>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="mt-4 text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1"><ArrowLeft size={12}/> Back</button>
        )}
      </div>
    );
  }

  if (step === QUESTIONS.length) {
    // contact gate
    return (
      <div className="glass p-7 rounded-2xl" data-testid="score-gate">
        <span className="mono text-[11px] tracking-[0.2em] uppercase text-[#FF5A1F]">Score Ready · {QUESTIONS.length+1}/{QUESTIONS.length+1}</span>
        <h3 className="mt-3 text-2xl lg:text-3xl font-medium tracking-tight text-white">Where do we send your detailed score?</h3>
        <p className="mt-2 text-sm text-zinc-400">Personalized PDF with exactly where you're leaking revenue — and how to fix it.</p>
        <form onSubmit={submitContact} className="mt-5 space-y-3">
          <input required placeholder="Your name" className="tmp-input" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} data-testid="score-name" />
          <input required type="email" placeholder="Work email" className="tmp-input" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} data-testid="score-email" />
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center pulse-glow" data-testid="score-submit">
            {submitting ? "Calculating..." : <>Submit <ArrowRight size={16} /></>}
          </button>
        </form>
      </div>
    );
  }

  // result
  return (
    <div className="glass p-7 rounded-2xl" data-testid="score-result">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-[#FF5A1F]" />
        <span className="mono text-[11px] tracking-[0.2em] uppercase text-[#FF5A1F]">Your Marketplace Score</span>
      </div>
      <div className="flex items-end gap-3">
        <p className="text-7xl lg:text-8xl font-medium tracking-[-0.04em] text-white">{score}</p>
        <p className="text-2xl text-zinc-500 mb-3">/ 100</p>
      </div>
      <div className="mt-4 score-track">
        <div className="score-fill" style={{ width: `${score}%` }} />
      </div>
      <div className="mt-5 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
        <p className="mono text-[11px] tracking-[0.2em] uppercase text-[#d4ff00]">{verdict.tag}</p>
        <p className="mt-2 text-white text-base">{verdict.desc}</p>
      </div>
      {done && (
        <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400"><CheckCircle2 size={14} className="text-[#FF5A1F]" /> Detailed PDF is on its way to <span className="text-white">{contact.email}</span></p>
      )}
      <button onClick={() => { setStep(0); setAnswers({}); setContact({name:"", email:""}); setDone(false); }} className="mt-5 text-xs text-zinc-500 hover:text-white">Retake quiz →</button>
    </div>
  );
}
