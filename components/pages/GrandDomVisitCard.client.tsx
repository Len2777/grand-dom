"use client";

import { safeGet } from "@/lib/safeGet";
import { useI18nSwitcher } from "@/hooks/useI18nSwitcher";

import Header from "../Header";
import HeroSection from "../HeroSection";
import QuoteSection from "../QuoteSection";
import RealEstateServicesSection from "../RealEstateServicesSection";
import AudienceSection from "../AudienceSection";
import ProcessSection from "../ProcessSection";
import AbroadSection from "../AbroadSection";
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
  const heroSubheading = get(["hero", "subheading"], "Twój Dom w Sercu Warszawy");
  const heroText      = get(["hero", "text"]) ?? get(["hero", "description"]) ?? "";
  const realEstateServices = get(["realEstateServices"], []);

  return (
    <div>
      <Header
        brandName={brandName}
        languages={languages}
        currentLanguage={currentLanguage}
        switchLanguage={switchLanguage}
        get={get}
      />

      <main>
        <HeroSection
          heroSubheading={heroSubheading}
          heroText={heroText}
          get={get}
        />

        <QuoteSection get={get} />

        <RealEstateServicesSection
          get={get}
          realEstateServices={realEstateServices}
        />

        <AudienceSection get={get} />

        <ProcessSection get={get} />

        <AbroadSection get={get} />

        <ContactSection get={get} />
      </main>

      <FooterSection get={get} brandName={brandName} />
    </div>
  );
}
