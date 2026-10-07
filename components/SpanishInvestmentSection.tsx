import React from "react";

export default function SpanishInvestmentSection({ get }: any) {
  const offers: string[] = get(["spanishInvestment", "offers"], [
    "Nieruchomości poniżej ceny rynkowej",
    "Dochód pasywny od pierwszego dnia",
    "Sprawdzeni lokalni deweloperzy",
    "Pełne zarządzanie najmem",
  ]);

  const benefits: string[] = get(["spanishInvestment", "benefits"], [
    "Słońce przez cały rok",
    "Dostęp do projektów hotelowych",
    "Pełne wsparcie prawne",
    "Pomoc w formalnościach na miejscu",
  ]);

  return (
    <section
      id="spain"
      className="gd-section"
      style={{
        padding: "100px clamp(20px, 5vw, 48px)",
        background:
          "linear-gradient(135deg, oklch(0.28 0.09 148) 0%, oklch(0.38 0.11 148) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.07)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 40,
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="gd-spain-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left: text + CTA */}
          <div>
            <div
              className="gd-label"
              style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16 }}
            >
              {get(["spanishInvestment", "foreignLabel"], "Inwestycje zagraniczne")}
            </div>

            <h2
              className="gd-heading"
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {get(["spanishInvestment", "heading1"], "Hiszpania —")}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                {get(["spanishInvestment", "heading2"], "lato przez cały rok")}
              </em>
            </h2>

            <div
              style={{
                width: 48,
                height: 2,
                background: "rgba(255,255,255,0.3)",
                marginBottom: 24,
              }}
            />

            <p
              style={{
                fontFamily: "var(--gd-sans)",
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.85,
                marginBottom: 40,
              }}
            >
              {get(
                ["spanishInvestment", "intro"],
                "Oprócz Warszawy otwieramy drzwi do hiszpańskiego rynku. Z lokalnym partnerem, który zna każdy adres."
              )}
            </p>

            <div style={{ marginBottom: 16, fontFamily: "var(--gd-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              {get(["spanishInvestment", "guaranteeNote"], "")}
            </div>

            <a
              href="#contact"
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                textDecoration: "none",
                padding: "14px 34px",
                fontFamily: "var(--gd-sans)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
                borderRadius: 999,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.22)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.12)")
              }
            >
              {get(["cta", "learnSpain"], "Dowiedz się więcej")}
            </a>
          </div>

          {/* Right: two info boxes */}
          <div
            className="gd-spain-boxes"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {[
              {
                title: get(["spanishInvestment", "offersTitle"], "Co oferujemy"),
                items: offers,
              },
              {
                title: get(
                  ["spanishInvestment", "benefitsTitle"],
                  "Dodatkowe korzyści"
                ),
                items: benefits,
              },
            ].map(({ title, items }) => (
              <div
                key={title}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  padding: "34px 28px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="gd-label"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 20,
                  }}
                >
                  {title}
                </div>
                {items.map((item: string) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: "var(--gd-accent)",
                        borderRadius: "50%",
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--gd-sans)",
                        fontSize: 14,
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
