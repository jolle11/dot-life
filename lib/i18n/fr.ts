import type { Translations } from "./types";

export const fr: Translations = {
  welcomeDescription:
    "Visualisez votre vie en points. Chaque point est une semaine, un mois ou un an. Découvrez combien vous avez vécu et combien il vous reste.",
  welcomeQuestion: "Quand êtes-vous né(e) ?",
  welcomeStart: "Commencer",
  welcomeFooter: "Vos données sont stockées localement dans votre navigateur.",

  birthDate: "Date de naissance",
  lifeExpectancy: "Espérance de vie :",
  years: "ans",
  view: "Vue",
  weeks: "Semaines",
  months: "Mois",

  age: "Âge",
  daysLived: "Jours vécus",
  weeksLived: "Semaines vécues",
  weeksRemaining: "Semaines restantes",
  lifeLived: "Vie vécue",
  nextBirthday: "Prochain anniversaire",
  timeLived: "Temps vécu",
  timeRemaining: "Temps restant",
  daysUnit: "jours",

  eachRowYear: (cols) => `Chaque ligne = 1 an (${cols} semaines)`,
  eachRowYearMonths: (cols) => `Chaque ligne = 1 an (${cols} mois)`,
  eachRowDecade: (cols) => `Chaque ligne = 1 décennie (${cols} ans)`,
  weekLabel: "Semaine",
  monthLabel: "Mois",
  yearLabel: "Année",
  lived: "Vécu",
  toLive: "À vivre",

  milestones: "Jalons",
  addMilestone: "Ajouter",
  saveMilestone: "Enregistrer",
  newMilestone: "Nouveau jalon",
  milestonePlaceholder: "Nom du jalon...",
  dateRange: "Plage de dates (ex : université, travail...)",
  noMilestones: "Aucun jalon pour le moment",

  exportChart: "Exporter le graphique",
  shareLink: "Partager le lien",
  linkCopied: "Lien copié",
  sharedView: "Vue partagée",
  toggleTheme: "Changer le thème",
  settings: "Paramètres",

  pageTitle: "dot life - Visualisez votre vie en points",

  localeName: "Français",
};
