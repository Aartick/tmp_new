"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

const API = `/api`;

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${API}/blog`).then(r => setPosts(r.data.posts)).finally(() => setLoading(false));
  }, []);
  return (
    <div className="pt-28 lg:pt-32" data-testid="blog-page">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <p className="tmp-label">Blog · Field Notes</p>
          <h1 className="mt-3 text-5xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.02] max-w-4xl text-white">
            Marketplace growth, <span className="italic font-normal text-[#FF5A1F]">unfiltered.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl">
            What we've learned from scaling D2C brands across Amazon, Flipkart and quick commerce — written for operators.
          </p>
        </div>
      </section>

      <section className="pb-24 border-t border-[#1a1a1a] pt-16">
        <div className="container-tmp">
          {loading ? <p className="text-zinc-500">Loading…</p> : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <Link href={`/blog/${p.slug}`} key={p.slug} className="tmp-card flex flex-col p-0 overflow-hidden" data-testid={`blog-card-${p.slug}`}>
                  {p.cover_image && <div className="h-48 overflow-hidden bg-[#0a0a0a]"><img src={p.cover_image} alt={p.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" /></div>}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags?.slice(0,2).map(t => <span key={t} className="mono text-[10px] tracking-[0.15em] uppercase text-[#FF5A1F]">#{t}</span>)}
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-white">{p.title}</h3>
                    <p className="mt-3 text-sm text-zinc-400 flex-1">{p.excerpt}</p>
                    <p className="mt-5 mono text-xs text-zinc-500">By {p.author}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#FF5A1F] link-underline">Read post <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function renderMarkdown(md) {
  const lines = md.split("\n");
  const out = [];
  let listBuf = [];
  const flushList = () => {
    if (listBuf.length) {
      out.push(<ul key={`l-${out.length}`} className="my-4 space-y-2 list-disc pl-6 text-zinc-300">{listBuf.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>);
      listBuf = [];
    }
  };
  const inline = (t) => t
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-white'>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#FF5A1F] underline">$1</a>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
  lines.forEach((l, i) => {
    if (l.startsWith("### ")) { flushList(); out.push(<h3 key={i} className="text-xl font-medium mt-8 mb-3 tracking-tight text-white">{l.slice(4)}</h3>); }
    else if (l.startsWith("## ")) { flushList(); out.push(<h2 key={i} className="text-2xl lg:text-3xl font-medium mt-10 mb-4 tracking-tight text-white">{l.slice(3)}</h2>); }
    else if (/^\d+\.\s/.test(l) || l.startsWith("- ")) { listBuf.push(inline(l.replace(/^(\d+\.\s|-\s)/, ""))); }
    else if (l.trim() === "") { flushList(); }
    else { flushList(); out.push(<p key={i} className="my-4 text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: inline(l) }} />); }
  });
  flushList();
  return out;
}

