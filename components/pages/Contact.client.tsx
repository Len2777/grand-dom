"use client";

import React from "react";
import Header from "../Header";
import ContactSection from "../ContactSection";
import FooterSection from "../FooterSection";
import { safeGet } from "@/lib/safeGet";
import { useI18nSwitcher } from "@/hooks/useI18nSwitcher";

interface ContactPageProps {
  messages: any;
  commonMessages: any;
}

export default function ContactPage({ messages, commonMessages }: ContactPageProps) {
  const languages = safeGet(
    messages,
    ["languages", "available"],
    [
      { code: "pl", name: "Polski", flag: "🇵🇱" },
      { code: "ua", name: "Українська", flag: "🇺🇦" },
      { code: "en", name: "English", flag: "🇬🇧" },
    ]
  );

  const { currentLanguage, switchLanguage } = useI18nSwitcher(languages);

  const getCommon = (path: string[], fallback?: any) =>
    safeGet(commonMessages, path, fallback);

  // Contact-page copy first, shared copy as a fallback
  const get = (path: string[], fallback?: any) =>
    safeGet(messages, path) ?? getCommon(path, fallback);

  const brandName = get(["brand", "name"], "GRAND DOM");
  const basePath = `/${currentLanguage.code}`;

  return (
    <div>
      <Header
        brandName={brandName}
        languages={languages}
        currentLanguage={currentLanguage}
        switchLanguage={switchLanguage}
        get={getCommon}
        basePath={basePath}
      />

      <main>
        <ContactSection
          get={get}
          as="h1"
          serviceOptions={get(["contactPage", "services"])}
          typeOptions={get(["contactPage", "type"])}
          timelineOptions={get(["contactPage", "timelines"])}
          homeHref={basePath}
          copyable
        />
      </main>

      <FooterSection get={getCommon} brandName={brandName} basePath={basePath} />
    </div>
  );
}
