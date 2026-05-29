"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  LogOut, Mail, Briefcase, Calendar, User, Upload, Trash2, 
  Image as ImageIcon, Edit2, Plus, FileText, Globe, Check, Eye, Download, MapPin 
} from "lucide-react";

const API = `/api`;
axios.defaults.withCredentials = true;

export default function Admin() {
  const [auth, setAuth] = useState(null); // null = checking
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [apps, setApps] = useState([]);
  const [uploadedBrands, setUploadedBrands] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [careerOpenings, setCareerOpenings] = useState([]);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");

  // Reusable Cloudinary uploading states
  const [globalUploading, setGlobalUploading] = useState(false);

  // Brand Upload Form State
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandFile, setNewBrandFile] = useState(null);
  const [brandUploading, setBrandUploading] = useState(false);
  const [brandError, setBrandError] = useState("");
  const [brandSuccess, setBrandSuccess] = useState("");

  // Blog Form State
  const [blogEditMode, setBlogEditMode] = useState(false);
  const [blogOriginalSlug, setBlogOriginalSlug] = useState("");
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "TMP Team",
    tags: "",
    published: true,
    cover_image: ""
  });
  const [blogFile, setBlogFile] = useState(null);
  const [blogError, setBlogError] = useState("");
  const [blogSuccess, setBlogSuccess] = useState("");

  // Case Study Form State
  const [caseEditMode, setCaseEditMode] = useState(false);
  const [caseOriginalSlug, setCaseOriginalSlug] = useState("");
  const [caseForm, setCaseForm] = useState({
    brand: "",
    slug: "",
    category: "",
    headline: "",
    sub: "",
    content: "",
    flagship: false,
    published: true,
    cover_image: ""
  });
  const [caseFile, setCaseFile] = useState(null);
  const [caseError, setCaseError] = useState("");
  const [caseSuccess, setCaseSuccess] = useState("");

  // Career Opening Form State
  const [openingEditMode, setOpeningEditMode] = useState(false);
  const [openingOriginalSlug, setOpeningOriginalSlug] = useState("");
  const [openingForm, setOpeningForm] = useState({
    title: "",
    slug: "",
    location: "On-site · India",
    type: "Full-time",
    description: "",
    published: true
  });
  const [openingError, setOpeningError] = useState("");
  const [openingSuccess, setOpeningSuccess] = useState("");

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
      const [l, a, b, bl, cs, co] = await Promise.all([
        axios.get(`${API}/admin/leads`, { headers: authHeader() }),
        axios.get(`${API}/admin/careers`, { headers: authHeader() }),
        axios.get(`/api/brands`),
        axios.get(`${API}/admin/blog`, { headers: authHeader() }),
        axios.get(`${API}/admin/case-studies`, { headers: authHeader() }),
        axios.get(`${API}/admin/career-openings`, { headers: authHeader() })
      ]);
      setLeads(l.data.leads || []);
      setApps(a.data.applications || []);
      setUploadedBrands(b.data.brands || []);
      setBlogs(bl.data.posts || []);
      setCaseStudies(cs.data.caseStudies || []);
      setCareerOpenings(co.data.openings || []);
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

  // Upload an image file securely to Cloudinary using reusable upload endpoint
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setGlobalUploading(true);
    try {
      const res = await axios.post(`${API}/admin/upload`, formData, {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data"
        }
      });
      return res.data.url;
    } catch (e3) {
      throw new Error(e3.response?.data?.detail || "Cloudinary upload failed. Check keys in .env.");
    } finally {
      setGlobalUploading(false);
    }
  };

  const handleBrandUpload = async (e) => {
    e.preventDefault();
    setBrandUploading(true);
    setBrandError("");
    setBrandSuccess("");

    try {
      const logoUrl = await uploadImage(newBrandFile);
      const r = await axios.post(`${API}/admin/brands`, {
        name: newBrandName,
        logo: logoUrl
      }, { headers: authHeader() });

      if (r.data.ok) {
        setBrandSuccess(`Successfully uploaded brand: ${r.data.brand.name}!`);
        setNewBrandName("");
        setNewBrandFile(null);
        if (document.getElementById("brand-file-input")) {
          document.getElementById("brand-file-input").value = "";
        }
        refresh();
      }
    } catch (err2) {
      setBrandError(err2.message || "Failed to upload brand logo.");
    } finally {
      setBrandUploading(false);
    }
  };

  const handleBrandDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this brand logo?")) return;
    try {
      await axios.delete(`${API}/admin/brands?id=${id}`, { headers: authHeader() });
      refresh();
    } catch (err2) {
      alert(err2.response?.data?.detail || "Failed to delete brand logo");
    }
  };

  // Blog Management Submit
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogError("");
    setBlogSuccess("");

    try {
      let finalCoverUrl = blogForm.cover_image;
      if (blogFile) {
        finalCoverUrl = await uploadImage(blogFile);
      }

      const payload = {
        ...blogForm,
        cover_image: finalCoverUrl,
        tags: typeof blogForm.tags === "string" ? blogForm.tags.split(",").map(t => t.trim()).filter(Boolean) : blogForm.tags
      };

      if (blogEditMode) {
        await axios.put(`${API}/admin/blog/${blogOriginalSlug}`, payload, { headers: authHeader() });
        setBlogSuccess("Blog post successfully updated!");
      } else {
        await axios.post(`${API}/admin/blog`, payload, { headers: authHeader() });
        setBlogSuccess("Blog post successfully created!");
      }

      // Reset
      setBlogForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "TMP Team",
        tags: "",
        published: true,
        cover_image: ""
      });
      setBlogFile(null);
      setBlogEditMode(false);
      if (document.getElementById("blog-file-input")) {
        document.getElementById("blog-file-input").value = "";
      }
      refresh();
    } catch (err2) {
      setBlogError(err2.message || "Failed to submit blog post.");
    }
  };

  const handleBlogEditTrigger = (post) => {
    setBlogEditMode(true);
    setBlogOriginalSlug(post.slug);
    setBlogForm({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      author: post.author || "TMP Team",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      published: post.published !== false,
      cover_image: post.cover_image || ""
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleBlogDelete = async (slug) => {
    if (!confirm("Are you sure you want to permanently delete this blog post?")) return;
    try {
      await axios.delete(`${API}/admin/blog/${slug}`, { headers: authHeader() });
      refresh();
    } catch (err2) {
      alert("Failed to delete blog post.");
    }
  };

  // Case Study Management Submit
  const handleCaseSubmit = async (e) => {
    e.preventDefault();
    setCaseError("");
    setCaseSuccess("");

    try {
      let finalCoverUrl = caseForm.cover_image;
      if (caseFile) {
        finalCoverUrl = await uploadImage(caseFile);
      }

      const payload = {
        ...caseForm,
        cover_image: finalCoverUrl
      };

      if (caseEditMode) {
        await axios.put(`${API}/admin/case-studies/${caseOriginalSlug}`, payload, { headers: authHeader() });
        setCaseSuccess("Case study successfully updated!");
      } else {
        await axios.post(`${API}/admin/case-studies`, payload, { headers: authHeader() });
        setCaseSuccess("Case study successfully created!");
      }

      // Reset
      setCaseForm({
        brand: "",
        slug: "",
        category: "",
        headline: "",
        sub: "",
        content: "",
        flagship: false,
        published: true,
        cover_image: ""
      });
      setCaseFile(null);
      setCaseEditMode(false);
      if (document.getElementById("case-file-input")) {
        document.getElementById("case-file-input").value = "";
      }
      refresh();
    } catch (err2) {
      setCaseError(err2.message || "Failed to submit case study.");
    }
  };

  const handleCaseEditTrigger = (study) => {
    setCaseEditMode(true);
    setCaseOriginalSlug(study.slug);
    setCaseForm({
      brand: study.brand || "",
      slug: study.slug || "",
      category: study.category || "",
      headline: study.headline || "",
      sub: study.sub || "",
      content: study.content || "",
      flagship: study.flagship === true,
      published: study.published !== false,
      cover_image: study.cover_image || ""
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCaseDelete = async (slug) => {
    if (!confirm("Are you sure you want to permanently delete this case study?")) return;
    try {
      await axios.delete(`${API}/admin/case-studies/${slug}`, { headers: authHeader() });
      refresh();
    } catch (err2) {
      alert("Failed to delete case study.");
    }
  };

  const autoGenerateSlug = (text, setFormFunc) => {
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormFunc(prev => ({ ...prev, slug }));
  };

  // Career Openings Management
  const handleOpeningSubmit = async (e) => {
    e.preventDefault();
    setOpeningError("");
    setOpeningSuccess("");

    try {
      const payload = { ...openingForm };

      if (openingEditMode) {
        await axios.put(`${API}/admin/career-openings/${openingOriginalSlug}`, payload, { headers: authHeader() });
        setOpeningSuccess("Job opening successfully updated!");
      } else {
        await axios.post(`${API}/admin/career-openings`, payload, { headers: authHeader() });
        setOpeningSuccess("Job opening successfully created!");
      }

      setOpeningForm({
        title: "",
        slug: "",
        location: "On-site · India",
        type: "Full-time",
        description: "",
        published: true
      });
      setOpeningEditMode(false);
      refresh();
    } catch (err2) {
      setOpeningError(err2.response?.data?.detail || err2.message || "Failed to save job opening.");
    }
  };

  const handleOpeningEditTrigger = (o) => {
    setOpeningEditMode(true);
    setOpeningOriginalSlug(o.slug);
    setOpeningForm({
      title: o.title || "",
      slug: o.slug || "",
      location: o.location || "On-site · India",
      type: o.type || "Full-time",
      description: o.description || "",
      published: o.published !== false
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleOpeningDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      await axios.delete(`${API}/admin/career-openings/${slug}`, { headers: authHeader() });
      refresh();
    } catch (err2) {
      alert("Failed to delete job opening.");
    }
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

        <div className="flex gap-1 overflow-x-auto border-b border-[#1a1a1a] scrollbar-none pb-px">
          {[
            { id: "leads", label: `Leads (${leads.length})` },
            { id: "careers", label: `Applications (${apps.length})` },
            { id: "job_openings", label: `Job Openings (${careerOpenings.length})` },
            { id: "brands", label: `Brand Logos (${uploadedBrands.length})` },
            { id: "blogs", label: `Blogs (${blogs.length})` },
            { id: "case_studies", label: `Case Studies (${caseStudies.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${tab === t.id ? "border-[#FF5A1F] text-[#FF5A1F]" : "border-transparent text-zinc-400 hover:text-white"}`} data-testid={`tab-${t.id}`}>
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
                  {a.phone && <p className="text-sm text-zinc-400 mt-1">📞 {a.phone}</p>}
                  {a.portfolio && <a href={a.portfolio} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 underline mt-2 inline-block">Portfolio →</a>}
                  {a.resume_url && (
                    <a href={a.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 mt-2 ml-3 transition">
                      <Download size={12} /> Resume
                    </a>
                  )}
                  {a.message && <p className="text-sm text-zinc-300 mt-3 border-t border-[#1a1a1a] pt-3">{a.message}</p>}
                  <p className="mt-3 mono text-[10px] text-zinc-500">{new Date(a.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "job_openings" && (
            <div className="space-y-8">
              <div className="border border-[#1a1a1a] rounded-2xl p-6 bg-[#0a0a0a] max-w-3xl">
                <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                  {openingEditMode ? <Edit2 size={18} className="text-[#FF5A1F]" /> : <Plus size={18} className="text-[#FF5A1F]" />}
                  {openingEditMode ? `Edit Opening: ${openingForm.title}` : "Post New Job Opening"}
                </h2>
                <form onSubmit={handleOpeningSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Job Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marketplace Analyst"
                        className="tmp-input w-full"
                        value={openingForm.title}
                        onChange={e => {
                          setOpeningForm({...openingForm, title: e.target.value});
                          if (!openingEditMode) autoGenerateSlug(e.target.value, setOpeningForm);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Slug (URL Segment) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. marketplace-analyst"
                        className="tmp-input w-full"
                        value={openingForm.slug}
                        onChange={e => setOpeningForm({...openingForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-")})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. On-site · Mumbai"
                        className="tmp-input w-full"
                        value={openingForm.location}
                        onChange={e => setOpeningForm({...openingForm, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Employment Type *</label>
                      <select
                        className="tmp-input w-full"
                        value={openingForm.type}
                        onChange={e => setOpeningForm({...openingForm, type: e.target.value})}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Job Description *</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                      className="tmp-input w-full min-h-[160px]"
                      value={openingForm.description}
                      onChange={e => setOpeningForm({...openingForm, description: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="opening-published"
                      className="w-4 h-4 rounded accent-[#FF5A1F]"
                      checked={openingForm.published}
                      onChange={e => setOpeningForm({...openingForm, published: e.target.checked})}
                    />
                    <label htmlFor="opening-published" className="text-sm text-zinc-300 select-none cursor-pointer">Publish Immediately (Visible on careers page)</label>
                  </div>

                  {openingError && <p className="text-sm text-red-400 font-medium">{openingError}</p>}
                  {openingSuccess && <p className="text-sm text-emerald-400 font-medium">{openingSuccess}</p>}

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="btn-primary flex-1 justify-center"
                    >
                      {openingEditMode ? "Save Changes" : "Post Job Opening"}
                    </button>
                    {openingEditMode && (
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setOpeningEditMode(false);
                          setOpeningForm({
                            title: "",
                            slug: "",
                            location: "On-site · India",
                            type: "Full-time",
                            description: "",
                            published: true
                          });
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Existing Job Openings ({careerOpenings.length})</h3>
                {careerOpenings.length === 0 ? (
                  <p className="text-zinc-500">No job openings posted yet. The careers page will use the default static openings list.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {careerOpenings.map(o => (
                      <div key={o.id} className="border border-[#1a1a1a] rounded-xl p-5 bg-[#0a0a0a] flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h4 className="font-semibold text-white text-lg line-clamp-1">{o.title}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${o.published ? "bg-emerald-950/80 text-emerald-400 border border-emerald-900" : "bg-zinc-800 text-zinc-400"}`}>
                              {o.published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div className="flex gap-3 text-xs text-zinc-400 mb-2">
                            <span className="inline-flex items-center gap-1"><MapPin size={11} />{o.location}</span>
                            <span className="inline-flex items-center gap-1"><Briefcase size={11} />{o.type}</span>
                          </div>
                          <p className="text-sm text-zinc-400 line-clamp-2">{o.description}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4 mt-3">
                          <span className="text-xs text-zinc-500 mono">{o.slug}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpeningEditTrigger(o)}
                              className="p-2 rounded-lg bg-black hover:bg-zinc-800 text-zinc-300 border border-[#1a1a1a]"
                              title="Edit opening"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleOpeningDelete(o.slug)}
                              className="p-2 rounded-lg bg-black hover:bg-red-950/40 text-zinc-500 hover:text-red-400 border border-[#1a1a1a]"
                              title="Delete opening"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "brands" && (
            <div className="space-y-8">
              <div className="border border-[#1a1a1a] rounded-2xl p-6 bg-[#0a0a0a] max-w-xl">
                <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                  <Upload size={18} className="text-[#FF5A1F]" />
                  Upload New Brand Logo
                </h2>
                <form onSubmit={handleBrandUpload} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Myntra, Solimo"
                      className="tmp-input w-full"
                      value={newBrandName}
                      onChange={e => setNewBrandName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Logo Image File *</label>
                    <div className="relative border border-dashed border-[#1a1a1a] hover:border-[#FF5A1F]/30 rounded-xl p-6 bg-black/40 text-center cursor-pointer transition">
                      <input
                        id="brand-file-input"
                        type="file"
                        required
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={e => setNewBrandFile(e.target.files[0])}
                      />
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon size={24} className="text-zinc-500 mb-2" />
                        <p className="text-sm text-zinc-300 font-medium">
                          {newBrandFile ? newBrandFile.name : "Select or drag brand logo image"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">PNG, SVG, JPG, WebP (Transparent BG recommended)</p>
                      </div>
                    </div>
                  </div>

                  {brandError && <p className="text-sm text-red-400 font-medium">{brandError}</p>}
                  {brandSuccess && <p className="text-sm text-emerald-400 font-medium">{brandSuccess}</p>}
                  {globalUploading && <p className="text-sm text-[#FF5A1F] font-medium animate-pulse">Uploading asset to Cloudinary...</p>}

                  <button
                    type="submit"
                    disabled={brandUploading || globalUploading}
                    className="btn-primary w-full justify-center"
                  >
                    {brandUploading ? "Uploading to Cloudinary..." : "Upload Logo"}
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Uploaded Custom Brand Logos ({uploadedBrands.length})</h3>
                {uploadedBrands.length === 0 ? (
                  <p className="text-zinc-500">No custom brand logos uploaded yet. The homepage marquee will fall back to the default list.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {uploadedBrands.map(b => (
                      <div key={b.id} className="relative group border border-[#1a1a1a] hover:border-[#FF5A1F]/30 rounded-xl p-4 bg-[#0a0a0a] flex flex-col items-center justify-between text-center transition min-h-[140px]">
                        <button
                          onClick={() => handleBrandDelete(b.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-red-950 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition duration-200 border border-[#1a1a1a]"
                          title="Delete Brand"
                        >
                          <Trash2 size={13} />
                        </button>

                        <div className="flex-1 flex items-center justify-center p-2 min-h-[60px] w-full">
                          {b.logo ? (
                            <img src={b.logo} alt={b.name} className="max-h-10 max-w-full object-contain filter brightness(1.05)" />
                          ) : (
                            <span className="text-zinc-500 italic text-xs">No Logo</span>
                          )}
                        </div>

                        <p className="text-xs font-semibold text-zinc-300 mt-2 truncate w-full px-1">{b.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "blogs" && (
            <div className="space-y-8">
              <div className="border border-[#1a1a1a] rounded-2xl p-6 bg-[#0a0a0a] max-w-3xl">
                <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                  {blogEditMode ? <Edit2 size={18} className="text-[#FF5A1F]" /> : <Plus size={18} className="text-[#FF5A1F]" />}
                  {blogEditMode ? `Edit Blog Post: ${blogForm.title}` : "Create New Blog Post"}
                </h2>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="Blog title"
                        className="tmp-input w-full"
                        value={blogForm.title}
                        onChange={e => {
                          setBlogForm({...blogForm, title: e.target.value});
                          if (!blogEditMode) autoGenerateSlug(e.target.value, setBlogForm);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Slug (SEO URL Segment) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. key-marketplace-tactics"
                        className="tmp-input w-full"
                        value={blogForm.slug}
                        onChange={e => setBlogForm({...blogForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-")})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Author *</label>
                      <input
                        type="text"
                        required
                        className="tmp-input w-full"
                        value={blogForm.author}
                        onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. PPC, Amazon, Strategy"
                        className="tmp-input w-full"
                        value={blogForm.tags}
                        onChange={e => setBlogForm({...blogForm, tags: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Short Excerpt (SEO Description) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief article preview context (1-2 sentences)"
                      className="tmp-input w-full"
                      value={blogForm.excerpt}
                      onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Content (Markdown / Rich Text) *</label>
                    <textarea
                      required
                      rows={10}
                      placeholder="Write your article. Use ## for Headings, - for bullets, and **bold** formatting."
                      className="tmp-input w-full min-h-[220px]"
                      value={blogForm.content}
                      onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Cover Image</label>
                    <div className="relative border border-dashed border-[#1a1a1a] hover:border-[#FF5A1F]/30 rounded-xl p-4 bg-black/40 text-center cursor-pointer transition">
                      <input
                        id="blog-file-input"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={e => setBlogFile(e.target.files[0])}
                      />
                      <div className="flex items-center justify-center gap-3">
                        <ImageIcon size={18} className="text-zinc-500" />
                        <span className="text-sm text-zinc-300 font-medium truncate">
                          {blogFile ? blogFile.name : blogForm.cover_image ? "Keep existing image (click to change)" : "Upload cover image"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="blog-published"
                      className="w-4 h-4 rounded accent-[#FF5A1F]"
                      checked={blogForm.published}
                      onChange={e => setBlogForm({...blogForm, published: e.target.checked})}
                    />
                    <label htmlFor="blog-published" className="text-sm text-zinc-300 select-none cursor-pointer">Publish Immediately (Visible to public)</label>
                  </div>

                  {blogError && <p className="text-sm text-red-400 font-medium">{blogError}</p>}
                  {blogSuccess && <p className="text-sm text-emerald-400 font-medium">{blogSuccess}</p>}
                  {globalUploading && <p className="text-sm text-[#FF5A1F] font-medium animate-pulse">Uploading cover image to Cloudinary...</p>}

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={globalUploading}
                      className="btn-primary flex-1 justify-center"
                    >
                      {globalUploading ? "Uploading Asset..." : blogEditMode ? "Save Changes" : "Publish Blog Post"}
                    </button>
                    {blogEditMode && (
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setBlogEditMode(false);
                          setBlogForm({
                            title: "",
                            slug: "",
                            excerpt: "",
                            content: "",
                            author: "TMP Team",
                            tags: "",
                            published: true,
                            cover_image: ""
                          });
                          setBlogFile(null);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Existing Blog Posts ({blogs.length})</h3>
                {blogs.length === 0 ? (
                  <p className="text-zinc-500">No blog posts found in the database.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {blogs.map(p => (
                      <div key={p.id} className="border border-[#1a1a1a] rounded-xl p-5 bg-[#0a0a0a] flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h4 className="font-semibold text-white text-lg line-clamp-1">{p.title}</h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${p.published ? "bg-emerald-950/80 text-emerald-400 border border-emerald-900" : "bg-zinc-800 text-zinc-400"}`}>
                              {p.published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <p className="text-xs text-[#FF5A1F] mono mb-2">/blog/{p.slug}</p>
                          <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{p.excerpt}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4 mt-3">
                          <span className="text-xs text-zinc-500">By {p.author}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBlogEditTrigger(p)}
                              className="p-2 rounded-lg bg-black hover:bg-zinc-800 text-zinc-300 border border-[#1a1a1a]"
                              title="Edit post"
                            >
                              <Edit2 size={13} />
                            </button>
                            <a
                              href={`/blog/${p.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-black hover:bg-zinc-800 text-zinc-300 border border-[#1a1a1a]"
                              title="View post"
                            >
                              <Eye size={13} />
                            </a>
                            <button
                              onClick={() => handleBlogDelete(p.slug)}
                              className="p-2 rounded-lg bg-black hover:bg-red-950/40 text-zinc-500 hover:text-red-400 border border-[#1a1a1a]"
                              title="Delete post"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "case_studies" && (
            <div className="space-y-8">
              <div className="border border-[#1a1a1a] rounded-2xl p-6 bg-[#0a0a0a] max-w-3xl">
                <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                  {caseEditMode ? <Edit2 size={18} className="text-[#FF5A1F]" /> : <Plus size={18} className="text-[#FF5A1F]" />}
                  {caseEditMode ? `Edit Case Study: ${caseForm.brand}` : "Create New Case Study"}
                </h2>
                <form onSubmit={handleCaseSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Brand Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Perfora, Naturaltein"
                        className="tmp-input w-full"
                        value={caseForm.brand}
                        onChange={e => {
                          setCaseForm({...caseForm, brand: e.target.value});
                          if (!caseEditMode) autoGenerateSlug(e.target.value, setCaseForm);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Slug (SEO URL Segment) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. perfora-scaling"
                        className="tmp-input w-full"
                        value={caseForm.slug}
                        onChange={e => setCaseForm({...caseForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-")})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Category *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Personal Care, Sports"
                        className="tmp-input w-full"
                        value={caseForm.category}
                        onChange={e => setCaseForm({...caseForm, category: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Headline *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹0 → ₹1.5 Cr+ from cold start"
                        className="tmp-input w-full"
                        value={caseForm.headline}
                        onChange={e => setCaseForm({...caseForm, headline: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Short Preview Subtitle *</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief headline description (e.g., 3.8x revenue growth in 14 months)"
                      className="tmp-input w-full"
                      value={caseForm.sub}
                      onChange={e => setCaseForm({...caseForm, sub: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Case Study Details / Content *</label>
                    <textarea
                      required
                      rows={8}
                      placeholder="Type details about the brand background, key challenges solved, approach, and outcomes."
                      className="tmp-input w-full min-h-[180px]"
                      value={caseForm.content}
                      onChange={e => setCaseForm({...caseForm, content: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-medium mb-1.5">Cover Image</label>
                    <div className="relative border border-dashed border-[#1a1a1a] hover:border-[#FF5A1F]/30 rounded-xl p-4 bg-black/40 text-center cursor-pointer transition">
                      <input
                        id="case-file-input"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={e => setCaseFile(e.target.files[0])}
                      />
                      <div className="flex items-center justify-center gap-3">
                        <ImageIcon size={18} className="text-zinc-500" />
                        <span className="text-sm text-zinc-300 font-medium truncate">
                          {caseFile ? caseFile.name : caseForm.cover_image ? "Keep existing image" : "Upload case study cover"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="case-flagship"
                        className="w-4 h-4 rounded accent-[#FF5A1F]"
                        checked={caseForm.flagship}
                        onChange={e => setCaseForm({...caseForm, flagship: e.target.checked})}
                      />
                      <label htmlFor="case-flagship" className="text-sm text-zinc-300 select-none cursor-pointer">Flagship Case Study</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="case-published"
                        className="w-4 h-4 rounded accent-[#FF5A1F]"
                        checked={caseForm.published}
                        onChange={e => setCaseForm({...caseForm, published: e.target.checked})}
                      />
                      <label htmlFor="case-published" className="text-sm text-zinc-300 select-none cursor-pointer">Published immediately</label>
                    </div>
                  </div>

                  {caseError && <p className="text-sm text-red-400 font-medium">{caseError}</p>}
                  {caseSuccess && <p className="text-sm text-emerald-400 font-medium">{caseSuccess}</p>}
                  {globalUploading && <p className="text-sm text-[#FF5A1F] font-medium animate-pulse">Uploading cover image to Cloudinary...</p>}

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={globalUploading}
                      className="btn-primary flex-1 justify-center"
                    >
                      {globalUploading ? "Uploading Asset..." : caseEditMode ? "Save Changes" : "Create Case Study"}
                    </button>
                    {caseEditMode && (
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => {
                          setCaseEditMode(false);
                          setCaseForm({
                            brand: "",
                            slug: "",
                            category: "",
                            headline: "",
                            sub: "",
                            content: "",
                            flagship: false,
                            published: true,
                            cover_image: ""
                          });
                          setCaseFile(null);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Existing Case Studies ({caseStudies.length})</h3>
                {caseStudies.length === 0 ? (
                  <p className="text-zinc-500">No custom case studies found in the database.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseStudies.map(s => (
                      <div key={s.id} className="border border-[#1a1a1a] rounded-xl p-5 bg-[#0a0a0a] flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h4 className="font-semibold text-white text-lg line-clamp-1">{s.brand}</h4>
                            <div className="flex gap-1.5 flex-wrap">
                              {s.flagship && (
                                <span className="bg-[#FF5A1F]/20 text-[#FF5A1F] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-[#FF5A1F]/30">
                                  Flagship
                                </span>
                              )}
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${s.published ? "bg-emerald-950/80 text-emerald-400 border border-emerald-900" : "bg-zinc-800 text-zinc-400"}`}>
                                {s.published ? "Published" : "Draft"}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-[#FF5A1F] mono mb-2">/case-studies/{s.slug}</p>
                          <p className="text-sm text-zinc-400 font-medium mb-1">{s.headline}</p>
                          <p className="text-sm text-zinc-400 line-clamp-2">{s.sub}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4 mt-3">
                          <span className="text-xs text-zinc-500">{s.category}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCaseEditTrigger(s)}
                              className="p-2 rounded-lg bg-black hover:bg-zinc-800 text-zinc-300 border border-[#1a1a1a]"
                              title="Edit case"
                            >
                              <Edit2 size={13} />
                            </button>
                            <a
                              href={`/case-studies/${s.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-black hover:bg-zinc-800 text-zinc-300 border border-[#1a1a1a]"
                              title="View case"
                            >
                              <Eye size={13} />
                            </a>
                            <button
                              onClick={() => handleCaseDelete(s.slug)}
                              className="p-2 rounded-lg bg-black hover:bg-red-950/40 text-zinc-500 hover:text-red-400 border border-[#1a1a1a]"
                              title="Delete case"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
