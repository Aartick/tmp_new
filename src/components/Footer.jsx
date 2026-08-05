"use client";
import Link from 'next/link';
import { Instagram, Youtube, Facebook, AtSign, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import { SITE, MARKETPLACES } from "../data";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-zinc-300 border-t border-[#1a1a1a]" data-testid="footer">
      <div className="container-tmp py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h3 className="text-white text-3xl lg:text-5xl font-medium tracking-tight leading-[1.05]">
              Ready to grow on <span className="text-[#FF5A1F]">marketplaces?</span>
            </h3>
            <p className="mt-4 text-zinc-400 max-w-md">
              Trusted by 80+ D2C brands across Amazon, Flipkart, Tata 1mg & quick commerce.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {MARKETPLACES.map(m => {
                const heightClass = {
                  Flipkart: "h-[28px]",
                  Instamart: "h-[30px]",
                  Blinkit: "h-[26px]",
                  Amazon: "h-[20px]",
                  Myntra: "h-[24px]",
                  Nykaa: "h-[24px]",
                  Zepto: "h-[20px]"
                }[m.name] || "h-5";

                return (
                  <div 
                    key={m.name} 
                    className="group/logo flex items-center justify-center h-12 w-[110px] px-3 border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] hover:border-[#FF5A1F]/40 hover:bg-[#0f0f0f]/80 transition duration-300"
                    title={m.name}
                  >
                    <img 
                      src={m.logo} 
                      alt={m.name} 
                      className={`${heightClass} max-w-full object-contain filter grayscale brightness-[2.5] contrast-[0.8] opacity-65 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 group-hover/logo:contrast-100 group-hover/logo:opacity-100 transition duration-300`} 
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="tmp-label">Explore</p>
            <ul className="mt-4 space-y-2.5 text-zinc-300">
              <li><Link className="hover:text-[#FF5A1F]" href="/services">Services</Link></li>
              <li><Link className="hover:text-[#FF5A1F]" href="/case-studies">Case Studies</Link></li>
              <li><Link className="hover:text-[#FF5A1F]" href="/about">About</Link></li>
              <li><Link className="hover:text-[#FF5A1F]" href="/blog">Blog</Link></li>
              <li><Link className="hover:text-[#FF5A1F]" href="/careers">Careers</Link></li>
              <li><Link className="hover:text-[#FF5A1F]" href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="tmp-label">Get in touch</p>
            <a href={`mailto:${SITE.email}`} className="block mt-4 text-white text-lg hover:text-[#FF5A1F] inline-flex items-center gap-2"><Mail size={14} /> {SITE.email}</a>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { href: SITE.socials.instagram, Icon: Instagram, tid: "social-instagram" },
                { href: SITE.socials.threads, Icon: AtSign, tid: "social-threads" },
                { href: SITE.socials.youtube, Icon: Youtube, tid: "social-youtube" },
                { href: SITE.socials.facebook, Icon: Facebook, tid: "social-facebook" },
                { href: "https://www.linkedin.com/in/himanshu-singh-bhandari-728397238/", Icon: Linkedin, tid: "social-linkedin" },
              ].map(({ href, Icon, tid }) => (
                <a key={tid} href={href} target="_blank" rel="noreferrer" className="w-11 h-11 grid place-items-center border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition" data-testid={tid}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-white link-underline">
              Book a free audit <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} The Marketplace Peeps. Built to scale marketplace revenue.</p>
          <p className="mono">v2.0 · MARKETPLACE DOMINATION</p>
        </div>
      </div>
    </footer>
  );
}
