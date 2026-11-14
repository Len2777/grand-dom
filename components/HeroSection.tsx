"use client";
import React from "react";
import Image from "next/image";

// Full-bleed photo hero: seller question + valuation CTA over a light wash
export default function HeroSection({ get }: any) {
  return (
    <section id="top" className="gd-hero">
      <Image
        src="/hero-warsaw.jpg"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="gd-hero-bg"
      />

      <div className="gd-wrap gd-hero-inner">
        <div className="gd-label">
          {get(["topbar", "tagline"], "Sprzedaż · Kupno · Wynajem · Warszawa i okolice")}
        </div>

        <h1 className="gd-h1">
          {get(["hero", "sellLine1"], "Sprzedajesz mieszkanie lub dom")}?
        </h1>

        <p className="gd-hero-text">
          {get(
            ["hero", "sellText"],
            "Poznaj realną cenę swojej nieruchomości — wycena jest bezpłatna"
          )}
        </p>

        <div className="gd-hero-ctas">
          {/* Jumps straight to the form with the valuation service preselected */}
          <a
            href="#contact-form"
            className="gd-btn gd-btn--accent gd-btn--lg"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("gd:service", { detail: "valuation" }))
            }
          >
            {get(["cta", "estimate"], "Oceń swoją nieruchomość")}
          </a>
          <a href="#contact" className="gd-btn gd-btn--outline">
            {get(["cta", "talkToAdvisor"], "Porozmawiaj z doradcą")}
          </a>
        </div>

        <p className="gd-hero-note">
          {get(["cta", "estimateNote"], "Bez zobowiązań — doradca skontaktuje się z Tobą")}
        </p>
      </div>
    </section>
  );
}