import React from "react";
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { getDb } from "@/lib/mongodb";

export const metadata = {
  title: "Field Notes & Growth Teardowns | The Marketplace Peeps",
  description: "What we've learned from scaling D2C brands across Amazon, Flipkart and quick commerce — written for operators.",
};

export default async function BlogList() {
  let posts = [];
  try {
    const db = await getDb();
    posts = await db.collection("blog")
      .find({ published: true }, { projection: { _id: 0, content: 0 } })
      .sort({ created_at: -1 })
      .limit(100)
      .toArray();
  } catch (err) {
    console.error("Failed to fetch blog list in SSR:", err);
  }

  return (
    <div className="pt-28 lg:pt-32" data-testid="blog-page">
      <section className="py-16 relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="container-tmp relative">
          <p className="mono text-xs tracking-[0.22em] uppercase text-[#FF5A1F] mb-3">Blog · Field Notes</p>
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
          {posts.length === 0 ? (
            <p className="text-zinc-500 text-center py-10">No articles published yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <Link href={`/blog/${p.slug}`} key={p.slug} className="tmp-card flex flex-col p-0 overflow-hidden" data-testid={`blog-card-${p.slug}`}>
                  {p.cover_image && (
                    <div className="h-48 overflow-hidden bg-[#0a0a0a]">
                      <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                    </div>
                  )}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags?.slice(0,2).map(t => (
                        <span key={t} className="mono text-[10px] tracking-[0.15em] uppercase text-[#FF5A1F]">#{t}</span>
                      ))}
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
