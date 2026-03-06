import type { Translations } from "./types";

export const it: Translations = {
  welcomeDescription:
    "Visualizza la tua vita in punti. Ogni punto è una settimana, un mese o un anno. Scopri quanto hai vissuto e quanto ti resta.",
  welcomeQuestion: "Quando sei nato/a?",
  welcomeStart: "Inizia",
  welcomeFooter: "I tuoi dati vengono salvati localmente nel browser.",

  birthDate: "Data di nascita",
  lifeExpectancy: "Aspettativa di vita:",
  years: "anni",
  view: "Vista",
  weeks: "Settimane",
  months: "Mesi",

  age: "Età",
  daysLived: "Giorni vissuti",
  weeksLived: "Settimane vissute",
  weeksRemaining: "Settimane rimanenti",
  lifeLived: "Vita vissuta",
  nextBirthday: "Prossimo compleanno",
  timeLived: "Tempo vissuto",
  timeRemaining: "Tempo rimanente",
  daysUnit: "giorni",

  eachRowYear: (cols) => `Ogni riga = 1 anno (${cols} settimane)`,
  eachRowYearMonths: (cols) => `Ogni riga = 1 anno (${cols} mesi)`,
  eachRowDecade: (cols) => `Ogni riga = 1 decennio (${cols} anni)`,
  weekLabel: "Settimana",
  monthLabel: "Mese",
  yearLabel: "Anno",
  lived: "Vissuto",
  toLive: "Da vivere",

  milestones: "Traguardi",
  addMilestone: "Aggiungi",
  saveMilestone: "Salva",
  newMilestone: "Nuovo traguardo",
  milestonePlaceholder: "Nome del traguardo...",
  dateRange: "Intervallo di date (es: università, lavoro...)",
  noMilestones: "Nessun traguardo ancora",

  exportChart: "Esporta grafico",
  shareLink: "Condividi link",
  linkCopied: "Link copiato",
  sharedView: "Vista condivisa",
  toggleTheme: "Cambia tema",
  settings: "Impostazioni",

  pageTitle: "dot life - Visualizza la tua vita in punti",

  localeName: "Italiano",
};
