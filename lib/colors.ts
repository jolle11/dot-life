import type { Translations } from "./i18n/types";

export type ColorKey =
  | "colorRed"
  | "colorOrange"
  | "colorYellow"
  | "colorGreen"
  | "colorTeal"
  | "colorBlue"
  | "colorIndigo"
  | "colorViolet"
  | "colorPink"
  | "colorCherry"
  | "colorGray"
  | "colorSky";

export interface MilestoneColor {
  value: string;
  nameKey: ColorKey;
}

export const MILESTONE_COLORS: MilestoneColor[] = [
  { value: "#ef4444", nameKey: "colorRed" },
  { value: "#f97316", nameKey: "colorOrange" },
  { value: "#eab308", nameKey: "colorYellow" },
  { value: "#22c55e", nameKey: "colorGreen" },
  { value: "#14b8a6", nameKey: "colorTeal" },
  { value: "#3b82f6", nameKey: "colorBlue" },
  { value: "#6366f1", nameKey: "colorIndigo" },
  { value: "#8b5cf6", nameKey: "colorViolet" },
  { value: "#ec4899", nameKey: "colorPink" },
  { value: "#f43f5e", nameKey: "colorCherry" },
  { value: "#78716c", nameKey: "colorGray" },
  { value: "#0ea5e9", nameKey: "colorSky" },
];

/** Helper to get the translated name of a color */
export function getColorName(color: MilestoneColor, t: Translations): string {
  return t[color.nameKey];
}
