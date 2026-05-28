"use client";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from "lucide-react";
import { SITE } from "../data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ onAuditClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a]" : "bg-transparent"}`}
    >
      <div className="container-tmp flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2.5 group" data-testid="logo-link">
          <div className="w-9 h-9 rounded-lg bg-white grid place-items-center group-hover:scale-105 transition">
            <img src={SITE.logoUrl} alt="TMP" className="h-6 w-auto" />
          </div>
          <span className="hidden md:inline mono text-[11px] tracking-[0.22em] uppercase text-zinc-400">
            The Marketplace Peeps
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(n => (
            <Link key={n.to}
              href={n.to}
              data-testid={`nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}
              className={`text-sm font-medium transition ${pathname === n.to ? "text-[#FF5A1F]" : "text-zinc-300 hover:text-white"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            data-testid="navbar-audit-cta"
            onClick={onAuditClick}
            className="hidden lg:inline-flex btn-primary text-sm py-2.5 px-5"
          >
            Free Audit <ArrowRight size={14} />
          </button>
          <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} data-testid="menu-toggle">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#050505] border-t border-[#1a1a1a]">
          <div className="container-tmp py-4 flex flex-col gap-3">
            {NAV.map(n => (
              <Link key={n.to} href={n.to} className="text-base font-medium py-2 border-b border-[#1a1a1a] text-zinc-200">{n.label}</Link>
            ))}
            <button onClick={onAuditClick} className="btn-primary mt-2 justify-center">Free Audit <ArrowRight size={14} /></button>
          </div>
        </div>
      )}
    </header>
  );
}
