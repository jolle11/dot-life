import { getUnitsBetween, parseLocalDate } from "./calculations";
import type { Milestone, ViewMode } from "./types";

/**
 * Encodes the grid state into URL search params without personal data.
 * Instead of birthDate, we store age (years). Milestones are stored
 * as unit offsets from birth, not absolute dates.
 */

interface ShareData {
  viewMode: ViewMode;
  lifeExpectancy: number;
  age: number;
  milestones: {
    label: string;
    color: string;
    startUnit: number;
    endUnit?: number;
  }[];
}

export function encodeShareURL(
  birthDate: Date,
  lifeExpectancy: number,
  viewMode: ViewMode,
  milestones: Milestone[],
): string {
  const now = new Date();
  // Precise age: subtract 1 if the birthday hasn't occurred yet this year
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  const encodedMilestones = milestones.map((m) => {
    const mStart = parseLocalDate(m.date);
    const startUnit = getUnitsBetween(birthDate, mStart, viewMode);
    const parts = [m.label, m.color, String(startUnit)];
    if (m.endDate) {
      const mEnd = parseLocalDate(m.endDate);
      const endUnit = getUnitsBetween(birthDate, mEnd, viewMode);
      parts.push(String(endUnit));
    }
    return parts.join("~");
  });

  const params = new URLSearchParams();
  params.set("v", viewMode);
  params.set("e", String(lifeExpectancy));
  params.set("a", String(age));
  if (encodedMilestones.length > 0) {
    params.set("m", encodedMilestones.join(","));
  }

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function decodeShareURL(
  search: string | URLSearchParams,
): ShareData | null {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const v = params.get("v");
  const e = params.get("e");
  const a = params.get("a");

  if (!v || !e || !a) return null;
  if (!["weeks", "months", "years"].includes(v)) return null;

  const viewMode = v as ViewMode;
  const lifeExpectancy = Number(e);
  const age = Number(a);

  if (Number.isNaN(lifeExpectancy) || Number.isNaN(age)) return null;

  const milestones: ShareData["milestones"] = [];
  const mParam = params.get("m");
  if (mParam) {
    for (const entry of mParam.split(",")) {
      const parts = entry.split("~");
      if (parts.length < 3) continue;
      const [label, color, startStr, endStr] = parts;
      const startUnit = Number(startStr);
      if (Number.isNaN(startUnit)) continue;
      const m: ShareData["milestones"][number] = { label, color, startUnit };
      if (endStr !== undefined) {
        const endUnit = Number(endStr);
        if (!Number.isNaN(endUnit)) m.endUnit = endUnit;
      }
      milestones.push(m);
    }
  }

  return { viewMode, lifeExpectancy, age, milestones };
}

/**
 * Converts share data into a LifeConfig-compatible structure.
 * Creates an approximate birthDate from age and converts
 * unit offsets back to approximate dates.
 */
export function shareDataToConfig(data: ShareData) {
  const now = new Date();
  // Approximate birthDate: just subtract age in years
  const approxBirth = new Date(now.getFullYear() - data.age, 0, 1);

  const milestones: Milestone[] = data.milestones.map((m, i) => {
    const startDate = unitToDate(approxBirth, m.startUnit, data.viewMode);
    const milestone: Milestone = {
      id: `shared-${i}`,
      label: m.label,
      color: m.color,
      date: dateToString(startDate),
    };
    if (m.endUnit !== undefined) {
      const endDate = unitToDate(approxBirth, m.endUnit, data.viewMode);
      milestone.endDate = dateToString(endDate);
    }
    return milestone;
  });

  return {
    birthDate: dateToString(approxBirth),
    lifeExpectancy: data.lifeExpectancy,
    viewMode: data.viewMode,
    milestones,
    dotShape: "circle" as const,
  };
}

function unitToDate(birthDate: Date, unit: number, mode: ViewMode): Date {
  const d = new Date(birthDate);
  switch (mode) {
    case "weeks":
      d.setDate(d.getDate() + unit * 7);
      break;
    case "months":
      d.setMonth(d.getMonth() + unit);
      break;
    case "years":
      d.setFullYear(d.getFullYear() + unit);
      break;
  }
  return d;
}

function dateToString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
