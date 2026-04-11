export interface HealthRecord {
  id: string;
  date: string;
  systolicBP: number;
  diastolicBP: number;
  hemoglobin: number;
  weight: number;
  fetalHeartRate?: number;
  notes?: string;
}

export interface ChildRecord {
  id: string;
  date: string;
  weight: number;
  height: number;
  headCircumference?: number;
  temperature?: number;
  vaccinations?: string[];
  notes?: string;
}

export interface PredictionResult {
  riskLevel: 'low' | 'medium' | 'high';
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
  isCHWMode: boolean; // Community Health Worker mode
}
