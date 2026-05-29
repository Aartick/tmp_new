import React from "react";
import Link from 'next/link';
import { getDb } from "@/lib/mongodb";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const db = await getDb();
    const post = await db.collection("blog").findOne(
      { slug: slug, published: true },
      { projection: { title: 1, excerpt: 1, cover_image: 1 } }
    );
    
    if (!post) {
      return { title: "Post Not Found" };
    }
    
    return {
      title: `${post.title} | The Marketplace Peeps Blog`,
      description: post.excerpt || `Read the latest field notes on marketplace scaling: ${post.title}`,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.cover_image ? [{ url: post.cover_image }] : [],
      }
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return { title: "Blog Post" };
  }
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  let post = null;
  try {
    const db = await getDb();
    post = await db.collection("blog").findOne(
      { slug: slug, published: true },
      { projection: { _id: 0 } }
    );
  } catch (err) {
    console.error("Failed to query blog detail in SSR:", err);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 lg:pt-32" data-testid={`blog-detail-${slug}`}>
      <article className="py-16">
        <div className="container-tmp max-w-3xl">
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-[#FF5A1F]">← Back to all posts</Link>
          <div className="mt-6 flex gap-2 flex-wrap">
            {post.tags?.map(t => (
              <span key={t} className="mono text-[10px] tracking-[0.18em] uppercase text-[#FF5A1F]">#{t}</span>
            ))}
          </div>
          <h1 className="mt-3 text-4xl lg:text-6xl font-medium tracking-[-0.04em] leading-[1.05] text-white">{post.title}</h1>
          <p className="mt-4 mono text-sm text-zinc-500">By {post.author}</p>
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="mt-8 w-full h-72 object-cover rounded-2xl" />
          )}
          <div className="mt-10">
            {renderMarkdown(post.content || "")}
          </div>
        </div>
      </article>
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
