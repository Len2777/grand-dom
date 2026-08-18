"use client";
import React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   DANE KONKRETNEJ OFERTY — edytuj tutaj (bez bazy danych).
   Podmień listingUrl na link do ogłoszenia oraz zdjęcie/cenę.
   ───────────────────────────────────────────────────────────── */
const LISTING = {
  // Link do ogłoszenia (kliknięcie w kartę przenosi tutaj):
  listingUrl:
    "https://marki.nieruchomosci-online.pl/mieszkanie,m3,z-aneksem-kuchennym/26885816.html",
  // Zdjęcie z katalogu /public:
  image: "/photo_2026-08-11_19-55-54.jpg",
  // Cena (tekst dowolny) — UZUPEŁNIJ:
  price: "725 000 zł",
  // Kluczowe parametry mieszkania — UZUPEŁNIJ:
  area: "67 m²",
  rooms: "3 pokoje",
  location: "Marki",
};

export default function FeaturedOfferSection({ get }: any) {
  const label = get(["featuredOffer", "label"], "Oferta na sprzedaż");
  const heading = get(["featuredOffer", "heading"], "Mieszkanie na sprzedaż");
  const subheading = get(["featuredOffer", "subheading"], "w Warszawie");
  const description = get(
    ["featuredOffer", "description"],
    "Wyjątkowe mieszkanie w atrakcyjnej lokalizacji. Kliknij, aby zobaczyć pełne ogłoszenie, wszystkie zdjęcia i szczegóły."
  );
  const ctaLabel = get(["featuredOffer", "cta"], "Zobacz pełne ogłoszenie");
  const priceLabel = get(["featuredOffer", "priceLabel"], "Cena");
  const imageAlt = get(
    ["featuredOffer", "imageAlt"],
    "Mieszkanie na sprzedaż w Markach"
  );

  const specs = [LISTING.rooms, LISTING.area, LISTING.location].filter(Boolean);

  return (
    <section
      id="oferta"
      className="gd-section"
      style={{
        background: "var(--gd-cream)",
        padding: "96px clamp(20px, 5vw, 48px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Nagłówek sekcji */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="gd-label" style={{ marginBottom: 14 }}>
            {label}
          </div>
          <h2
            className="gd-heading"
            style={{
              fontSize: "clamp(30px, 3.4vw, 46px)",
              fontWeight: 300,
              color: "var(--gd-ink)",
              lineHeight: 1.12,
            }}
          >
            {heading}{" "}
            <em style={{ fontStyle: "italic", color: "var(--gd-teal)" }}>
              {subheading}
            </em>
          </h2>
        </div>

        {/* Klikalna karta oferty → Otodom */}
        <a
          href={LISTING.listingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ctaLabel} — ${heading}`}
          className="gd-card-hover gd-offer-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            background: "#ffffff",
            borderRadius: 20,
            overflow: "hidden",
            textDecoration: "none",
            color: "inherit",
            boxShadow: "0 24px 60px -28px rgba(0,0,0,0.22)",
            border: "1px solid var(--gd-border)",
          }}
        >
          {/* Zdjęcie */}
          <div
            className="gd-offer-img"
            style={{ position: "relative", minHeight: 420 }}
          >
            <Image
              src={LISTING.image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
            {/* Plakietka ceny */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                background: "var(--gd-gold)",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 999,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                boxShadow: "0 8px 24px -8px rgba(180,130,50,0.55)",
              }}
            >
              {LISTING.price}
            </div>
            {/* Znacznik: link zewnętrzny */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255,255,255,0.92)",
                borderRadius: 999,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px -4px rgba(0,0,0,0.25)",
              }}
              aria-hidden="true"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
                  stroke="var(--gd-teal)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Treść */}
          <div
            className="gd-offer-body"
            style={{
              padding: "48px clamp(28px, 4vw, 52px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gd-muted)",
                marginBottom: 8,
              }}
            >
              {priceLabel}
            </div>
            <div
              className="gd-heading"
              style={{
                fontSize: 40,
                fontWeight: 300,
                color: "var(--gd-teal)",
                lineHeight: 1,
                marginBottom: 24,
              }}
            >
              {LISTING.price}
            </div>

            <div
              style={{
                width: 48,
                height: 2,
                background: "var(--gd-gold)",
                marginBottom: 24,
              }}
            />

            {/* Parametry */}
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 12px",
                listStyle: "none",
                margin: "0 0 28px",
                padding: 0,
              }}
            >
              {specs.map((s, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 13,
                    color: "var(--gd-ink)",
                    background: "var(--gd-cream)",
                    border: "1px solid var(--gd-border)",
                    padding: "7px 14px",
                    borderRadius: 999,
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 15,
                color: "var(--gd-muted)",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              {description}
            </p>

            {/* Przycisk CTA (cała karta i tak jest klikalna) */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "var(--gd-teal)",
                color: "#fff",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "14px 28px",
                borderRadius: 999,
                width: "fit-content",
              }}
            >
              {ctaLabel}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
