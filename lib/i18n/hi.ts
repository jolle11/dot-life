import type { Translations } from "./types";

export const hi: Translations = {
  welcomeDescription:
    "अपने जीवन को बिंदुओं में देखें। हर बिंदु एक सप्ताह, एक महीना या एक साल है। जानें कितना जी चुके हैं और कितना बाकी है।",
  welcomeQuestion: "आपका जन्मदिन कब है?",
  welcomeStart: "शुरू करें",
  welcomeFooter: "आपका डेटा आपके ब्राउज़र में स्थानीय रूप से सहेजा जाता है।",

  birthDate: "जन्म तिथि",
  lifeExpectancy: "जीवन प्रत्याशा:",
  years: "वर्ष",
  view: "दृश्य",
  weeks: "सप्ताह",
  months: "महीने",

  age: "उम्र",
  daysLived: "जीवित दिन",
  weeksLived: "जीवित सप्ताह",
  weeksRemaining: "शेष सप्ताह",
  lifeLived: "जीवन जिया",
  nextBirthday: "अगला जन्मदिन",
  timeLived: "जीवित समय",
  timeRemaining: "शेष समय",
  daysUnit: "दिन",

  eachRowYear: (cols) => `प्रत्येक पंक्ति = 1 वर्ष (${cols} सप्ताह)`,
  eachRowYearMonths: (cols) => `प्रत्येक पंक्ति = 1 वर्ष (${cols} महीने)`,
  eachRowDecade: (cols) => `प्रत्येक पंक्ति = 1 दशक (${cols} वर्ष)`,
  weekLabel: "सप्ताह",
  monthLabel: "महीना",
  yearLabel: "वर्ष",
  lived: "जीवित",
  toLive: "शेष",

  milestones: "मील के पत्थर",
  addMilestone: "जोड़ें",
  saveMilestone: "सहेजें",
  newMilestone: "नया मील का पत्थर",
  milestonePlaceholder: "मील के पत्थर का नाम...",
  dateRange: "तारीख सीमा (उदा: विश्वविद्यालय, काम...)",
  noMilestones: "अभी तक कोई मील का पत्थर नहीं",

  exportChart: "चार्ट निर्यात करें",
  shareLink: "लिंक साझा करें",
  linkCopied: "लिंक कॉपी किया गया",
  sharedView: "साझा दृश्य",
  toggleTheme: "थीम बदलें",
  settings: "सेटिंग्स",

  pageTitle: "dot life - अपने जीवन को बिंदुओं में देखें",

  localeName: "हिन्दी",
};
