"use client";

import { GlobeSimple } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { LOCALE_STORAGE_KEY, type Locale, locales } from "@/lib/i18n";

interface Props {
  value: Locale;
  onChange: (locale: Locale) => void;
}

const localeKeys = Object.keys(locales) as Locale[];

export function LocalePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function select(locale: Locale) {
    onChange(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
        aria-label="Language"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <GlobeSimple size={18} />
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-1 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
          role="menu"
        >
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
              role="menuitem"
            >
              <span className="w-5 text-xs uppercase text-zinc-400">{key}</span>
              {locales[key].localeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
