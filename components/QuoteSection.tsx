import React from "react";
import { emphasize } from "@/lib/emphasis";

export default function QuoteSection({ get }: { get: (path: string[], fallback?: any) => any }) {
  const text = get(["quote", "text"], "");
  if (!text) return null;

  return (
    <section className="gd-wrap gd-quote">
      <blockquote>{emphasize(text)}</blockquote>
      <div className="gd-label">— {get(["quote", "author"], "GRAND DOM")}</div>
    </section>
  );
}
