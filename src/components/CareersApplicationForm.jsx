"use client";
import { useState } from "react";
import axios from "axios";
import { CheckCircle2, ArrowRight, MapPin, Briefcase, Mail, Upload } from "lucide-react";
import { SITE } from "../../src/data";

const API = `/api`;

export default function CareersApplicationForm({ roles }) {
  const [selectedRole, setSelectedRole] = useState(roles[0]?.title || "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", portfolio: "", message: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("role", selectedRole);
      formData.append("portfolio", form.portfolio);
      formData.append("message", form.message);
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      await axios.post(`${API}/careers/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDone(true);
    } catch {} finally { setSubmitting(false); }
  };

  return (
    <>
      {/* Open Roles */}
      <section className="py-16">
        <div className="container-tmp">
          <p className="tmp-label">Open Roles</p>
          <h2 className="mt-3 text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-white">On-site positions only — be in the room where the work happens.</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {roles.map(r => (
              <button
                key={r.slug}
                onClick={() => setSelectedRole(r.title)}
                className={`text-left p-7 rounded-2xl border transition ${selectedRole === r.title ? "border-[#FF5A1F] bg-[#FF5A1F]/10" : "border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#27272a]"}`}
                data-testid={`role-${r.slug}`}
              >
                <h3 className="text-2xl font-medium tracking-tight text-white">{r.title}</h3>
                <div className="mt-3 flex flex-wrap gap-3 text-xs mono uppercase tracking-[0.18em] text-zinc-400">
                  <span className="inline-flex items-center gap-1"><MapPin size={12} />{r.location}</span>
                  <span className="inline-flex items-center gap-1"><Briefcase size={12} />{r.type}</span>
                </div>
                <p className="mt-4 text-sm text-zinc-400">{r.desc || r.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
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
              <input data-testid="careers-portfolio" placeholder="Portfolio / LinkedIn URL" className="tmp-input" value={form.portfolio} onChange={e => setForm({...form, portfolio: e.target.value})} />

              {/* Resume Upload */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Resume / CV</label>
                <div className="relative border border-dashed border-[#1a1a1a] hover:border-[#FF5A1F]/30 rounded-xl p-5 bg-black/40 text-center cursor-pointer transition">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={e => setResumeFile(e.target.files[0])}
                    data-testid="careers-resume"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <Upload size={20} className="text-zinc-500 mb-1.5" />
                    <p className="text-sm text-zinc-300 font-medium">
                      {resumeFile ? resumeFile.name : "Upload your resume (PDF, DOC, DOCX, or Image)"}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">Max 10MB</p>
                  </div>
                </div>
              </div>

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
    </>
  );
}
