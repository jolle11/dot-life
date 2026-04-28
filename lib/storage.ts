import { formatLocalDateISO, parseLocalDate } from "./calculations";
import type { DotShape, LifeConfig, Milestone, ViewMode } from "./types";

export const STORAGE_KEY = "dot-life-config";
export const THEME_STORAGE_KEY = "dot-life-theme";
const MIN_LIFE_EXPECTANCY = 50;
const MAX_LIFE_EXPECTANCY = 120;
const DEFAULT_MILESTONE_COLOR = "#ef4444";

export const defaultConfig: LifeConfig = {
  birthDate: "",
  lifeExpectancy: 80,
  viewMode: "weeks",
  milestones: [],
  dotShape: "circle",
};

export function loadConfig(): LifeConfig {
  if (typeof window === "undefined") return defaultConfig;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeConfig(JSON.parse(stored));
  } catch {}
  return defaultConfig;
}

export function saveConfig(config: LifeConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {}
}

export function parseImportedConfig(input: unknown): LifeConfig | null {
  const candidate = extractConfigCandidate(input);
  if (!candidate || !hasKnownConfigShape(candidate)) return null;
  return normalizeConfig(candidate);
}

export function normalizeConfig(input: unknown): LifeConfig {
  if (!isRecord(input)) return defaultConfig;

  const birthDate = isValidLocalDate(input.birthDate) ? input.birthDate : "";
  const lifeExpectancy = clampLifeExpectancy(input.lifeExpectancy);
  const viewMode = isViewMode(input.viewMode)
    ? input.viewMode
    : defaultConfig.viewMode;
  const milestones = Array.isArray(input.milestones)
    ? input.milestones.flatMap((milestone, index) =>
        normalizeMilestone(milestone, index),
      )
    : defaultConfig.milestones;
  const dotShape = isDotShape(input.dotShape)
    ? input.dotShape
    : defaultConfig.dotShape;

  return {
    birthDate,
    lifeExpectancy,
    viewMode,
    milestones,
    dotShape,
  };
}

function extractConfigCandidate(input: unknown): unknown {
  if (!isRecord(input)) return null;
  if ("config" in input) return input.config;
  return input;
}

function hasKnownConfigShape(input: unknown): boolean {
  if (!isRecord(input)) return false;
  return [
    "birthDate",
    "lifeExpectancy",
    "viewMode",
    "milestones",
    "dotShape",
  ].some((key) => key in input);
}

function normalizeMilestone(input: unknown, index: number): Milestone[] {
  if (!isRecord(input)) return [];
  if (typeof input.label !== "string" || input.label.trim() === "") return [];
  if (!isValidLocalDate(input.date)) return [];

  const milestone: Milestone = {
    id:
      typeof input.id === "string" && input.id.trim() !== ""
        ? input.id
        : createMilestoneId(index),
    label: input.label,
    date: input.date,
    color:
      typeof input.color === "string" ? input.color : DEFAULT_MILESTONE_COLOR,
  };

  if (isValidLocalDate(input.endDate)) {
    milestone.endDate = input.endDate;
  }

  return [milestone];
}

function clampLifeExpectancy(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return defaultConfig.lifeExpectancy;
  }

  return Math.min(
    MAX_LIFE_EXPECTANCY,
    Math.max(MIN_LIFE_EXPECTANCY, Math.round(value)),
  );
}

function isValidLocalDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return formatLocalDateISO(parseLocalDate(value)) === value;
}

function isViewMode(value: unknown): value is ViewMode {
  return value === "weeks" || value === "months" || value === "years";
}

function isDotShape(value: unknown): value is DotShape {
  return value === "circle" || value === "square" || value === "diamond";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function createMilestoneId(index: number): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `milestone-${Date.now()}-${index}`;
}
