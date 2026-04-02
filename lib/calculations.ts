import type { Milestone, ViewMode } from "./types";

/** Parse a YYYY-MM-DD string as a local date (not UTC). */
export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getUnitsBetween(
  start: Date,
  end: Date,
  mode: ViewMode,
): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = (end.getTime() - start.getTime()) / msPerDay;

  switch (mode) {
    case "weeks":
      return Math.floor(days / 7);
    case "months":
      return (
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth())
      );
    case "years":
      return end.getFullYear() - start.getFullYear();
  }
}

export function getTotalUnits(lifeExpectancy: number, mode: ViewMode): number {
  switch (mode) {
    case "weeks":
      return lifeExpectancy * 52;
    case "months":
      return lifeExpectancy * 12;
    case "years":
      return lifeExpectancy;
  }
}

export function getColumnsForMode(mode: ViewMode): number {
  switch (mode) {
    case "weeks":
      return 52;
    case "months":
      return 12;
    case "years":
      return 10;
  }
}

export function addUnits(date: Date, units: number, mode: ViewMode): Date {
  const next = new Date(date);
  switch (mode) {
    case "weeks":
      next.setDate(next.getDate() + units * 7);
      break;
    case "months":
      next.setMonth(next.getMonth() + units);
      break;
    case "years":
      next.setFullYear(next.getFullYear() + units);
      break;
  }
  return next;
}

export function getDateForUnit(
  birthDate: Date,
  index: number,
  mode: ViewMode,
): Date {
  return addUnits(birthDate, index, mode);
}

export function getLivedUnits(birthDate: Date, mode: ViewMode): number {
  return getUnitsBetween(birthDate, new Date(), mode);
}

export function getMilestoneForUnit(
  birthDate: Date,
  index: number,
  mode: ViewMode,
  milestones: Milestone[],
): Milestone | undefined {
  return getMilestonesForUnit(birthDate, index, mode, milestones)[0];
}

export function getMilestonesForUnit(
  birthDate: Date,
  index: number,
  mode: ViewMode,
  milestones: Milestone[],
): Milestone[] {
  const unitDate = getDateForUnit(birthDate, index, mode);
  const nextUnitDate = getDateForUnit(birthDate, index + 1, mode);

  return milestones.filter((m) => {
    const mStart = parseLocalDate(m.date);
    const mEnd = m.endDate ? parseLocalDate(m.endDate) : mStart;
    return mEnd >= unitDate && mStart < nextUnitDate;
  });
}

export function formatDate(date: Date, dateLocale = "es-ES"): string {
  return date.toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getStats(birthDate: Date, lifeExpectancy: number) {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;

  const daysLived = Math.floor(
    (now.getTime() - birthDate.getTime()) / msPerDay,
  );
  const weeksLived = Math.floor(daysLived / 7);
  const totalWeeks = lifeExpectancy * 52;
  const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
  const percentLived = Math.min(100, (weeksLived / totalWeeks) * 100);

  const nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(now.getFullYear());
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - now.getTime()) / msPerDay,
  );

  // Precise age: compare year/month/day directly instead of dividing by 365.25
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return {
    age,
    daysLived,
    weeksLived,
    weeksRemaining,
    percentLived,
    daysUntilBirthday,
  };
}
