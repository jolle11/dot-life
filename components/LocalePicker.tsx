"use client";

import { type Locale, LOCALE_STORAGE_KEY, locales } from "@/lib/i18n";
import { GlobeSimple } from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
  value: Locale;
  onChange: (locale: Locale) => void;
}

const localeKeys = Object.keys(locales) as Locale[];

export function LocalePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  function select(locale: Locale) {
    onChange(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
        aria-label="Language"
      >
        <GlobeSimple size={18} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            {localeKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => select(key)}
                className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm transition-colors ${
                  value === key
                    ? "font-medium text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                <span className="w-5 text-xs uppercase text-zinc-400">{key}</span>
                {locales[key].localeName}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
