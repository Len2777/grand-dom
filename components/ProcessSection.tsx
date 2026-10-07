import React from "react";

export default function ProcessSection({ get }: { get: (path: string[], fallback?: any) => any }) {
  const steps = get(["process", "steps"], []);

  return (
    <section id="process" className="gd-process gd-band">
      <div className="gd-wrap">
        <h2 className="gd-h2">{get(["process", "title"], "Jak pracujemy")}</h2>
        <div className="gd-steps">
          {steps.map(({ title, text }: { title: string; text: string }, i: number) => (
            <div key={i} className="gd-step">
              <span className="gd-step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
