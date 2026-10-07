"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSection({ heroSubheading, heroText, get }: any) {
  const [muted, setMuted] = useState(true);
  const line2 = get(["hero", "line2"], "");
  const stats = get(["stats", "items"], [
    { value: "18", label: "Dzielnic Warszawy" },
    { value: "2025", label: "Rok założenia" },
    { value: "10–18", label: "Godziny pracy" },
  ]);

  return (
    <>
      <section id="top" className="gd-wrap gd-hero">
        <div className="gd-label">
          {get(["hero", "eyebrow"], get(["badge", "new"], "Biuro nieruchomości"))}
        </div>

        {/* H1 — middle word set in accent italic */}
        <h1 className="gd-h1">
          {get(["hero", "line1"], heroSubheading)}{" "}
          {line2 && <em className="gd-em">{line2}</em>}{" "}
          {get(["hero", "line3"], "")}
        </h1>

        <p className="gd-hero-text">{heroText}</p>

        <div className="gd-hero-ctas">
          {/* Jumps straight to the form with the valuation service preselected */}
          <a
            href="#contact-form"
            className="gd-btn gd-btn--accent gd-btn--lg"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("gd:service", { detail: "valuation" }))
            }
          >
            {get(["cta", "heroValuation"], "Zamów bezpłatną wycenę")} →
          </a>
          <a href="#services" className="gd-btn gd-btn--outline">
            {get(["cta", "heroCta1"], "Zobacz ofertę")}
          </a>
        </div>
      </section>

      <div className="gd-wrap gd-hero-media">
        <div className="gd-hero-photo">
          <div className="gd-hero-img">
            <Image
              src="/hero-living.jpg"
              alt=""
              fill
              priority
              quality={85}
              sizes="(max-width: 1280px) 100vw, 900px"
              style={{ objectFit: "cover", objectPosition: "center 65%" }}
            />
          </div>

          <div className="gd-hero-stats">
            {stats.map(({ value, label }: { value: string; label: string }, i: number) => (
              <div key={i}>
                <div className="gd-stat-value">{value}</div>
                <div className="gd-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait clip — autoplays muted, sound on demand */}
        <div className="gd-hero-video">
          <video src="/hero.mp4" autoPlay muted={muted} loop playsInline preload="metadata" />
          <button
            type="button"
            className="gd-hero-sound"
            onClick={() => setMuted(!muted)}
            aria-pressed={!muted}
            aria-label={muted ? "Włącz dźwięk" : "Wyłącz dźwięk"}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </>
  );
}
