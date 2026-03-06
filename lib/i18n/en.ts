import type { Translations } from "./types";

export const en: Translations = {
  welcomeDescription:
    "Visualize your life in dots. Each dot is a week, a month, or a year. Discover how much you've lived and how much is left.",
  welcomeQuestion: "When were you born?",
  welcomeStart: "Start",
  welcomeFooter: "Your data is stored locally in your browser.",

  birthDate: "Birth date",
  lifeExpectancy: "Life expectancy:",
  years: "years",
  view: "View",
  weeks: "Weeks",
  months: "Months",

  age: "Age",
  daysLived: "Days lived",
  weeksLived: "Weeks lived",
  weeksRemaining: "Weeks remaining",
  lifeLived: "Life lived",
  nextBirthday: "Next birthday",
  timeLived: "Time lived",
  timeRemaining: "Time remaining",
  daysUnit: "days",

  eachRowYear: (cols) => `Each row = 1 year (${cols} weeks)`,
  eachRowYearMonths: (cols) => `Each row = 1 year (${cols} months)`,
  eachRowDecade: (cols) => `Each row = 1 decade (${cols} years)`,
  weekLabel: "Week",
  monthLabel: "Month",
  yearLabel: "Year",
  lived: "Lived",
  toLive: "To live",

  milestones: "Milestones",
  addMilestone: "Add",
  saveMilestone: "Save",
  newMilestone: "New milestone",
  milestonePlaceholder: "Milestone name...",
  dateRange: "Date range (e.g. university, work...)",
  noMilestones: "No milestones yet",

  exportChart: "Export chart",
  shareLink: "Share link",
  linkCopied: "Link copied",
  sharedView: "Shared view",
  toggleTheme: "Toggle theme",
  settings: "Settings",

  pageTitle: "dot life - Visualize your life in dots",

  localeName: "English",
};
