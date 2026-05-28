"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    axios.get(`${API}/blog/${slug}`).then(r => setPost(r.data)).catch(() => setError("Post not found"));
  }, [slug]);
  if (error) return <div className="pt-32 container-tmp text-zinc-400"><p>{error}</p><Link href="/blog" className="text-[#FF5A1F] link-underline">← Back to blog</Link></div>;
  if (!post) return <div className="pt-32 container-tmp text-zinc-400"><p>Loading…</p></div>;
  return (
    <div className="pt-28 lg:pt-32" data-testid={`blog-detail-${slug}`}>
      <article className="py-16">
        <div className="container-tmp max-w-3xl">
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-[#FF5A1F]">← Back to all posts</Link>
          <div className="mt-6 flex gap-2 flex-wrap">
            {post.tags?.map(t => <span key={t} className="mono text-[10px] tracking-[0.18em] uppercase text-[#FF5A1F]">#{t}</span>)}
          </div>
          <h1 className="mt-3 text-4xl lg:text-6xl font-medium tracking-[-0.04em] leading-[1.05] text-white">{post.title}</h1>
          <p className="mt-4 mono text-sm text-zinc-500">By {post.author}</p>
          {post.cover_image && <img src={post.cover_image} alt={post.title} className="mt-8 w-full h-72 object-cover rounded-2xl" />}
          <div className="mt-10">
            {renderMarkdown(post.content)}
          </div>
        </div>
      </article>
    </div>
  );
}
