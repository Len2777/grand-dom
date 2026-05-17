import Link from "next/link";

import { requireAdmin } from "@/lib/admin-auth";
import PropertyForm from "@/components/admin/PropertyForm";
import { createPropertyAction } from "@/app/admin/actions";

export default async function NewPropertyPage() {
    await requireAdmin();

    return (
        <main style={{ padding: 32, background: "#f7f4ed", minHeight: "100vh" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 24 }}>
                <div>
                    <Link href="/admin" style={{ color: "#b9914b" }}>
                        ← Back to admin
                    </Link>

                    <h1 style={{ color: "#10251c" }}>Add property</h1>
                </div>

                <PropertyForm
                    action={createPropertyAction}
                    submitLabel="Create property"
                />
            </div>
        </main>
    );
}