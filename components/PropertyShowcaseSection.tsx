"use client";

import React from "react";
import type {PublicProperty} from "@/lib/properties";

export default function PropertyShowcaseSection({get, properties = [],}: {
    get: any;
    properties?: PublicProperty[];
}) {
    return (
        <section
            id="properties"
            style={{
                background: "#ffffff",
                padding: "96px 24px",
            }}
        >
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 24,
                        alignItems: "flex-end",
                        marginBottom: 40,
                    }}
                >
                    <div>
                        <div className="gd-label" style={{marginBottom: 16}}>
                            {get(["propertyShowcase", "label"], "Aktualne oferty")}
                        </div>

                        <h2
                            style={{
                                margin: 0,
                                color: "var(--gd-green)",
                                fontFamily: "var(--font-playfair), serif",
                                fontSize: "clamp(34px, 5vw, 56px)",
                                lineHeight: 1.05,
                                fontWeight: 500,
                            }}
                        >
                            {get(["propertyShowcase", "heading"], "Wybrane oferty")}
                        </h2>

                        <p
                            style={{
                                marginTop: 16,
                                maxWidth: 620,
                                color: "rgba(16, 37, 28, 0.72)",
                                fontSize: 17,
                                lineHeight: 1.7,
                            }}
                        >
                            {get(
                                ["propertyShowcase", "description"],
                                "Zobacz aktualne oferty mieszkań dostępne przez GRAND DOM."
                            )}
                        </p>
                    </div>
                </div>

                {properties.length === 0 ? (
                    <div
                        style={{
                            border: "1px solid rgba(16, 37, 28, 0.12)",
                            borderRadius: 24,
                            padding: 32,
                            background: "var(--gd-cream)",
                            color: "rgba(16, 37, 28, 0.7)",
                        }}
                    >
                        {get(
                            ["propertyShowcase", "empty"],
                            "Oferty pojawią się tutaj wkrótce."
                        )}
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 24,
                        }}
                    >
                        {properties.map((property) => (
                            <a
                                key={property.id}
                                href={property.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "block",
                                    overflow: "hidden",
                                    borderRadius: 28,
                                    background: "#fff",
                                    border: "1px solid rgba(16, 37, 28, 0.1)",
                                    textDecoration: "none",
                                    color: "inherit",
                                    boxShadow: "0 18px 45px rgba(16, 37, 28, 0.08)",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        aspectRatio: "4 / 3",
                                        background: "var(--gd-cream)",
                                        overflow: "hidden",
                                    }}
                                >
                                    {property.imageUrl ? (
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "rgba(16, 37, 28, 0.45)",
                                                fontFamily: "var(--font-playfair), serif",
                                                fontSize: 28,
                                            }}
                                        >
                                            GRAND DOM
                                        </div>
                                    )}

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 16,
                                            left: 16,
                                            background: "var(--gd-green)",
                                            color: "#fff",
                                            padding: "8px 14px",
                                            borderRadius: 999,
                                            fontSize: 12,
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {property.transactionType === "SALE"
                                            ? get(["properties", "sale"], "For sale")
                                            : get(["properties", "rent"], "For rent")}
                                    </div>
                                </div>

                                <div style={{padding: 24}}>
                                    <div
                                        style={{
                                            color: "var(--gd-gold)",
                                            fontSize: 13,
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {property.district || property.location || "Warszawa"}
                                    </div>

                                    <h3
                                        style={{
                                            margin: 0,
                                            color: "var(--gd-green)",
                                            fontSize: 22,
                                            lineHeight: 1.25,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {property.title}
                                    </h3>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 12,
                                            marginTop: 18,
                                            color: "rgba(16, 37, 28, 0.66)",
                                            fontSize: 14,
                                        }}
                                    >
                                        {property.areaM2 && <span>{property.areaM2} m²</span>}
                                        {property.rooms && <span>{property.rooms} pok.</span>}
                                        {property.floor !== null && property.floor !== undefined && (
                                            <span>{property.floor} piętro</span>
                                        )}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 24,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 16,
                                        }}
                                    >
                                        <strong
                                            style={{
                                                color: "var(--gd-green)",
                                                fontSize: 22,
                                            }}
                                        >
                                            {property.price
                                                ? `${property.price.toLocaleString("pl-PL")} ${
                                                    property.currency
                                                }`
                                                : get(["properties", "priceOnRequest"], "Price on request")}
                                        </strong>

                                        <span
                                            style={{
                                                color: "var(--gd-gold)",
                                                fontWeight: 600,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                      Otodom →
                    </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}