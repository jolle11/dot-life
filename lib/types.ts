export type ViewMode = "weeks" | "months" | "years";

export interface Milestone {
  id: string;
  label: string;
  date: string;
  endDate?: string;
  color: string;
}

export interface LifeConfig {
  birthDate: string;
  lifeExpectancy: number;
  viewMode: ViewMode;
  milestones: Milestone[];
}
