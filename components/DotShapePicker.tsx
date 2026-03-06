"use client";

import type { DotShape } from "@/lib/types";

const shapes: { value: DotShape; label: string }[] = [
  { value: "circle", label: "○" },
  { value: "square", label: "□" },
  { value: "diamond", label: "◇" },
];

interface Props {
  value: DotShape;
  onChange: (shape: DotShape) => void;
}

export function DotShapePicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {shapes.map((s) => (
        <button
          key={s.value}
          type="button"
          onClick={() => onChange(s.value)}
          title={s.value}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border text-base transition-colors ${
            value === s.value
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-200 text-zinc-500 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
