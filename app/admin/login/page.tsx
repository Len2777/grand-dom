import {redirect} from "next/navigation";

import {isAdmin} from "@/lib/admin-auth";
import {loginAction} from "@/app/admin/actions";

export default async function AdminLoginPage({searchParams}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const valid = await isAdmin();

    if (valid) {
        redirect("/admin");
    }

    const params = await searchParams;

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                background: "#f7f4ed",
                padding: 24,
            }}
        >
            <form
                action={loginAction}
                style={{
                    width: "100%",
                    maxWidth: 420,
                    display: "grid",
                    gap: 16,
                    padding: 32,
                    borderRadius: 24,
                    background: "#fff",
                    border: "1px solid #ded7c8",
                }}
            >
                <h1 style={{margin: 0, color: "#10251c"}}>GRAND DOM Admin</h1>

                {params.error && (
                    <p style={{color: "#b42318", margin: 0}}>
                        Wrong login or password.
                    </p>
                )}

                <input
                    name="username"
                    placeholder="Username"
                    required
                    style={{
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid #d8d2c3",
                    }}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    style={{
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid #d8d2c3",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: 13,
                        borderRadius: 999,
                        border: "none",
                        background: "#b9914b",
                        color: "#10251c",
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </form>
        </main>
    );
}