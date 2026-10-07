import React from "react";
import Image from "next/image";
import { emphasize, ROMAN } from "@/lib/emphasis";

type Get = (path: string[], fallback?: any) => any;

function NumberedList({ items }: { items: string[] }) {
  return (
    <ul className="gd-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="gd-list-num">{ROMAN[i]}.</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Copy({ get, ns }: { get: Get; ns: "sellers" | "buyers" }) {
  return (
    <div className="gd-stack">
      <div className="gd-label">{get([ns, "label"], "")}</div>
      <h2 className="gd-h2">{emphasize(get([ns, "heading"], ""))}</h2>
      <p>{get([ns, "text"], "")}</p>
      <NumberedList items={get([ns, "items"], [])} />
      <a href="#contact" className="gd-textlink">
        {get([ns, "cta"], "")} →
      </a>
    </div>
  );
}

export default function AudienceSection({ get }: { get: Get }) {
  return (
    <>
      {/* For sellers */}
      <section className="gd-wrap gd-audience">
        <div className="gd-split">
          <div className="gd-arch">
            <Image
              src="/photo_2025-12-21_18-18-44.jpg"
              alt={get(["sellers", "imageAlt"], "Eleganckie wnętrze nieruchomości")}
              fill
              sizes="(max-width: 900px) 100vw, 600px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <Copy get={get} ns="sellers" />
        </div>
      </section>

      {/* For buyers */}
      <section className="gd-wrap gd-audience">
        <div className="gd-split">
          <Copy get={get} ns="buyers" />
          <div className="gd-on-forest gd-why">
            <h3>{get(["whyChoose", "title"], "Dlaczego GRAND DOM")}</h3>
            <NumberedList items={get(["whyChoose", "items"], [])} />
          </div>
        </div>
      </section>
    </>
  );
}
