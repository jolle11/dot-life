"use client";

import { useT } from "@/lib/i18n";
import { HeartHalf } from "@phosphor-icons/react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function LifeExpectancySlider({ value, onChange }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="expectancy"
        className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400"
      >
        <HeartHalf size={16} />
        {t.lifeExpectancy}{" "}
        <span className="text-zinc-900 dark:text-zinc-100">{value} {t.years}</span>
      </label>
      <input
        id="expectancy"
        type="range"
        min={50}
        max={120}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zinc-900 dark:accent-zinc-100"
      />
      <div className="flex justify-between text-xs text-zinc-400">
        <span>50</span>
        <span>120</span>
      </div>
    </div>
  );
}
