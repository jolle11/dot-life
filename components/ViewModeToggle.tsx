"use client";

import { useT } from "@/lib/i18n";
import type { ViewMode } from "@/lib/types";

interface Props {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: Props) {
  const t = useT();

  const modes: { value: ViewMode; label: string }[] = [
    { value: "weeks", label: t.weeks },
    { value: "months", label: t.months },
    { value: "years", label: t.years },
  ];

  return (
    <div className="inline-flex w-fit rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800">
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onChange(mode.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            value === mode.value
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-600 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
