"use client";
import React, { useState } from "react";

export default function RealEstateServicesSection({
  get,
  realEstateServices,
}: any) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="gd-section"
      style={{
        padding: "100px clamp(20px, 5vw, 48px)",
        background: "var(--gd-cream)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: 64 }}>
          <div className="gd-label" style={{ marginBottom: 16 }}>
            {get(["realEstateServicesLabel"], "Co robimy")}
          </div>
          <h2
            className="gd-heading"
            style={{
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 300,
              color: "var(--gd-ink)",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {get(["realEstateServicesTitle"], "Nasze usługi")}
          </h2>
          <div
            style={{
              width: 48,
              height: 2,
              background: "var(--gd-gold)",
              marginBottom: 20,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 15,
              color: "var(--gd-muted)",
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            {get(
              ["realEstateServicesDescription"],
              "Mały zespół, który zna Warszawę dzielnica po dzielnicy.",
            )}
          </p>
        </div>

        {/*
          6-column grid:
          — cards 0–2 each span 2 cols → 3 equal cards on top row
          — cards 3–4 each span 3 cols → 2 wider cards on bottom row
          On mobile (.gd-services-grid) collapses to 1 column,
          and span overrides don't matter since there's only 1 col.
        */}
        <div
          className="gd-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 18,
          }}
        >
          {realEstateServices.map((service: any, i: number) => {
            const isHovered = hovered === i;
            const colSpan = i < 3 ? "span 2" : "span 3";

            return (
              <div
                key={i}
                className="gd-card-hover"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: colSpan,
                  background: isHovered ? "var(--gd-teal)" : "#ffffff",
                  padding: "42px 36px 38px",
                  borderRadius: 14,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isHovered
                    ? "0 22px 50px -20px rgba(20,60,40,0.45)"
                    : "0 1px 2px rgba(20,40,30,0.04), 0 8px 24px -16px rgba(20,40,30,0.12)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.2, 0.6, 0.2, 1)",
                }}
              >
                {/* Ghost number */}
                <div
                  className="gd-heading"
                  style={{
                    fontSize: 64,
                    fontWeight: 300,
                    lineHeight: 1,
                    color: isHovered
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(0,0,0,0.04)",
                    position: "absolute",
                    top: 16,
                    right: 20,
                    transition: "color 0.3s",
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  className="gd-label"
                  style={{ marginBottom: 12, color: "var(--gd-gold)" }}
                >
                  {service.sub || get(["badge", "new"], "Nieruchomości")}
                </div>

                <h3
                  className="gd-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 400,
                    color: isHovered ? "#ffffff" : "var(--gd-ink)",
                    marginBottom: 16,
                    lineHeight: 1.2,
                    transition: "color 0.3s",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: isHovered
                      ? "rgba(255,255,255,0.7)"
                      : "var(--gd-muted)",
                    marginBottom: 22,
                    transition: "color 0.3s",
                  }}
                >
                  {service.description}
                </p>

                {/* Tags */}
                <ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {(service.features ?? []).map((tag: string, ti: number) => (
                    <li
                      key={ti}
                      style={{
                        fontSize: 11,
                        padding: "5px 12px",
                        background: isHovered
                          ? "rgba(255,255,255,0.08)"
                          : "var(--gd-teal-lt)",
                        color: isHovered
                          ? "rgba(255,255,255,0.78)"
                          : "var(--gd-teal-mid)",
                        letterSpacing: "0.02em",
                        borderRadius: 999,
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        transition: "all 0.3s",
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
