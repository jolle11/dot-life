import type { Translations } from "./types";

export const ca: Translations = {
  welcomeDescription:
    "Visualitza la teva vida en punts. Cada punt és una setmana, un mes o un any. Descobreix quant has viscut i quant et queda.",
  welcomeQuestion: "Quan vas néixer?",
  welcomeStart: "Començar",
  welcomeFooter: "Les teves dades es guarden localment al teu navegador.",

  birthDate: "Data de naixement",
  lifeExpectancy: "Esperança de vida:",
  years: "anys",
  view: "Vista",
  weeks: "Setmanes",
  months: "Mesos",

  age: "Edat",
  daysLived: "Dies viscuts",
  weeksLived: "Setmanes viscudes",
  weeksRemaining: "Setmanes restants",
  lifeLived: "Vida viscuda",
  nextBirthday: "Proper aniversari",
  timeLived: "Temps viscut",
  timeRemaining: "Temps restant",
  daysUnit: "dies",

  eachRowYear: (cols) => `Cada fila = 1 any (${cols} setmanes)`,
  eachRowYearMonths: (cols) => `Cada fila = 1 any (${cols} mesos)`,
  eachRowDecade: (cols) => `Cada fila = 1 dècada (${cols} anys)`,
  weekLabel: "Setmana",
  monthLabel: "Mes",
  yearLabel: "Any",
  lived: "Viscut",
  toLive: "Per viure",

  milestones: "Fites",
  addMilestone: "Afegir",
  saveMilestone: "Desar",
  newMilestone: "Nova fita",
  milestonePlaceholder: "Nom de la fita...",
  dateRange: "Rang de dates (ex: universitat, feina...)",
  noMilestones: "No hi ha fites encara",

  exportChart: "Exportar gràfic",
  shareLink: "Compartir enllaç",
  linkCopied: "Enllaç copiat",
  sharedView: "Vista compartida",
  toggleTheme: "Canviar tema",
  settings: "Ajustos",

  pageTitle: "dot life - Visualitza la teva vida en punts",

  localeName: "Català",
};
