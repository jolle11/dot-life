export type Locale = "es" | "ca" | "en" | "fr" | "de" | "pt" | "it" | "ja" | "ko" | "zh" | "ar" | "hi";

export interface Translations {
  // Welcome screen
  welcomeDescription: string;
  welcomeQuestion: string;
  welcomeStart: string;
  welcomeFooter: string;

  // Settings
  birthDate: string;
  lifeExpectancy: string;
  years: string;
  view: string;
  weeks: string;
  months: string;
  yearsView: string;

  // Stats
  age: string;
  daysLived: string;
  weeksLived: string;
  weeksRemaining: string;
  lifeLived: string;
  nextBirthday: string;
  timeLived: string;
  timeRemaining: string;
  daysUnit: string;

  // DotGrid
  eachRowYear: (cols: number) => string;
  eachRowYearMonths: (cols: number) => string;
  eachRowDecade: (cols: number) => string;
  weekLabel: string;
  monthLabel: string;
  yearLabel: string;
  lived: string;
  toLive: string;
  today: string;
  dotLived: string;
  dotFuture: string;
  dotToday: string;
  gridLabel: string;

  // Milestones
  milestones: string;
  addMilestone: string;
  saveMilestone: string;
  newMilestone: string;
  milestonePlaceholder: string;
  dateRange: string;
  noMilestones: string;

  // Dot shape
  dotShape: string;

  // Fun stats
  funStats: string;
  heartbeats: string;
  breaths: string;
  hoursSlept: string;
  fullMoons: string;

  // Keyboard shortcuts
  keyboardShortcuts: string;
  shortcutWeeks: string;
  shortcutMonths: string;
  shortcutYears: string;
  shortcutHelp: string;
  shortcutClose: string;

  // Actions
  exportChart: string;
  exportError: string;
  shareLink: string;
  shareLinkError: string;
  linkCopied: string;
  sharedView: string;
  toggleTheme: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  settings: string;

  // Page
  pageTitle: string;

  // Color names
  colorRed: string;
  colorOrange: string;
  colorYellow: string;
  colorGreen: string;
  colorTeal: string;
  colorBlue: string;
  colorIndigo: string;
  colorViolet: string;
  colorPink: string;
  colorCherry: string;
  colorGray: string;
  colorSky: string;

  // Locale names (for language picker)
  localeName: string;
}
