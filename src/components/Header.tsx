"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, LayoutGrid, Store, Mail, ArrowRight } from "lucide-react";
import SmartLink from "@/components/SmartLink";
import { MenuBar, type GlowMenuItem } from "@/components/ui/glow-menu";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";

const g = (rgb: string) =>
  `radial-gradient(circle, rgba(${rgb},0.16) 0%, rgba(${rgb},0.06) 50%, rgba(${rgb},0) 100%)`;

const MENU: (GlowMenuItem & { match: string[] })[] = [
  { icon: Home, label: "Home", href: "/", gradient: g("29,102,241"), iconColor: "text-brand-600", match: ["/"] },
  { icon: Info, label: "About", href: "/about-us", gradient: g("14,165,233"), iconColor: "text-sky-500", match: ["/about-us"] },
  {
    icon: LayoutGrid,
    label: "Services",
    href: "/web-development",
    gradient: g("99,102,241"),
    iconColor: "text-indigo-500",
    match: ["/web-development", "/app-development", "/landing-pages", "/influencers"],
    children: [
      { label: "Web development", href: "/web-development" },
      { label: "Landing Pages", href: "/landing-pages" },
      { label: "Mobile App Development", href: "/app-development" },
      { label: "Influencers", href: "/influencers" },
      { label: "Online Services", href: "https://www.secureserver.net?pl_id=531354", external: true },
    ],
  },
  { icon: Store, label: "Reseller", href: "/reseller-program", gradient: g("139,92,246"), iconColor: "text-violet-500", match: ["/reseller-program"] },
  { icon: Mail, label: "Contact", href: "/contact-us", gradient: g("6,182,212"), iconColor: "text-cyan-500", match: ["/contact-us"] },
];

function Brand() {
  return (
    <Link href="/" className="shrink-0 px-2" aria-label="GT Connections — Home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="GT Connections" className="h-6 w-auto sm:h-7" />
    </Link>
  );
}

function CircleCta() {
  return (
    <Link
      href="/contact-us"
      title="Start With Us"
      aria-label="Start With Us"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30 transition-all hover:scale-105 hover:bg-brand-700"
    >
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

export default function Header({ nav }: { brandText: string; nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const active = MENU.find((m) => m.match.includes(pathname))?.label ?? "";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 24) setHidden(false);
      else if (y > last + 5) {
        setHidden(true);
        setOpen(false);
      } else if (y < last - 5) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-all duration-500 ease-out",
        hidden ? "pointer-events-none -translate-y-[160%] opacity-0 blur-md" : "translate-y-0 opacity-100 blur-0",
      )}
    >
      <div className="relative w-full max-w-5xl">
        {/* Desktop: pill flotante con logo + items + botón circular */}
        <div className="hidden justify-center lg:flex">
          <MenuBar
            items={MENU}
            activeItem={active}
            leading={<Brand />}
            trailing={<div className="pl-1"><CircleCta /></div>}
          />
        </div>

        {/* Mobile: pill compacto */}
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-lg lg:hidden">
          <Brand />
          <div className="flex items-center gap-2">
            <CircleCta />
            <button
              type="button"
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-slate-100"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile: menú desplegable flotante */}
        {open && (
          <nav className="mx-auto mt-2 flex max-w-md flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-xl lg:hidden">
            {nav.map((item) => (
              <MobileNavItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
            ))}
            <Link href="/contact-us" className="btn-primary mt-3" onClick={() => setOpen(false)}>
              Start With Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (item.children?.length) {
    return (
      <div className="py-1">
        <p className="px-1 py-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
          {item.label}
        </p>
        <div className="flex flex-col">
          {item.children.map((child) => (
            <SmartLink
              key={child.label}
              href={child.href!}
              external={child.external}
              className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-brand-50"
            >
              {child.label}
            </SmartLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SmartLink
      href={item.href!}
      external={item.external}
      className="rounded-lg px-1 py-2 text-sm font-medium text-ink-900 hover:text-brand-700"
    >
      <span onClick={onNavigate}>{item.label}</span>
    </SmartLink>
  );
}
