import Link from "next/link";
import { notFound } from "next/navigation";
import {
  isValidLocale,
  getMessages,
  SUPPORTED_LOCALES,
} from "@/lib/translations";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  if (!isValidLocale(lng)) return {};
  const msgs = await getMessages(lng, "privacy");
  return generatePageMetadata(lng, "/privacy", msgs.title);
}

type Section = { heading: string; body: string };

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  if (!isValidLocale(lng)) notFound();

  const msgs = await getMessages(lng, "privacy");
  const sections: Section[] = msgs.sections ?? [];

  return (
    <main
      style={{
        background: "var(--gd-bg)",
        minHeight: "100vh",
        padding: "80px clamp(20px, 5vw, 40px) 96px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Link
          href={`/${lng}`}
          style={{
            display: "inline-block",
            fontFamily: "var(--gd-sans)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gd-muted)",
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          ← {msgs.backToHome ?? "Back"}
        </Link>

        <h1
          className="gd-heading"
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 300,
            color: "var(--gd-ink)",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {msgs.title}
        </h1>

        {msgs.lastUpdated && (
          <p
            style={{
              fontFamily: "var(--gd-sans)",
              fontSize: 13,
              color: "var(--gd-muted)",
              marginBottom: 32,
            }}
          >
            {msgs.lastUpdated}
          </p>
        )}

        <p
          style={{
            fontFamily: "var(--gd-sans)",
            fontSize: 16,
            color: "var(--gd-ink)",
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          {msgs.intro}
        </p>

        {sections.map((section) => (
          <section key={section.heading} style={{ marginBottom: 36 }}>
            <h2
              className="gd-heading"
              style={{
                fontSize: "clamp(20px, 2.4vw, 26px)",
                fontWeight: 400,
                color: "var(--gd-ink)",
                marginBottom: 12,
              }}
            >
              {section.heading}
            </h2>
            <p
              style={{
                fontFamily: "var(--gd-sans)",
                fontSize: 15,
                color: "var(--gd-ink-2)",
                lineHeight: 1.85,
              }}
            >
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
