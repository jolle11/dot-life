import type { Translations } from "./types";

export const ar: Translations = {
  welcomeDescription:
    "تصوّر حياتك بالنقاط. كل نقطة هي أسبوع أو شهر أو سنة. اكتشف كم عشت وكم تبقى.",
  welcomeQuestion: "متى ولدت؟",
  welcomeStart: "ابدأ",
  welcomeFooter: "بياناتك محفوظة محلياً في متصفحك.",

  birthDate: "تاريخ الميلاد",
  lifeExpectancy: "متوسط العمر المتوقع:",
  years: "سنة",
  view: "العرض",
  weeks: "أسابيع",
  months: "أشهر",

  age: "العمر",
  daysLived: "الأيام المعاشة",
  weeksLived: "الأسابيع المعاشة",
  weeksRemaining: "الأسابيع المتبقية",
  lifeLived: "نسبة الحياة",
  nextBirthday: "عيد الميلاد القادم",
  timeLived: "الوقت المعاش",
  timeRemaining: "الوقت المتبقي",
  daysUnit: "يوم",

  eachRowYear: (cols) => `كل صف = سنة واحدة (${cols} أسبوع)`,
  eachRowYearMonths: (cols) => `كل صف = سنة واحدة (${cols} شهر)`,
  eachRowDecade: (cols) => `كل صف = عقد واحد (${cols} سنة)`,
  weekLabel: "أسبوع",
  monthLabel: "شهر",
  yearLabel: "سنة",
  lived: "معاش",
  toLive: "متبقي",

  milestones: "محطات",
  addMilestone: "إضافة",
  saveMilestone: "حفظ",
  newMilestone: "محطة جديدة",
  milestonePlaceholder: "اسم المحطة...",
  dateRange: "نطاق التواريخ (مثال: الجامعة، العمل...)",
  noMilestones: "لا توجد محطات بعد",

  exportChart: "تصدير الرسم",
  shareLink: "مشاركة الرابط",
  linkCopied: "تم نسخ الرابط",
  sharedView: "عرض مشترك",
  toggleTheme: "تغيير المظهر",
  settings: "الإعدادات",

  pageTitle: "dot life - تصوّر حياتك بالنقاط",

  localeName: "العربية",
};
