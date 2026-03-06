import type { Translations } from "./types";

export const ja: Translations = {
  welcomeDescription:
    "あなたの人生をドットで視覚化。各ドットは1週間、1ヶ月、または1年。どれだけ生きたか、あとどれくらい残っているかを発見しよう。",
  welcomeQuestion: "誕生日はいつですか？",
  welcomeStart: "はじめる",
  welcomeFooter: "データはブラウザにローカル保存されます。",

  birthDate: "生年月日",
  lifeExpectancy: "平均寿命：",
  years: "歳",
  view: "表示",
  weeks: "週",
  months: "月",

  age: "年齢",
  daysLived: "生きた日数",
  weeksLived: "生きた週数",
  weeksRemaining: "残りの週数",
  lifeLived: "人生の進捗",
  nextBirthday: "次の誕生日",
  timeLived: "生きた時間",
  timeRemaining: "残りの時間",
  daysUnit: "日",

  eachRowYear: (cols) => `各行 = 1年（${cols}週）`,
  eachRowYearMonths: (cols) => `各行 = 1年（${cols}ヶ月）`,
  eachRowDecade: (cols) => `各行 = 10年（${cols}年）`,
  weekLabel: "週",
  monthLabel: "月",
  yearLabel: "年",
  lived: "生きた",
  toLive: "これから",

  milestones: "マイルストーン",
  addMilestone: "追加",
  saveMilestone: "保存",
  newMilestone: "新しいマイルストーン",
  milestonePlaceholder: "マイルストーン名...",
  dateRange: "期間（例：大学、仕事...）",
  noMilestones: "マイルストーンはまだありません",

  exportChart: "画像を書き出す",
  shareLink: "リンクを共有",
  linkCopied: "リンクをコピーしました",
  sharedView: "共有ビュー",
  toggleTheme: "テーマ切替",
  settings: "設定",

  pageTitle: "dot life - あなたの人生をドットで視覚化",

  localeName: "日本語",
};
