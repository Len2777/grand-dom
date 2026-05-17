import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { deletePropertyAction, logoutAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    await requireAdmin();

    const properties = await prisma.property.findMany({
        orderBy: [
            { sortOrder: "asc" },
            { createdAt: "desc" },
        ],
    });

    return (
        <main style={{ padding: 32, background: "#f7f4ed", minHeight: "100vh" }}>
            <div
                style={{
                    maxWidth: 1180,
                    margin: "0 auto",
                    display: "grid",
                    gap: 24,
                }}
            >
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h1 style={{ margin: 0, color: "#10251c" }}>
                            Ogłoszenia GRAND DOM
                        </h1>

                        <p style={{ margin: "8px 0 0", color: "rgba(16,37,28,.7)" }}>
                            Zarządzaj ogłoszeniami wyświetlanymi na stronie.
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                        <Link
                            href="/admin/properties/new"
                            style={{
                                padding: "12px 18px",
                                borderRadius: 999,
                                background: "#b9914b",
                                color: "#10251c",
                                fontWeight: 700,
                                textDecoration: "none",
                            }}
                        >
                            Dodaj ogłoszenie
                        </Link>

                        <form action={logoutAction}>
                            <button
                                type="submit"
                                style={{
                                    padding: "12px 18px",
                                    borderRadius: 999,
                                    background: "#10251c",
                                    color: "#fff",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Wyloguj
                            </button>
                        </form>
                    </div>
                </header>

                <div
                    style={{
                        overflowX: "auto",
                        background: "#fff",
                        borderRadius: 24,
                        border: "1px solid #ded7c8",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            minWidth: 900,
                        }}
                    >
                        <thead>
                        <tr style={{ background: "#10251c", color: "#fff" }}>
                            <th style={{ padding: 14, textAlign: "left" }}>Tytuł</th>
                            <th style={{ padding: 14, textAlign: "left" }}>Dzielnica</th>
                            <th style={{ padding: 14, textAlign: "left" }}>Cena</th>
                            <th style={{ padding: 14, textAlign: "left" }}>Typ</th>
                            <th style={{ padding: 14, textAlign: "left" }}>Status</th>
                            <th style={{ padding: 14, textAlign: "left" }}>Strona główna</th>
                            <th style={{ padding: 14, textAlign: "right" }}>Akcje</th>
                        </tr>
                        </thead>

                        <tbody>
                        {properties.map((property) => (
                            <tr
                                key={property.id}
                                style={{
                                    borderBottom: "1px solid #eee7da",
                                }}
                            >
                                <td style={{ padding: 14 }}>
                                    <strong>{property.title}</strong>
                                    <br />
                                    <a
                                        href={property.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#b9914b", fontSize: 13 }}
                                    >
                                        Otwórz Otodom
                                    </a>
                                </td>

                                <td style={{ padding: 14 }}>{property.district || "-"}</td>

                                <td style={{ padding: 14 }}>
                                    {property.price
                                        ? `${property.price.toLocaleString("pl-PL")} ${property.currency}`
                                        : "-"}
                                </td>

                                <td style={{ padding: 14 }}>{property.transactionType}</td>
                                <td style={{ padding: 14 }}>{property.status}</td>
                                <td style={{ padding: 14 }}>{property.isFeatured ? "Yes" : "No"}</td>

                                <td style={{ padding: 14, textAlign: "right" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            gap: 10,
                                        }}
                                    >
                                        <Link
                                            href={`/admin/properties/${property.id}/edit`}
                                            style={{
                                                padding: "9px 13px",
                                                borderRadius: 999,
                                                background: "#f7f4ed",
                                                color: "#10251c",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Edytuj
                                        </Link>

                                        <form action={deletePropertyAction}>
                                            <input type="hidden" name="id" value={property.id} />
                                            <button
                                                type="submit"
                                                style={{
                                                    padding: "9px 13px",
                                                    borderRadius: 999,
                                                    background: "#fff",
                                                    color: "#b42318",
                                                    border: "1px solid #f0c4c4",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Usuń
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {properties.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ padding: 24, color: "#667085" }}>
                                    No properties yet.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}