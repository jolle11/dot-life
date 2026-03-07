"use client";

import { useT } from "@/lib/i18n";
import { CalendarBlank } from "@phosphor-icons/react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function BirthDateInput({ value, onChange }: Props) {
  const t = useT();

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor="birthdate"
        className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
      >
        {t.birthDate}
      </label>
      <div className="relative w-full min-w-0 overflow-hidden">
        <CalendarBlank
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-400"
          size={18}
        />
        <input
          id="birthdate"
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 max-w-full rounded-lg border border-zinc-200 bg-white py-2.5 pr-4 pl-10 text-sm text-zinc-900 transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    </div>
  );
}
