import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import PropertyForm from "@/components/admin/PropertyForm";
import { updatePropertyAction } from "@/app/admin/actions";

export default async function EditPropertyPage({params}: {
    params: Promise<{ id: string }>;
}) {
    await requireAdmin();

    const { id } = await params;

    const property = await prisma.property.findUnique({
        where: { id },
    });

    if (!property) {
        notFound();
    }

    return (
        <main style={{ padding: 32, background: "#f7f4ed", minHeight: "100vh" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 24 }}>
                <div>
                    <Link href="/admin" style={{ color: "#b9914b" }}>
                        ← Back to admin
                    </Link>

                    <h1 style={{ color: "#10251c" }}>Edit property</h1>
                </div>

                <PropertyForm
                    property={property}
                    action={updatePropertyAction}
                    submitLabel="Save changes"
                />
            </div>
        </main>
    );
}