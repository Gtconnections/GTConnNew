"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import type { PageContent, SiteConfig } from "@/lib/types";

/* Icono de marca de red social (lucide ya no trae logos). */
function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactSection({
  contact,
  site,
}: {
  contact: NonNullable<PageContent["contact"]>;
  site: SiteConfig;
}) {
  const subjects = contact.subjects ?? [
    "Web Development",
    "Mobile App",
    "Landing Page",
    "Hosting & Domains",
    "Reseller Program",
    "Other",
  ];
  const emailTo = contact.emailTo ?? site.contact.email;

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: subjects[0], message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[Website] ${form.subject} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service: ${form.subject}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const address = [site.address?.addressLocality, site.address?.addressRegion, site.address?.addressCountry]
    .filter(Boolean)
    .join(", ");

  const field =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 shadow-sm outline-none transition-all placeholder:text-ink-500/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-200";

  return (
    <section className="section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Información de contacto */}
          <div className="gt-rise lg:col-span-2">
            {contact.title && (
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">{contact.title}</h2>
            )}
            {contact.text && <p className="mt-3 leading-relaxed text-ink-500">{contact.text}</p>}

            <ul className="mt-8 space-y-4">
              <InfoRow icon={<Phone className="size-5" />} label="Phone">
                {site.contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/[^+\d]/g, "")}`} className="block hover:text-brand-700">
                    {p}
                  </a>
                ))}
              </InfoRow>
              <InfoRow icon={<Mail className="size-5" />} label="Email">
                <a href={`mailto:${site.contact.email}`} className="hover:text-brand-700">
                  {site.contact.email}
                </a>
              </InfoRow>
              {address && (
                <InfoRow icon={<MapPin className="size-5" />} label="Location">
                  {address}
                </InfoRow>
              )}
              {contact.hours && (
                <InfoRow icon={<Clock className="size-5" />} label="Hours">
                  {contact.hours}
                </InfoRow>
              )}
            </ul>

            <div className="mt-8 flex gap-3">
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-700"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-700"
              >
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Formulario */}
          <div className="gt-rise lg:col-span-3" style={{ animationDelay: "120ms" }}>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="size-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-ink-900">Almost there!</h3>
                  <p className="mt-2 max-w-sm text-ink-500">
                    Your email draft is ready in your mail app. Send it and we&apos;ll get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="btn-outline mt-6"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Name</label>
                      <input required value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
                      <input required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Phone</label>
                      <input value={form.phone} onChange={set("phone")} className={field} placeholder="+1 (___) ___-____" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Service</label>
                      <select value={form.subject} onChange={set("subject")} className={field}>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={set("message")}
                      rows={5}
                      className={`${field} resize-y`}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary group w-full py-3.5 text-base"
                  >
                    Send message
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="text-center text-xs text-ink-500">
                    We&apos;ll reply to your email as soon as possible.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
        <div className="mt-0.5 text-sm font-medium text-ink-900">{children}</div>
      </div>
    </li>
  );
}
