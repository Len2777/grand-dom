"use server";

import {
    Prisma,
    PropertySource,
    PropertyStatus,
    PropertyTransactionType,
} from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
    clearAdminSession,
    createAdminSession,
    requireAdmin,
} from "@/lib/admin-auth";

function getString(formData: FormData, key: string) {
    const value = formData.get(key);

    return typeof value === "string" ? value.trim() : "";
}

function getNullableString(formData: FormData, key: string) {
    const value = getString(formData, key);

    return value.length > 0 ? value : null;
}

function getNullableInt(formData: FormData, key: string) {
    const value = getString(formData, key);

    if (!value) return null;

    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : null;
}

function getNullableDecimal(formData: FormData, key: string) {
    const value = getString(formData, key).replace(",", ".");

    if (!value) return null;

    return new Prisma.Decimal(value);
}

function getPropertyData(formData: FormData) {
    const sourceUrl = getString(formData, "sourceUrl");
    const title = getString(formData, "title");

    if (!sourceUrl || !title) {
        throw new Error("sourceUrl and title are required");
    }

    const source = getString(formData, "source") || "OTODOM";
    const transactionType = getString(formData, "transactionType") || "SALE";
    const status = getString(formData, "status") || "ACTIVE";
    const currency = getString(formData, "currency") || "PLN";

    return {
        source: source as PropertySource,
        sourceUrl,
        title,
        description: getNullableString(formData, "description"),
        price: getNullableInt(formData, "price"),
        currency,
        location: getNullableString(formData, "location"),
        district: getNullableString(formData, "district"),
        areaM2: getNullableDecimal(formData, "areaM2"),
        rooms: getNullableInt(formData, "rooms"),
        floor: getNullableInt(formData, "floor"),
        imageUrl: getNullableString(formData, "imageUrl"),
        transactionType: transactionType as PropertyTransactionType,
        status: status as PropertyStatus,
        isFeatured: formData.get("isFeatured") === "on",
        sortOrder: getNullableInt(formData, "sortOrder") ?? 0,
    };
}

function revalidatePublicPages() {
    revalidatePath("/");
    revalidatePath("/pl");
    revalidatePath("/ua");
    revalidatePath("/en");
    revalidatePath("/admin");
}

export async function loginAction(formData: FormData) {
    const username = getString(formData, "username");
    const password = getString(formData, "password");

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        throw new Error("ADMIN_PASSWORD is missing");
    }

    if (username !== adminUsername || password !== adminPassword) {
        redirect("/admin/login?error=1");
    }

    await createAdminSession();

    redirect("/admin");
}

export async function logoutAction() {
    await clearAdminSession();

    redirect("/admin/login");
}

export async function createPropertyAction(formData: FormData) {
    await requireAdmin();

    await prisma.property.create({
        data: getPropertyData(formData),
    });

    revalidatePublicPages();

    redirect("/admin");
}

export async function updatePropertyAction(formData: FormData) {
    await requireAdmin();

    const id = getString(formData, "id");

    await prisma.property.update({
        where: { id },
        data: getPropertyData(formData),
    });

    revalidatePublicPages();

    redirect("/admin");
}

export async function deletePropertyAction(formData: FormData) {
    await requireAdmin();

    const id = getString(formData, "id");

    await prisma.property.delete({
        where: { id },
    });

    revalidatePublicPages();

    redirect("/admin");
}