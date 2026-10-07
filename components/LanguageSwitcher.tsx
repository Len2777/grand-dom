"use client";
import React from "react";

export default function LanguageSwitcher({
  languages,
  currentLanguage,
  switchLanguage,
}: {
  languages: any[];
  currentLanguage: any;
  switchLanguage: (code: string) => void;
}) {
  return (
    <div className="gd-lang" role="group" aria-label="Language">
      {languages.map((lang, i) => {
        const active = currentLanguage.code === lang.code;
        return (
          <React.Fragment key={lang.code}>
            {i > 0 && (
              <span className="gd-lang-sep" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              className="gd-lang-btn"
              title={lang.name}
              aria-label={lang.name}
              aria-current={active ? "true" : undefined}
              onClick={() => {
                if (!active) switchLanguage(lang.code);
              }}
            >
              {lang.code.toUpperCase()}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
