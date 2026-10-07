import React from "react";
import Image from "next/image";
import { emphasize } from "@/lib/emphasis";

type Country = { name: string; tagline: string };

// Same order as abroad.items in messages
const PHOTOS = [
  { src: "/abroad-thailand.jpg", position: "center" },
  { src: "/abroad-cyprus.jpg", position: "30% center" },
];

export default function AbroadSection({ get }: { get: (path: string[], fallback?: any) => any }) {
  const items: Country[] = get(["abroad", "items"], []);

  return (
    <section id="abroad" className="gd-wrap gd-abroad">
      <div className="gd-label">{get(["abroad", "label"], "Poza Polską")}</div>
      <h2 className="gd-h2">{emphasize(get(["abroad", "heading"], ""))}</h2>

      <div className="gd-abroad-grid">
        {items.map(({ name, tagline }, i) => (
          <a key={name} href="#contact" className="gd-abroad-card">
            <div className="gd-abroad-panel">
              {PHOTOS[i] && (
                <Image
                  src={PHOTOS[i].src}
                  alt={name}
                  fill
                  sizes="(max-width: 900px) 100vw, 720px"
                  style={{ objectFit: "cover", objectPosition: PHOTOS[i].position }}
                />
              )}
            </div>
            <div className="gd-abroad-foot">
              <span className="gd-abroad-name">{name}</span>
              <span className="gd-abroad-tag">{tagline} →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
