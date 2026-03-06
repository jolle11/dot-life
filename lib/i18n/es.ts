import type { Translations } from "./types";

export const es: Translations = {
  welcomeDescription:
    "Visualiza tu vida en puntos. Cada punto es una semana, un mes o un año. Descubre cuánto has vivido y cuánto te queda.",
  welcomeQuestion: "¿Cuándo naciste?",
  welcomeStart: "Comenzar",
  welcomeFooter: "Tus datos se guardan localmente en tu navegador.",

  birthDate: "Fecha de nacimiento",
  lifeExpectancy: "Esperanza de vida:",
  years: "años",
  view: "Vista",
  weeks: "Semanas",
  months: "Meses",
  yearsView: "Años",

  age: "Edad",
  daysLived: "Días vividos",
  weeksLived: "Semanas vividas",
  weeksRemaining: "Semanas restantes",
  lifeLived: "Vida vivida",
  nextBirthday: "Próximo cumpleaños",
  timeLived: "Tiempo vivido",
  timeRemaining: "Tiempo restante",
  daysUnit: "días",

  eachRowYear: (cols) => `Cada fila = 1 año (${cols} semanas)`,
  eachRowYearMonths: (cols) => `Cada fila = 1 año (${cols} meses)`,
  eachRowDecade: (cols) => `Cada fila = 1 década (${cols} años)`,
  weekLabel: "Semana",
  monthLabel: "Mes",
  yearLabel: "Año",
  lived: "Vivido",
  toLive: "Por vivir",

  milestones: "Milestones",
  addMilestone: "Añadir",
  saveMilestone: "Guardar",
  newMilestone: "Nuevo milestone",
  milestonePlaceholder: "Nombre del milestone...",
  dateRange: "Rango de fechas (ej: universidad, trabajo...)",
  noMilestones: "No hay milestones todavía",

  dotShape: "Forma",

  funStats: "Estadísticas curiosas",
  heartbeats: "Latidos estimados",
  breaths: "Respiraciones estimadas",
  hoursSlept: "Horas dormidas",
  fullMoons: "Lunas llenas vividas",

  keyboardShortcuts: "Atajos de teclado",
  shortcutWeeks: "Vista semanas",
  shortcutMonths: "Vista meses",
  shortcutYears: "Vista años",
  shortcutHelp: "Mostrar/ocultar esta ayuda",
  shortcutClose: "Cerrar paneles",

  exportChart: "Exportar gráfico",
  shareLink: "Compartir enlace",
  linkCopied: "Enlace copiado",
  sharedView: "Vista compartida",
  toggleTheme: "Cambiar tema",
  themeSystem: "Tema del sistema",
  themeLight: "Tema claro",
  themeDark: "Tema oscuro",
  settings: "Ajustes",

  pageTitle: "dot life - Visualiza tu vida en puntos",

  localeName: "Español",
};
