import { getUnitsBetween, parseLocalDate } from "./calculations";
import type { Milestone, ViewMode } from "./types";

/**
 * Encodes the grid state into URL search params.
 * Exact birth dates preserve a faithful shared view; milestones remain stored
 * as unit offsets from birth, not absolute dates.
 */

interface ShareData {
  viewMode: ViewMode;
  lifeExpectancy: number;
  birthDate?: string;
  age?: number;
  milestones: {
    label: string;
    color: string;
    startUnit: number;
    endUnit?: number;
  }[];
}

type SharedMilestone = ShareData["milestones"][number];

const STRUCTURED_MILESTONES_PREFIX = "j:";

export function encodeShareURL(
  birthDate: Date,
  lifeExpectancy: number,
  viewMode: ViewMode,
  milestones: Milestone[],
): string {
  const now = new Date();
  // Keep age for backward compatibility with older shared links/clients.
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  const encodedMilestones: SharedMilestone[] = milestones.map((m) => {
    const mStart = parseLocalDate(m.date);
    const startUnit = getUnitsBetween(birthDate, mStart, viewMode);
    const encodedMilestone: SharedMilestone = {
      label: m.label,
      color: m.color,
      startUnit,
    };
    if (m.endDate) {
      const mEnd = parseLocalDate(m.endDate);
      encodedMilestone.endUnit = getUnitsBetween(birthDate, mEnd, viewMode);
    }
    return encodedMilestone;
  });

  const params = new URLSearchParams();
  params.set("v", viewMode);
  params.set("e", String(lifeExpectancy));
  params.set("b", dateToString(birthDate));
  params.set("a", String(age));
  if (encodedMilestones.length > 0) {
    params.set("m", encodeMilestonesParam(encodedMilestones));
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
  const b = params.get("b");
  const a = params.get("a");

  if (!v || !e || (!b && !a)) return null;
  if (!["weeks", "months", "years"].includes(v)) return null;

  const viewMode = v as ViewMode;
  const lifeExpectancy = Number(e);

  if (Number.isNaN(lifeExpectancy)) return null;

  const birthDate =
    b !== null && isValidShareBirthDate(b)
      ? dateToString(parseLocalDate(b))
      : undefined;
  const age = a !== null ? Number(a) : undefined;

  if (!birthDate && (age === undefined || Number.isNaN(age))) {
    return null;
  }

  const mParam = params.get("m");
  const milestones = mParam ? decodeMilestonesParam(mParam) : [];

  return { viewMode, lifeExpectancy, birthDate, age, milestones };
}

/**
 * Converts share data into a LifeConfig-compatible structure.
 * Uses the exact birthDate when present and falls back to the old
 * age-based approximation for legacy links.
 */
export function shareDataToConfig(data: ShareData) {
  const birthDate = getSharedBirthDate(data);

  const milestones: Milestone[] = data.milestones.map((m, i) => {
    const startDate = unitToDate(birthDate, m.startUnit, data.viewMode);
    const milestone: Milestone = {
      id: `shared-${i}`,
      label: m.label,
      color: m.color,
      date: dateToString(startDate),
    };
    if (m.endUnit !== undefined) {
      const endDate = unitToDate(birthDate, m.endUnit, data.viewMode);
      milestone.endDate = dateToString(endDate);
    }
    return milestone;
  });

  return {
    birthDate: dateToString(birthDate),
    lifeExpectancy: data.lifeExpectancy,
    viewMode: data.viewMode,
    milestones,
    dotShape: "circle" as const,
  };
}

function getSharedBirthDate(data: ShareData): Date {
  if (data.birthDate) {
    return parseLocalDate(data.birthDate);
  }

  const now = new Date();
  return new Date(now.getFullYear() - (data.age ?? 0), 0, 1);
}

function isValidShareBirthDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return dateToString(parseLocalDate(value)) === value;
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

function encodeMilestonesParam(milestones: SharedMilestone[]): string {
  return `${STRUCTURED_MILESTONES_PREFIX}${JSON.stringify(milestones)}`;
}

function decodeMilestonesParam(value: string): SharedMilestone[] {
  if (value.startsWith(STRUCTURED_MILESTONES_PREFIX)) {
    return decodeStructuredMilestones(
      value.slice(STRUCTURED_MILESTONES_PREFIX.length),
    );
  }

  return decodeLegacyMilestones(value);
}

function decodeStructuredMilestones(value: string): SharedMilestone[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry) => {
      if (!isStructuredMilestone(entry)) return [];

      const milestone: SharedMilestone = {
        label: entry.label,
        color: entry.color,
        startUnit: entry.startUnit,
      };

      if (entry.endUnit !== undefined) {
        milestone.endUnit = entry.endUnit;
      }

      return [milestone];
    });
  } catch {
    return [];
  }
}

function decodeLegacyMilestones(value: string): SharedMilestone[] {
  const milestones: SharedMilestone[] = [];

  for (const entry of value.split(",")) {
    const parts = entry.split("~");
    if (parts.length < 3) continue;
    const [label, color, startStr, endStr] = parts;
    const startUnit = Number(startStr);
    if (Number.isNaN(startUnit)) continue;

    const milestone: SharedMilestone = { label, color, startUnit };
    if (endStr !== undefined) {
      const endUnit = Number(endStr);
      if (!Number.isNaN(endUnit)) milestone.endUnit = endUnit;
    }

    milestones.push(milestone);
  }

  return milestones;
}

function isStructuredMilestone(value: unknown): value is SharedMilestone {
  if (typeof value !== "object" || value === null) return false;

  const maybeMilestone = value as Partial<SharedMilestone>;
  if (typeof maybeMilestone.label !== "string") return false;
  if (typeof maybeMilestone.color !== "string") return false;
  if (typeof maybeMilestone.startUnit !== "number") return false;
  if (
    maybeMilestone.endUnit !== undefined &&
    typeof maybeMilestone.endUnit !== "number"
  ) {
    return false;
  }

  return true;
}
