import { prisma } from "@/lib/prisma";

export type PublicProperty = {
    id: string;
    sourceUrl: string;
    title: string;
    description: string | null;
    price: number | null;
    currency: string;
    location: string | null;
    district: string | null;
    areaM2: number | null;
    rooms: number | null;
    floor: number | null;
    imageUrl: string | null;
    transactionType: "SALE" | "RENT";
    status: "ACTIVE" | "HIDDEN" | "SOLD" | "RENTED";
    isFeatured: boolean;
};

export async function getFeaturedProperties(): Promise<PublicProperty[]> {
    const properties = await prisma.property.findMany({
        where: {
            status: "ACTIVE",
            isFeatured: true,
        },
        orderBy: [
            { sortOrder: "asc" },
            { createdAt: "desc" },
        ],
        take: 6,
    });

    return properties.map((property) => ({
        id: property.id,
        sourceUrl: property.sourceUrl,
        title: property.title,
        description: property.description,
        price: property.price,
        currency: property.currency,
        location: property.location,
        district: property.district,
        areaM2: property.areaM2 ? property.areaM2.toNumber() : null,
        rooms: property.rooms,
        floor: property.floor,
        imageUrl: property.imageUrl,
        transactionType: property.transactionType,
        status: property.status,
        isFeatured: property.isFeatured,
    }));
}