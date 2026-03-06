import type { Translations } from "./types";

export const de: Translations = {
  welcomeDescription:
    "Visualisiere dein Leben in Punkten. Jeder Punkt ist eine Woche, ein Monat oder ein Jahr. Entdecke, wie viel du gelebt hast und wie viel noch bleibt.",
  welcomeQuestion: "Wann bist du geboren?",
  welcomeStart: "Starten",
  welcomeFooter: "Deine Daten werden lokal in deinem Browser gespeichert.",

  birthDate: "Geburtsdatum",
  lifeExpectancy: "Lebenserwartung:",
  years: "Jahre",
  view: "Ansicht",
  weeks: "Wochen",
  months: "Monate",
  yearsView: "Jahre",

  age: "Alter",
  daysLived: "Gelebte Tage",
  weeksLived: "Gelebte Wochen",
  weeksRemaining: "Verbleibende Wochen",
  lifeLived: "Gelebtes Leben",
  nextBirthday: "Nächster Geburtstag",
  timeLived: "Gelebte Zeit",
  timeRemaining: "Verbleibende Zeit",
  daysUnit: "Tage",

  eachRowYear: (cols) => `Jede Zeile = 1 Jahr (${cols} Wochen)`,
  eachRowYearMonths: (cols) => `Jede Zeile = 1 Jahr (${cols} Monate)`,
  eachRowDecade: (cols) => `Jede Zeile = 1 Jahrzehnt (${cols} Jahre)`,
  weekLabel: "Woche",
  monthLabel: "Monat",
  yearLabel: "Jahr",
  lived: "Gelebt",
  toLive: "Noch zu leben",

  milestones: "Meilensteine",
  addMilestone: "Hinzufügen",
  saveMilestone: "Speichern",
  newMilestone: "Neuer Meilenstein",
  milestonePlaceholder: "Name des Meilensteins...",
  dateRange: "Datumsbereich (z.B. Universität, Arbeit...)",
  noMilestones: "Noch keine Meilensteine",

  dotShape: "Form",

  funStats: "Kuriose Statistiken",
  heartbeats: "Geschätzte Herzschläge",
  breaths: "Geschätzte Atemzüge",
  hoursSlept: "Geschlafene Stunden",
  fullMoons: "Erlebte Vollmonde",

  keyboardShortcuts: "Tastaturkürzel",
  shortcutWeeks: "Wochenansicht",
  shortcutMonths: "Monatsansicht",
  shortcutYears: "Jahresansicht",
  shortcutHelp: "Diese Hilfe ein-/ausblenden",
  shortcutClose: "Bereiche schließen",

  exportChart: "Diagramm exportieren",
  shareLink: "Link teilen",
  linkCopied: "Link kopiert",
  sharedView: "Geteilte Ansicht",
  toggleTheme: "Thema wechseln",
  themeSystem: "Systemthema",
  themeLight: "Helles Thema",
  themeDark: "Dunkles Thema",
  settings: "Einstellungen",

  pageTitle: "dot life - Visualisiere dein Leben in Punkten",

  localeName: "Deutsch",
};
