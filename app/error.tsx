"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <h1
        className="gd-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          color: "var(--gd-ink)",
          fontWeight: 300,
          marginBottom: 16,
        }}
      >
        Coś poszło nie tak
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
        Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.
        <br />
        Something went wrong. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="gd-btn gd-btn--ink"
      >
        Spróbuj ponownie
      </button>
    </main>
  );
}
