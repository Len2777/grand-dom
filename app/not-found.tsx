import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gd-bg)",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        className="gd-heading"
        style={{
          fontSize: "clamp(80px, 14vw, 160px)",
          color: "var(--gd-accent)",
          fontWeight: 300,
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        404
      </div>
      <h1
        className="gd-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "var(--gd-ink)",
          fontWeight: 300,
          marginBottom: 16,
        }}
      >
        Strona nie znaleziona
      </h1>
      <p
        style={{
          fontFamily: "var(--gd-sans)",
          fontSize: 15,
          color: "var(--gd-muted)",
          maxWidth: 460,
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        Strona, której szukasz, nie istnieje lub została przeniesiona.
        <br />
        The page you are looking for does not exist.
      </p>
      <Link
        href="/pl"
        className="gd-btn gd-btn--accent"
      >
        Powrót na stronę główną
      </Link>
    </main>
  );
}
