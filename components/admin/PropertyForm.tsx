import type { Property } from "@prisma/client";

type PropertyFormProps = {
    property?: Property;
    action: (formData: FormData) => Promise<void>;
    submitLabel: string;
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #d8d2c3",
    fontSize: 15,
};

const labelStyle: React.CSSProperties = {
    display: "grid",
    gap: 8,
    color: "#10251c",
    fontWeight: 600,
};

export default function PropertyForm({property, action, submitLabel,}: PropertyFormProps) {
    return (
        <form
            action={action}
            style={{
                display: "grid",
                gap: 18,
                maxWidth: 760,
            }}
        >
            {property && <input type="hidden" name="id" value={property.id} />}

            <label style={labelStyle}>
                Źródło
                <select name="source" defaultValue={property?.source ?? "OTODOM"} style={inputStyle}>
                    <option value="OTODOM">Otodom</option>
                    <option value="MANUAL">Ręcznie</option>
                </select>
            </label>

            <label style={labelStyle}>
                Link do ogłoszenia Otodom *
                <input
                    name="sourceUrl"
                    required
                    maxLength={512}
                    defaultValue={property?.sourceUrl ?? ""}
                    placeholder="https://www.otodom.pl/..."
                    style={inputStyle}
                />
            </label>

            <label style={labelStyle}>
                Tytuł ogłoszenia *
                <input
                    name="title"
                    required
                    defaultValue={property?.title ?? ""}
                    placeholder="Mieszkanie na Mokotowie"
                    style={inputStyle}
                />
            </label>

            <label style={labelStyle}>
                Opis
                <textarea
                    name="description"
                    defaultValue={property?.description ?? ""}
                    rows={4}
                    style={inputStyle}
                />
            </label>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                }}
            >
                <label style={labelStyle}>
                    Cena
                    <input
                        name="price"
                        type="number"
                        defaultValue={property?.price ?? ""}
                        placeholder="890000"
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Waluta
                    <input
                        name="currency"
                        defaultValue={property?.currency ?? "PLN"}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Powierzchnia m²
                    <input
                        name="areaM2"
                        defaultValue={property?.areaM2?.toString() ?? ""}
                        placeholder="64"
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Pokoje
                    <input
                        name="rooms"
                        type="number"
                        defaultValue={property?.rooms ?? ""}
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Piętro
                    <input
                        name="floor"
                        type="number"
                        defaultValue={property?.floor ?? ""}
                        style={inputStyle}
                    />
                </label>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                }}
            >
                <label style={labelStyle}>
                    Miasto
                    <input
                        name="location"
                        defaultValue={property?.location ?? ""}
                        placeholder="Warszawa"
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    Dzielnica
                    <input
                        name="district"
                        defaultValue={property?.district ?? ""}
                        placeholder="Mokotów"
                        style={inputStyle}
                    />
                </label>
            </div>

            <label style={labelStyle}>
                Zdjęcie / URL zdjęcia
                <input
                    name="imageUrl"
                    defaultValue={property?.imageUrl ?? ""}
                    placeholder="/properties/mokotow.jpg albo https://..."
                    style={inputStyle}
                />
            </label>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                }}
            >
                <label style={labelStyle}>
                    Type
                    <select
                        name="transactionType"
                        defaultValue={property?.transactionType ?? "SALE"}
                        style={inputStyle}
                    >
                        <option value="SALE">Sale</option>
                        <option value="RENT">Rent</option>
                    </select>
                </label>

                <label style={labelStyle}>
                    Typ ogłoszenia
                    <select
                        name="transactionType"
                        defaultValue={property?.transactionType ?? "SALE"}
                        style={inputStyle}
                    >
                        <option value="SALE">Sprzedaż</option>
                        <option value="RENT">Wynajem</option>
                    </select>
                </label>

                <label style={labelStyle}>
                    Status
                    <select
                        name="status"
                        defaultValue={property?.status ?? "ACTIVE"}
                        style={inputStyle}
                    >
                        <option value="ACTIVE">Aktywne</option>
                        <option value="HIDDEN">Ukryte</option>
                        <option value="SOLD">Sprzedane</option>
                        <option value="RENTED">Wynajęte</option>
                    </select>
                </label>

                <label style={labelStyle}>
                    Kolejność
                    <input
                        name="sortOrder"
                        type="number"
                        defaultValue={property?.sortOrder ?? 0}
                        style={inputStyle}
                    />
                </label>
            </div>

            <label
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#10251c",
                    fontWeight: 600,
                }}
            >
                <input
                    name="isFeatured"
                    type="checkbox"
                    defaultChecked={property?.isFeatured ?? true}
                />
                Pokaż na stronie głównej
            </label>

            <button
                type="submit"
                style={{
                    width: "fit-content",
                    padding: "13px 22px",
                    borderRadius: 999,
                    border: "none",
                    background: "#b9914b",
                    color: "#10251c",
                    fontWeight: 700,
                    cursor: "pointer",
                }}
            >
                {submitLabel}
            </button>
        </form>
    );
}