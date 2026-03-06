"use client";

import { MILESTONE_COLORS } from "@/lib/colors";
import { useT } from "@/lib/i18n";
import type { Milestone } from "@/lib/types";
import {
  Check,
  PencilSimple,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
  birthDate: string;
}

function ColorPicker({
  value,
  onChange,
}: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {MILESTONE_COLORS.map((c) => (
        <button
          key={c.value}
          type="button"
          onClick={() => onChange(c.value)}
          title={c.name}
          className={`h-6 w-6 rounded-full transition-all ${
            value === c.value
              ? "ring-2 ring-offset-2 ring-offset-white scale-110 dark:ring-offset-zinc-800"
              : "hover:scale-110"
          }`}
          style={{
            backgroundColor: c.value,
            "--tw-ring-color": c.value,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function MilestoneForm({
  initial,
  birthDate,
  onSave,
  onCancel,
  submitLabel,
  placeholderLabel,
  dateRangeLabel,
}: {
  initial: { label: string; date: string; endDate?: string; color: string };
  birthDate: string;
  onSave: (data: { label: string; date: string; endDate?: string; color: string }) => void;
  onCancel: () => void;
  submitLabel: string;
  placeholderLabel: string;
  dateRangeLabel: string;
}) {
  const [label, setLabel] = useState(initial.label);
  const [date, setDate] = useState(initial.date);
  const [endDate, setEndDate] = useState(initial.endDate || "");
  const [isRange, setIsRange] = useState(!!initial.endDate);
  const [color, setColor] = useState(initial.color);

  function handleSave() {
    if (!label || !date) return;
    onSave({ label, date, ...(isRange && endDate ? { endDate } : {}), color });
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder={placeholderLabel}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={birthDate}
            max={new Date().toISOString().split("T")[0]}
            className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
          {isRange && (
            <>
              <span className="text-xs text-zinc-400">—</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={date || birthDate}
                max={new Date().toISOString().split("T")[0]}
                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </>
          )}
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isRange}
          onChange={(e) => { setIsRange(e.target.checked); if (!e.target.checked) setEndDate(""); }}
          className="rounded border-zinc-300 dark:border-zinc-600"
        />
        {dateRangeLabel}
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!label || !date}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <Check size={14} weight="bold" />
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function MilestoneEditor({ milestones, onChange, birthDate }: Props) {
  const t = useT();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function add(data: { label: string; date: string; endDate?: string; color: string }) {
    const milestone: Milestone = { id: crypto.randomUUID(), ...data };
    onChange([...milestones, milestone]);
    setAdding(false);
  }

  function update(id: string, data: { label: string; date: string; endDate?: string; color: string }) {
    onChange(milestones.map((m) => (m.id === id ? { ...m, ...data } : m)));
    setEditingId(null);
  }

  function remove(id: string) {
    onChange(milestones.filter((m) => m.id !== id));
    if (editingId === id) setEditingId(null);
  }

  return (
    <div>
      {/* Milestone list */}
      {milestones.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {milestones.map((m) =>
            editingId === m.id ? (
              <div key={m.id} className="w-full">
                <MilestoneForm
                  initial={{ label: m.label, date: m.date, endDate: m.endDate, color: m.color }}
                  birthDate={birthDate}
                  onSave={(data) => update(m.id, data)}
                  onCancel={() => setEditingId(null)}
                  submitLabel={t.saveMilestone}
                  placeholderLabel={t.milestonePlaceholder}
                  dateRangeLabel={t.dateRange}
                />
              </div>
            ) : (
              <div
                key={m.id}
                className="group flex items-center gap-2 rounded-lg border border-zinc-100 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
                <span className="text-zinc-700 dark:text-zinc-300">
                  {m.label}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {m.date}{m.endDate ? ` — ${m.endDate}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => { setEditingId(m.id); setAdding(false); }}
                  className="ml-1 text-zinc-300 transition-colors hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300"
                >
                  <PencilSimple size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(m.id)}
                  className="text-zinc-300 transition-colors hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400"
                >
                  <Trash size={13} />
                </button>
              </div>
            ),
          )}
        </div>
      )}

      {/* Add form */}
      {adding ? (
        <MilestoneForm
          initial={{
            label: "",
            date: "",
            color: MILESTONE_COLORS[milestones.length % MILESTONE_COLORS.length].value,
          }}
          birthDate={birthDate}
          onSave={add}
          onCancel={() => setAdding(false)}
          submitLabel={t.addMilestone}
          placeholderLabel={t.milestonePlaceholder}
          dateRangeLabel={t.dateRange}
        />
      ) : (
        <button
          type="button"
          onClick={() => { setAdding(true); setEditingId(null); }}
          className="flex items-center gap-1 rounded-md border border-dashed border-zinc-300 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-600 dark:border-zinc-600 dark:text-zinc-500 dark:hover:border-zinc-500 dark:hover:text-zinc-300"
        >
          <Plus size={12} weight="bold" />
          {t.addMilestone}
        </button>
      )}

      {milestones.length === 0 && !adding && (
        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
          {t.noMilestones}
        </p>
      )}
    </div>
  );
}
