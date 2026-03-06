import type { Translations } from "./types";

export const pt: Translations = {
  welcomeDescription:
    "Visualize a sua vida em pontos. Cada ponto é uma semana, um mês ou um ano. Descubra quanto já viveu e quanto falta.",
  welcomeQuestion: "Quando você nasceu?",
  welcomeStart: "Começar",
  welcomeFooter: "Seus dados são armazenados localmente no seu navegador.",

  birthDate: "Data de nascimento",
  lifeExpectancy: "Expectativa de vida:",
  years: "anos",
  view: "Visualização",
  weeks: "Semanas",
  months: "Meses",
  yearsView: "Anos",

  age: "Idade",
  daysLived: "Dias vividos",
  weeksLived: "Semanas vividas",
  weeksRemaining: "Semanas restantes",
  lifeLived: "Vida vivida",
  nextBirthday: "Próximo aniversário",
  timeLived: "Tempo vivido",
  timeRemaining: "Tempo restante",
  daysUnit: "dias",

  eachRowYear: (cols) => `Cada linha = 1 ano (${cols} semanas)`,
  eachRowYearMonths: (cols) => `Cada linha = 1 ano (${cols} meses)`,
  eachRowDecade: (cols) => `Cada linha = 1 década (${cols} anos)`,
  weekLabel: "Semana",
  monthLabel: "Mês",
  yearLabel: "Ano",
  lived: "Vivido",
  toLive: "Por viver",

  milestones: "Marcos",
  addMilestone: "Adicionar",
  saveMilestone: "Salvar",
  newMilestone: "Novo marco",
  milestonePlaceholder: "Nome do marco...",
  dateRange: "Intervalo de datas (ex: universidade, trabalho...)",
  noMilestones: "Nenhum marco ainda",

  dotShape: "Forma",

  funStats: "Estatísticas curiosas",
  heartbeats: "Batimentos estimados",
  breaths: "Respirações estimadas",
  hoursSlept: "Horas dormidas",
  fullMoons: "Luas cheias vividas",

  keyboardShortcuts: "Atalhos de teclado",
  shortcutWeeks: "Vista semanas",
  shortcutMonths: "Vista meses",
  shortcutYears: "Vista anos",
  shortcutHelp: "Mostrar/ocultar esta ajuda",
  shortcutClose: "Fechar painéis",

  exportChart: "Exportar gráfico",
  shareLink: "Compartilhar link",
  linkCopied: "Link copiado",
  sharedView: "Vista compartilhada",
  toggleTheme: "Alternar tema",
  themeSystem: "Tema do sistema",
  themeLight: "Tema claro",
  themeDark: "Tema escuro",
  settings: "Configurações",

  pageTitle: "dot life - Visualize a sua vida em pontos",

  localeName: "Português",
};
