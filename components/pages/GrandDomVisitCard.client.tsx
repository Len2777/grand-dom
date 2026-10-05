"use client";

import { safeGet } from "@/lib/safeGet";
import { useI18nSwitcher } from "@/hooks/useI18nSwitcher";

import Header from "../Header";
import HeroSection from "../HeroSection";
import StatsBar from "../StatsBar";
import RealEstateServicesSection from "../RealEstateServicesSection";
import PropertyShowcaseSection from "../PropertyShowcaseSection";
import ContactSection from "../ContactSection";
import FooterSection from "../FooterSection";

export default function GrandDomVisitCard({ messages }: { messages: any }) {
  const languages = safeGet(messages, ["languages", "available"], [
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "ua", name: "Українська", flag: "🇺🇦" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ]);

  const { currentLanguage, switchLanguage } = useI18nSwitcher(languages);

  const get = (path: string[], fallback?: any) =>
    safeGet(messages, path, fallback);

  const brandName     = get(["brand", "name"], "GRAND DOM");
  const badgeText     = get(["badge", "new"], "Biuro Nieruchomości");
  const heroSubheading = get(["hero", "subheading"], "Twój Dom w Sercu Warszawy");
  const heroText      = get(["hero", "text"]) ?? get(["hero", "description"]) ?? "";
  const contactEmail   = get(["contact", "email", "value"], "granddom7@op.pl");
  const contactPhone   = get(["contact", "phone", "value"], "+48 886 193 598");
  const contactLocation = get(["contact", "location", "value"], "Warszawa, Polska");
  const realEstateServices = get(["realEstateServices"], []);

  return (
    <div style={{ background: "var(--gd-cream)" }}>
      <Header
        brandName={brandName}
        languages={languages}
        currentLanguage={currentLanguage}
        switchLanguage={switchLanguage}
        get={get}
      />

      <main>
        <HeroSection
          badgeText={badgeText}
          heroSubheading={heroSubheading}
          heroText={heroText}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          contactLocation={contactLocation}
          get={get}
        />

        <StatsBar get={get} />

        <RealEstateServicesSection
          get={get}
          realEstateServices={realEstateServices}
        />

        <PropertyShowcaseSection get={get} />

        <ContactSection get={get} />
      </main>

      <FooterSection get={get} brandName={brandName} />
    </div>
  );
}
