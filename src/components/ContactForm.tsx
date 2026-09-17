"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/types";

/**
 * Formulario de contacto.
 * Por ahora abre el cliente de correo (mailto) con los datos, replicando el
 * comportamiento simple del sitio actual e incluyendo la verificación
 * matemática anti-spam. Cuando exista backend (Supabase / API route), se
 * cambia handleSubmit por un fetch a /api/contact.
 */
export default function ContactForm({ site }: { site: SiteConfig }) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const answer = Number(data.get("captcha"));
    if (answer !== 49) {
      setError("Please solve the verification: 3 x 3 + 40 = 49");
      return;
    }
    setError(null);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    const subject = encodeURIComponent("Contact from gtconnections.com");
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink-700">Your Name</label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink-700">Your Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink-700">Your Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink-700">3 x 3 + 40 =</label>
        <input
          name="captcha"
          inputMode="numeric"
          required
          className="w-32 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary self-start">
        Resolve
      </button>
    </form>
  );
}
