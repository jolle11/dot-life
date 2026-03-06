import type { Translations } from "./types";

export const ko: Translations = {
  welcomeDescription:
    "당신의 인생을 점으로 시각화하세요. 각 점은 1주, 1개월 또는 1년입니다. 얼마나 살았고 얼마나 남았는지 확인하세요.",
  welcomeQuestion: "생년월일이 언제인가요?",
  welcomeStart: "시작하기",
  welcomeFooter: "데이터는 브라우저에 로컬로 저장됩니다.",

  birthDate: "생년월일",
  lifeExpectancy: "기대 수명:",
  years: "세",
  view: "보기",
  weeks: "주",
  months: "월",

  age: "나이",
  daysLived: "살아온 일수",
  weeksLived: "살아온 주수",
  weeksRemaining: "남은 주수",
  lifeLived: "살아온 비율",
  nextBirthday: "다음 생일",
  timeLived: "살아온 시간",
  timeRemaining: "남은 시간",
  daysUnit: "일",

  eachRowYear: (cols) => `각 행 = 1년 (${cols}주)`,
  eachRowYearMonths: (cols) => `각 행 = 1년 (${cols}개월)`,
  eachRowDecade: (cols) => `각 행 = 10년 (${cols}년)`,
  weekLabel: "주",
  monthLabel: "월",
  yearLabel: "년",
  lived: "살아옴",
  toLive: "남은 삶",

  milestones: "이정표",
  addMilestone: "추가",
  saveMilestone: "저장",
  newMilestone: "새 이정표",
  milestonePlaceholder: "이정표 이름...",
  dateRange: "기간 (예: 대학교, 직장...)",
  noMilestones: "아직 이정표가 없습니다",

  exportChart: "차트 내보내기",
  shareLink: "링크 공유",
  linkCopied: "링크 복사됨",
  sharedView: "공유 보기",
  toggleTheme: "테마 변경",
  settings: "설정",

  pageTitle: "dot life - 당신의 인생을 점으로 시각화",

  localeName: "한국어",
};
