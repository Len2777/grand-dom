import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "grand_dom_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function getSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is missing");
    }

    return secret;
}

function sign(payload: string) {
    return crypto
        .createHmac("sha256", getSecret())
        .update(payload)
        .digest("base64url");
}

function createToken() {
    const payload = Buffer.from(
        JSON.stringify({
            role: "admin",
            exp: Date.now() + SESSION_TTL_MS,
        })
    ).toString("base64url");

    const signature = sign(payload);

    return `${payload}.${signature}`;
}

function verifyToken(token?: string) {
    if (!token) return false;

    const [payload, signature] = token.split(".");

    if (!payload || !signature) return false;

    const expectedSignature = sign(payload);

    const signatureBuffer = Buffer.from(signature, "base64url");
    const expectedBuffer = Buffer.from(expectedSignature, "base64url");

    if (signatureBuffer.length !== expectedBuffer.length) {
        return false;
    }

    const validSignature = crypto.timingSafeEqual(
        signatureBuffer,
        expectedBuffer
    );

    if (!validSignature) return false;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    return data.role === "admin" && typeof data.exp === "number" && data.exp > Date.now();
}

export async function createAdminSession() {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, createToken(), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_MS / 1000,
    });
}

export async function clearAdminSession() {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    return verifyToken(token);
}

export async function requireAdmin() {
    const valid = await isAdmin();

    if (!valid) {
        redirect("/admin/login");
    }
}