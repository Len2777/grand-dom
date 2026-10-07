import React from "react";

// Renders "Kup *bezpiecznie*" with the starred part as an accent italic.
export function emphasize(text: string) {
  return (text ?? "").split("*").map((part, i) =>
    i % 2 ? (
      <em key={i} className="gd-em">
        {part}
      </em>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
