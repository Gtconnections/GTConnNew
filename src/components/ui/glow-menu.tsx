"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/*
  Glow Menu (adaptado de 21st.dev para GT Connections)
  - Tema claro fijo, tokens propios, más padding (aire).
  - Glow recortado en su propia capa para que el submenú NO se corte.
  - Navegación real (next/link) + submenú desplegable en items con children.
*/

export interface GlowSubItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface GlowMenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  external?: boolean;
  gradient: string;
  iconColor: string;
  children?: GlowSubItem[];
}

interface MenuBarProps extends React.HTMLAttributes<HTMLElement> {
  items: GlowMenuItem[];
  activeItem?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: EASE },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

function Face({ item, isActive }: { item: GlowMenuItem; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <>
      <span
        className={cn(
          "transition-colors duration-300",
          isActive ? item.iconColor : "text-ink-400 group-hover:text-brand-600",
        )}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="whitespace-nowrap">{item.label}</span>
      {item.children && item.children.length > 0 && (
        <svg
          className="h-3.5 w-3.5 text-ink-400 transition-transform duration-300 group-hover/nav:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
    </>
  );
}

export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  ({ className, items, activeItem, leading, trailing, ...props }, ref) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "relative rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-lg",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...(props as React.ComponentProps<typeof motion.nav>)}
      >
        {/* Glow radial recortado en su propia capa (no corta los submenús) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            aria-hidden
            className="absolute -inset-6 rounded-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.18), rgba(139,92,246,0.12) 40%, transparent 70%)",
            }}
            variants={navGlowVariants}
          />
        </div>

        <div className="relative z-10 flex items-center gap-1.5">
          {leading}
          <ul className="flex items-center gap-1.5">
            {items.map((item) => {
              const isActive = item.label === activeItem;
              const hasChildren = !!item.children?.length;

              const flip = (
                <motion.div
                  className="group relative block overflow-visible rounded-xl"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-0"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{ background: item.gradient, opacity: isActive ? 1 : 0, borderRadius: "16px" }}
                  />
                  <motion.div
                    className={cn(
                      "relative z-10 flex items-center gap-2 rounded-xl bg-transparent px-5 py-3 text-sm font-medium transition-colors",
                      isActive ? "text-ink-900" : "text-ink-500 group-hover:text-ink-900",
                    )}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                  >
                    <Face item={item} isActive={isActive} />
                  </motion.div>
                  <motion.div
                    className={cn(
                      "absolute inset-0 z-10 flex items-center gap-2 rounded-xl bg-transparent px-5 py-3 text-sm font-medium transition-colors",
                      isActive ? "text-ink-900" : "text-ink-500 group-hover:text-ink-900",
                    )}
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                  >
                    <Face item={item} isActive={isActive} />
                  </motion.div>
                </motion.div>
              );

              return (
                <li key={item.label} className="group/nav relative">
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                      {flip}
                    </a>
                  ) : (
                    <Link href={item.href} className="block">
                      {flip}
                    </Link>
                  )}

                  {/* Submenú desplegable */}
                  {hasChildren && (
                    <div className="pointer-events-none absolute left-0 top-full z-30 translate-y-1.5 pt-3 opacity-0 transition-all duration-300 group-hover/nav:pointer-events-auto group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                      <div className="w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                        {item.children!.map((c) =>
                          c.external ? (
                            <a
                              key={c.label}
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            >
                              {c.label}
                            </a>
                          ) : (
                            <Link
                              key={c.label}
                              href={c.href}
                              className="flex items-center rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                            >
                              {c.label}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {trailing}
        </div>
      </motion.nav>
    );
  },
);

MenuBar.displayName = "MenuBar";
