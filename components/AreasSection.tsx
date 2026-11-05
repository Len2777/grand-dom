import React from "react";

type Get = (path: string[], fallback?: any) => any;

type City = {
  name: string;
  places?: string;
  owners: string;
  new?: string;
  cta: string;
};

export default function AreasSection({ get }: { get: Get }) {
  const cities: City[] = get(["areas", "cities"], []);
  if (!cities.length) return null;

  return (
    <section id="areas" className="gd-wrap gd-areas">
      <div className="gd-label">{get(["areas", "label"], "")}</div>
      <h2 className="gd-h2">{get(["areas", "title"], "")}</h2>

      <div className="gd-areas-grid">
        {cities.map((c) => (
          <article key={c.name} className="gd-area-card">
            <h3>{c.name}</h3>
            {c.places && <div className="gd-area-places">{c.places}</div>}
            <p>
              <strong>{get(["areas", "ownersLabel"], "Dla Właścicieli")}:</strong> {c.owners}
            </p>
            {c.new && (
              <p>
                <strong>{get(["areas", "newLabel"], "Nowe Inwestycje")}:</strong> {c.new}
              </p>
            )}
            <a href="#contact-form" className="gd-textlink">
              {c.cta} →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
