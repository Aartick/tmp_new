"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Mail, Briefcase, Calendar, User } from "lucide-react";

const API = `/api`;
axios.defaults.withCredentials = true;

export default function Admin() {
  const [auth, setAuth] = useState(null); // null = checking
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [apps, setApps] = useState([]);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("tmp_token") || "");
  }, []);

  const authHeader = () => token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    axios.get(`${API}/auth/me`, { headers: authHeader() }).then(r => setAuth(r.data)).catch(() => setAuth(false));
    // eslint-disable-next-line
  }, []);

  const refresh = async () => {
    try {
      const [l, a] = await Promise.all([
        axios.get(`${API}/admin/leads`, { headers: authHeader() }),
        axios.get(`${API}/admin/careers`, { headers: authHeader() }),
      ]);
      setLeads(l.data.leads || []);
      setApps(a.data.applications || []);
    } catch {}
  };

  useEffect(() => { if (auth && auth.email) refresh(); /* eslint-disable-next-line */ }, [auth]);

  const login = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const r = await axios.post(`${API}/auth/login`, creds);
      localStorage.setItem("tmp_token", r.data.token);
      setToken(r.data.token);
      setAuth(r.data);
    } catch (e2) {
      setErr(typeof e2.response?.data?.detail === "string" ? e2.response.data.detail : "Login failed");
    }
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`).catch(()=>{});
    localStorage.removeItem("tmp_token");
    setToken(""); setAuth(false);
  };

  if (auth === null) return <div className="pt-32 container-tmp text-zinc-400">Loading…</div>;
  if (!auth) {
    return (
      <div className="pt-32 pb-20 container-tmp max-w-md" data-testid="admin-login-page">
        <p className="tmp-label">Admin</p>
        <h1 className="mt-3 text-3xl font-medium text-white">Sign in</h1>
        <form onSubmit={login} className="mt-8 space-y-3">
          <input data-testid="admin-email-input" required type="email" placeholder="Email" className="tmp-input" value={creds.email} onChange={e => setCreds({...creds, email: e.target.value})} />
          <input data-testid="admin-password-input" required type="password" placeholder="Password" className="tmp-input" value={creds.password} onChange={e => setCreds({...creds, password: e.target.value})} />
          {err && <p className="text-sm text-red-400" data-testid="admin-login-error">{err}</p>}
          <button type="submit" className="btn-primary w-full justify-center" data-testid="admin-login-btn">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24" data-testid="admin-dashboard">
      <div className="container-tmp">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="tmp-label">Admin Dashboard</p>
            <h1 className="text-3xl font-medium tracking-tight text-white">Welcome, {auth.name}</h1>
          </div>
          <button onClick={logout} className="btn-outline text-sm" data-testid="admin-logout"><LogOut size={14} /> Logout</button>
        </div>

        <div className="flex gap-1 border-b border-[#1a1a1a]">
          {[
            { id: "leads", label: `Leads (${leads.length})` },
            { id: "careers", label: `Applications (${apps.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px ${tab === t.id ? "border-[#FF5A1F] text-[#FF5A1F]" : "border-transparent text-zinc-400 hover:text-white"}`} data-testid={`tab-${t.id}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "leads" && (
            <div className="grid lg:grid-cols-2 gap-4">
              {leads.length === 0 && <p className="text-zinc-500">No leads yet.</p>}
              {leads.map(l => (
                <div key={l.id} className="border border-[#1a1a1a] rounded-xl p-5 bg-[#0a0a0a]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{l.name}</p>
                      <a href={`mailto:${l.email}`} className="text-sm text-[#FF5A1F]">{l.email}</a>
                    </div>
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 border border-[#1a1a1a] px-2 py-1 rounded">{l.source}</span>
                  </div>
                  {l.brand && <p className="text-sm text-zinc-400 mt-2"><User size={12} className="inline mr-1" />{l.brand} · {l.marketplace || "—"} · {l.revenue || "—"}</p>}
                  {l.phone && <p className="text-sm text-zinc-400 mt-1">{l.phone}</p>}
                  {l.message && <p className="text-sm text-zinc-300 mt-3 border-t border-[#1a1a1a] pt-3">{l.message}</p>}
                  <p className="mt-3 mono text-[10px] text-zinc-500"><Calendar size={10} className="inline mr-1" />{new Date(l.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "careers" && (
            <div className="grid lg:grid-cols-2 gap-4">
              {apps.length === 0 && <p className="text-zinc-500">No applications yet.</p>}
              {apps.map(a => (
                <div key={a.id} className="border border-[#1a1a1a] rounded-xl p-5 bg-[#0a0a0a]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{a.name}</p>
                      <a href={`mailto:${a.email}`} className="text-sm text-[#FF5A1F]">{a.email}</a>
                    </div>
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 border border-[#1a1a1a] px-2 py-1 rounded"><Briefcase size={10} className="inline mr-1" />{a.role}</span>
                  </div>
                  {a.portfolio && <a href={a.portfolio} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 underline mt-2 inline-block">Portfolio →</a>}
                  {a.message && <p className="text-sm text-zinc-300 mt-3 border-t border-[#1a1a1a] pt-3">{a.message}</p>}
                  <p className="mt-3 mono text-[10px] text-zinc-500">{new Date(a.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
