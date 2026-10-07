"use client";
import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Option = { value: string; label: string };

export default function ContactSection({
  get,
  as: Heading = "h2",
  serviceOptions,
  typeOptions,
  timelineOptions,
  homeHref,
  copyable = false,
}: {
  get: (path: string[], fallback?: any) => any;
  as?: "h1" | "h2";
  serviceOptions?: Option[];
  typeOptions?: Option[];
  timelineOptions?: Option[];
  homeHref?: string;
  copyable?: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    type: "",
    timeline: "",
    price: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const { copied, copyToClipboard } = useCopyToClipboard(2000);

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  // Lets CTAs elsewhere on the page preselect a service (e.g. free valuation)
  useEffect(() => {
    const onService = (e: Event) => set("service", (e as CustomEvent<string>).detail);
    window.addEventListener("gd:service", onService);
    return () => window.removeEventListener("gd:service", onService);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("https://formspree.io/f/xnnbewjw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const services = serviceOptions ?? [
    { value: "buying",   label: get(["form", "service_buying"],   "🛒 Kupno") },
    { value: "selling",  label: get(["form", "service_selling"],  "💰 Sprzedaż") },
    { value: "valuation", label: get(["form", "service_valuation"], "📋 Bezpłatna wycena mieszkania") },
  ];

  const types = typeOptions ?? [
    { value: "apartment",  label: get(["form", "type_apartment"],  "Mieszkanie") },
    { value: "house",      label: get(["form", "type_house"],      "Dom") },
    { value: "plot",       label: get(["form", "type_plot"],       "Działka") },
    { value: "commercial", label: get(["form", "type_commercial"], "Lokal") },
  ];

  const timelines = timelineOptions ?? [
    { value: "asap",     label: get(["form", "timeline_asap"],     "Jak najszybciej") },
    { value: "1month",   label: get(["form", "timeline_1month"],   "W ciągu 1 miesiąca") },
    { value: "3months",  label: get(["form", "timeline_3months"],  "W ciągu 3 miesięcy") },
    { value: "6months",  label: get(["form", "timeline_6months"],  "W ciągu 6 miesięcy") },
    { value: "flexible", label: get(["form", "timeline_flexible"], "Jestem elastyczny") },
  ];

  const showPrice = form.service === "buying" || form.service === "renting";
  const pricePlaceholder =
    form.service === "buying"
      ? get(["form", "pricePlaceholderBuying"], "np. 100000-250000")
      : get(["form", "pricePlaceholderRenting"], "np. 500-1500");
  const priceHelper =
    form.service === "buying"
      ? get(["form", "priceHelperBuying"], "Wprowadź całkowity przedział cenowy")
      : get(["form", "priceHelperRenting"], "Wprowadź miesięczny przedział cenowy");

  const email = get(["contact", "email", "value"], "granddom7@op.pl");
  const phone = get(["contact", "phone", "value"], "+48 886 193 598");
  const location = get(["contact", "location", "value"], "Warszawa, Polska");
  const website = get(["contact", "website", "value"], "");

  const copyButton = (value: string, type: "email" | "phone") =>
    copyable && (
      <button
        type="button"
        className="gd-copy"
        onClick={() => copyToClipboard(value, type)}
        aria-label={`${get(["ui", "copy"], "Kopiuj")}: ${value}`}
      >
        {copied === type ? <Check size={16} /> : <Copy size={16} />}
      </button>
    );

  return (
    <section id="contact" className="gd-on-forest gd-band">
      <div className="gd-wrap gd-split gd-contact-grid">
        {/* Intro + direct contact */}
        <div className="gd-stack">
          <Heading className="gd-h2 gd-h2--xl">
            {get(["contact", "heading"], "Zacznijmy")}{" "}
            <em className="gd-em">{get(["contact", "heading2"], "rozmowę")}</em>
          </Heading>
          <p className="gd-contact-intro">
            {get(
              ["contact", "intro"],
              "Napisz lub zadzwoń. Odpowiadamy w ciągu doby."
            )}
          </p>

          <div className="gd-contact-details">
            <span className="gd-contact-line">
              <a className="gd-contact-phone" href={`tel:${phone.replace(/[\s()]/g, "")}`}>
                {phone}
              </a>
              {copyButton(phone, "phone")}
            </span>
            <span className="gd-contact-line">
              <a href={`mailto:${email}`}>{email}</a>
              {copyButton(email, "email")}
            </span>
            <span>
              {location}
              {website && ` · ${website}`}
            </span>
          </div>

          {/* live region for screen readers */}
          <div aria-live="polite" className="sr-only">
            {copied === "email"
              ? get(["contact", "email", "copySuccess"], "Email address copied")
              : copied === "phone"
              ? get(["contact", "phone", "copySuccess"], "Phone number copied")
              : ""}
          </div>
        </div>

        {/* Form panel */}
        {sent ? (
          <div id="contact-form" className="gd-form gd-form-success" role="status">
            <div className="gd-form-title">{get(["form", "successTitle"], "Dziękujemy")}</div>
            <p>{get(["form", "successText"], "Odezwiemy się w ciągu 24 godzin.")}</p>
            {homeHref && (
              <a href={homeHref} className="gd-btn gd-btn--ink">
                {get(["ui", "backToHome"], "Powrót")}
              </a>
            )}
          </div>
        ) : (
          <form id="contact-form" className="gd-form" onSubmit={handleSubmit}>
            <div className="gd-form-title">
              {get(["contactPage", "title"], "Opowiedz nam, czego szukasz")}
            </div>
            <p className="gd-form-note">
              {get(["contactPage", "subtitle"], "Im więcej szczegółów napiszesz, tym lepiej dopasujemy ofertę.")}
            </p>

            <label className="gd-field">
              {get(["form", "nameLabel"], "Imię i nazwisko *")}
              <input
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder={get(["form", "namePlaceholder"], "Anna Kowalska")}
              />
            </label>

            <div className="gd-g2">
              <label className="gd-field">
                {get(["form", "phoneLabel"], "Telefon")}
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder={get(["form", "phonePlaceholder"], "+48 000 000 000")}
                />
              </label>
              <label className="gd-field">
                {get(["form", "emailLabel"], "E-mail *")}
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={get(["form", "emailPlaceholder"], "anna@example.com")}
                />
              </label>
            </div>

            <label className="gd-field">
              {get(["form", "serviceLabel"], "Czego szukasz? *")}
              <select
                required
                value={form.service}
                onChange={(e) => {
                  set("service", e.target.value);
                  set("price", "");
                }}
              >
                <option value="">{get(["form", "servicePlaceholder"], "Wybierz usługę")}</option>
                {services.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>

            <div className="gd-g2">
              <label className="gd-field">
                {get(["form", "typeLabel"], get(["form", "budgetLabel"], "Typ nieruchomości"))}
                <select value={form.type} onChange={(e) => set("type", e.target.value)}>
                  <option value="">
                    {get(["form", "typePlaceholder"], get(["form", "budgetPlaceholder"], "Wybierz typ"))}
                  </option>
                  {types.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="gd-field">
                {get(["form", "timelineLabel"], "Termin")}
                <select value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                  <option value="">{get(["form", "timelinePlaceholder"], "Kiedy?")}</option>
                  {timelines.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Conditional: Price range — only for buying or renting */}
            {showPrice && (
              <label className="gd-field">
                {get(["form", "priceLabel"], "Zakres cenowy (zł)")}
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder={pricePlaceholder}
                />
                <span className="gd-field-help">{priceHelper}</span>
              </label>
            )}

            <label className="gd-field">
              {get(["form", "messageLabel"], "Wiadomość *")}
              <textarea
                required
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder={get(["form", "messagePlaceholder"], "Napisz parę słów o swoich potrzebach, budżecie, terminach…")}
              />
            </label>

            {failed && (
              <p className="gd-form-error" role="alert">
                {get(["form", "errorText"], "Coś poszło nie tak. Spróbuj ponownie.")}
              </p>
            )}

            <button type="submit" disabled={loading} className="gd-btn gd-btn--accent">
              {loading
                ? get(["form", "submittingText"], "Wysyłanie…")
                : get(["form", "send"], "Wyślij wiadomość")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
