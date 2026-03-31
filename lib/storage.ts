import type { LifeConfig } from "./types";

const STORAGE_KEY = "dot-life-config";

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
    if (stored) return { ...defaultConfig, ...JSON.parse(stored) };
  } catch {}
  return defaultConfig;
}

export function saveConfig(config: LifeConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {}
}
