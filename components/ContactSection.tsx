"use client";
import React, { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  border: "1px solid var(--gd-border)",
  background: "#ffffff",
  fontSize: 14,
  color: "var(--gd-ink)",
  outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
  borderRadius: 10,
  transition: "border-color 0.2s",
  appearance: "none" as const,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: 36,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--gd-muted)",
  marginBottom: 8,
  display: "block",
};

function focusBorder(e: React.FocusEvent<HTMLElement>) {
  (e.target as HTMLElement).style.borderColor = "var(--gd-teal)";
}
function blurBorder(e: React.FocusEvent<HTMLElement>) {
  (e.target as HTMLElement).style.borderColor = "var(--gd-border)";
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginTop: 2, flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6" stroke="var(--gd-gold)" strokeWidth="1" fill="none" />
      <path d="M4 7l2 2 4-4" stroke="var(--gd-gold)" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function ContactSection({ get }: any) {
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

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xnnbewjw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else alert(get(["form", "errorText"], "Something went wrong. Please try again."));
    } catch {
      alert(get(["form", "errorText"], "Submission failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    { value: "buying",   label: get(["form", "service_buying"],   "🛒 Kupno") },
    { value: "selling",  label: get(["form", "service_selling"],  "💰 Sprzedaż") },
    { value: "renting",  label: get(["form", "service_renting"],  "🏠 Wynajem") },
    { value: "cleaning", label: get(["form", "service_cleaning"], "🧹 Sprzątanie mieszkania") },
    { value: "repairs",  label: get(["form", "service_repairs"],  "🔧 Drobne naprawy") },
    { value: "painting", label: get(["form", "service_painting"], "🎨 Malowanie / odświeżanie") },
    { value: "valuation", label: get(["form", "service_valuation"], "📋 Bezpłatna wycena mieszkania") },
  ];

  const typeOptions = [
    { value: "apartment",  label: get(["form", "type_apartment"],  "Mieszkanie") },
    { value: "house",      label: get(["form", "type_house"],      "Dom") },
    { value: "plot",       label: get(["form", "type_plot"],       "Działka") },
    { value: "commercial", label: get(["form", "type_commercial"], "Lokal") },
  ];

  const timelineOptions = [
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

  const contactItems = [
    {
      label: get(["contact", "email", "label"], "E-mail"),
      value: get(["contact", "email", "value"], "granddom7@op.pl"),
      href: `mailto:${get(["contact", "email", "value"], "granddom7@op.pl")}`,
    },
    {
      label: get(["contact", "phone", "label"], "Telefon"),
      value: get(["contact", "phone", "value"], "+48 886 193 598"),
      href: `tel:${get(["contact", "phone", "value"], "+48886193598").replace(/[\s()]/g, "")}`,
    },
    {
      label: get(["contact", "location", "label"], "Lokalizacja"),
      value: get(["contact", "location", "value"], "Warszawa, Polska"),
      href: undefined,
    },
    {
      label: get(["contact", "website", "label"], "Strona"),
      value: get(["contact", "website", "value"], "www.granddom.com"),
      href: undefined,
    },
  ];

  const whyItems: string[] = get(["whyChoose", "items"], [
    "Odpowiadamy w ciągu 24 godzin",
    "Pierwsza konsultacja bez opłat",
    "Indywidualne podejście",
    "Znamy Warszawę dzielnica po dzielnicy",
  ]);

  return (
    <section
      id="contact"
      className="gd-section"
      style={{
        padding: "100px clamp(20px, 5vw, 48px)",
        background: "var(--gd-cream)",
      }}
    >
      <div
        className="gd-contact-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 80,
        }}
      >
        {/* Sidebar */}
        <div>
          <div className="gd-label" style={{ marginBottom: 16 }}>
            {get(["contact", "getInTouch"], "Skontaktuj się")}
          </div>
          <h2
            className="gd-heading"
            style={{
              fontSize: "clamp(32px, 3vw, 44px)",
              fontWeight: 300,
              color: "var(--gd-ink)",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            {get(["contact", "heading"], "Zacznijmy")}
            <br />
            <em style={{ fontStyle: "italic" }}>
              {get(["contact", "heading2"], "rozmowę")}
            </em>
          </h2>

          <div style={{ width: 48, height: 2, background: "var(--gd-gold)", margin: "20px 0" }} />

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 15,
              color: "var(--gd-muted)",
              lineHeight: 1.85,
              marginBottom: 40,
            }}
          >
            {get(
              ["contact", "intro"],
              "Napisz, zadzwoń albo wpadnij na kawę. Odpowiadamy w ciągu doby — bez automatycznych wiadomości i bez naciągania."
            )}
          </p>

          {contactItems.map(({ label, value, href }) => (
            <div
              key={label}
              style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--gd-border)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gd-gold)",
                  marginBottom: 6,
                }}
              >
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 15, color: "var(--gd-ink)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gd-teal)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gd-ink)")}
                >
                  {value}
                </a>
              ) : (
                <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 15, color: "var(--gd-ink)" }}>
                  {value}
                </div>
              )}
            </div>
          ))}

          <div
            style={{
              background: "var(--gd-teal)",
              padding: "34px 30px",
              borderRadius: 14,
              boxShadow: "0 24px 50px -25px rgba(20,60,40,0.5)",
            }}
          >
            <div className="gd-label" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
              {get(["whyChoose", "title"], "Dlaczego GRAND DOM")}
            </div>
            {whyItems.map((item: string) => (
              <div key={item} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                <CheckIcon />
                <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form panel */}
        <div
          className="gd-form-panel"
          style={{
            background: "#ffffff",
            padding: "52px 48px",
            borderRadius: 16,
            boxShadow: "0 1px 2px rgba(20,40,30,0.04), 0 24px 50px -25px rgba(20,40,30,0.18)",
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div className="gd-heading" style={{ fontSize: 52, color: "var(--gd-teal)", marginBottom: 16, fontWeight: 300 }}>
                {get(["form", "successTitle"], "Dziękujemy")}
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 15, color: "var(--gd-muted)" }}>
                {get(["form", "successText"], "Odezwiemy się w ciągu 24 godzin.")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="gd-heading" style={{ fontSize: 26, color: "var(--gd-ink)", marginBottom: 8, fontWeight: 400 }}>
                {get(["contactPage", "title"], "Opowiedz nam, czego szukasz")}
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 13, color: "var(--gd-muted)", marginBottom: 32, lineHeight: 1.6 }}>
                {get(["contactPage", "subtitle"], "Im więcej szczegółów napiszesz, tym lepiej dopasujemy ofertę.")}
              </p>

              {/* Row 1: Name + Email */}
              <div
                className="gd-form-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}
              >
                <div>
                  <label style={labelStyle}>{get(["form", "nameLabel"], "Imię i nazwisko *")}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    style={inputStyle}
                    placeholder={get(["form", "namePlaceholder"], "Anna Kowalska")}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{get(["form", "emailLabel"], "E-mail *")}</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    style={inputStyle}
                    placeholder={get(["form", "emailPlaceholder"], "anna@example.com")}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
              </div>

              {/* Row 2: Phone + Service */}
              <div
                className="gd-form-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}
              >
                <div>
                  <label style={labelStyle}>{get(["form", "phoneLabel"], "Telefon")}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    style={inputStyle}
                    placeholder="+48 000 000 000"
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{get(["form", "serviceLabel"], "Czego szukasz? *")}</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => {
                      set("service", e.target.value);
                      set("price", "");
                    }}
                    style={selectStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  >
                    <option value="">{get(["form", "servicePlaceholder"], "Wybierz usługę")}</option>
                    {serviceOptions.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Type + Timeline */}
              <div
                className="gd-form-row"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}
              >
                <div>
                  <label style={labelStyle}>{get(["form", "typeLabel"], "Cel / Typ")}</label>
                  <select
                    value={form.type}
                    onChange={(e) => set("type", e.target.value)}
                    style={selectStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  >
                    <option value="">{get(["form", "typePlaceholder"], "Wybierz cel")}</option>
                    {typeOptions.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{get(["form", "timelineLabel"], "Termin")}</label>
                  <select
                    value={form.timeline}
                    onChange={(e) => set("timeline", e.target.value)}
                    style={selectStyle}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  >
                    <option value="">{get(["form", "timelinePlaceholder"], "Kiedy?")}</option>
                    {timelineOptions.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditional: Price range — only for buying or renting */}
              {showPrice && (
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>{get(["form", "priceLabel"], "Zakres cenowy (zł)")}</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    style={inputStyle}
                    placeholder={pricePlaceholder}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 12,
                      color: "var(--gd-muted)",
                      marginTop: 8,
                    }}
                  >
                    {priceHelper}
                  </p>
                </div>
              )}

              {/* Message */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>{get(["form", "messageLabel"], "Wiadomość *")}</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
                  placeholder={get(["form", "messagePlaceholder"], "Napisz parę słów o swoich potrzebach, budżecie, terminach…")}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "17px",
                  background: loading ? "var(--gd-muted)" : "var(--gd-teal)",
                  color: "#ffffff",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  borderRadius: 999,
                  boxShadow: "0 12px 30px -12px rgba(20,60,40,0.5)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.26 0.09 148)";
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "var(--gd-teal)";
                }}
              >
                {loading
                  ? get(["form", "submittingText"], "Wysyłanie…")
                  : get(["form", "send"], "Wyślij wiadomość")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
