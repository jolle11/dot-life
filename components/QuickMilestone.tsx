"use client";

import { MILESTONE_COLORS, getColorName } from "@/lib/colors";
import { formatDate } from "@/lib/calculations";
import { useT } from "@/lib/i18n";
import type { Milestone } from "@/lib/types";
import { Check, X } from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
  date: Date;
  existingMilestones: Milestone[];
  onSave: (milestone: Milestone) => void;
  onCancel: () => void;
  dateLocale?: string;
}

export function QuickMilestone({ date, existingMilestones, onSave, onCancel, dateLocale = "es-ES" }: Props) {
  const t = useT();
  const nextColor = MILESTONE_COLORS[existingMilestones.length % MILESTONE_COLORS.length].value;
  const [label, setLabel] = useState("");
  const [color, setColor] = useState(nextColor);

  function handleSave() {
    if (!label) return;
    onSave({
      id: crypto.randomUUID(),
      label,
      date: date.toISOString().split("T")[0],
      color,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="mx-4 w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {t.newMilestone}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            {formatDate(date, dateLocale)}
          </p>
        </div>

        <input
          type="text"
          autoFocus
          placeholder={t.milestonePlaceholder}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") onCancel(); }}
          className="mb-3 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />

        <div className="mb-4 flex flex-wrap gap-3">
          {MILESTONE_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setColor(c.value)}
              title={getColorName(c, t)}
              className={`h-6 w-6 rounded-full transition-all ${
                color === c.value
                  ? "ring-2 ring-offset-2 ring-offset-white scale-110 dark:ring-offset-zinc-900"
                  : "hover:scale-110"
              }`}
              style={{
                backgroundColor: c.value,
                "--tw-ring-color": c.value,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!label}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <Check size={14} weight="bold" />
            {t.addMilestone}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
