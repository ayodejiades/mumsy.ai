export interface HealthRecord {
  id: string;
  date: string;
  systolicBP: number;
  diastolicBP: number;
  hemoglobin: number;
  weight: number;
}

export interface ChildRecord {
  id: string;
  date: string;
  weight: number;
  height: number;
  temperature?: number;
  headCircumference?: number;
  notes?: string;
}

export interface PredictionResult {
  riskLevel: "Low" | "Medium" | "High";
  condition: string;
  message: string;
  recommendation: string;
}

export interface UserProfile {
  name: string;
  age: number;
  weeksPregnant?: number;
  hasChild: boolean;
  childName?: string;
  childAgeMonths?: number;
  isCHWMode: boolean;
}
