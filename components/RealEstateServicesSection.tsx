import React from "react";

export default function RealEstateServicesSection({
  get,
  realEstateServices,
}: any) {
  return (
    <section id="services" className="gd-on-forest gd-band">
      <div className="gd-wrap">
        {/* Section header */}
        <div className="gd-services-head">
          <h2 className="gd-h2 gd-h2--xl">
            {get(["realEstateServicesTitle"], "Nasze usługi")}
          </h2>
          <p>
            {get(
              ["realEstateServicesSubtitle"],
              "Kompleksowa obsługa na każdym etapie transakcji — w Polsce i za granicą.",
            )}
          </p>
        </div>

        <div className="gd-rows">
          {realEstateServices.map((service: any, i: number) => (
            <a key={i} href="#contact" className="gd-row">
              <span className="gd-row-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="gd-row-title">{service.title}</h3>
              <span className="gd-row-desc">
                {service.description}
                {service.features?.length > 0 && (
                  <span className="gd-row-tags">{service.features.join(" · ")}</span>
                )}
              </span>
              <span className="gd-row-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
