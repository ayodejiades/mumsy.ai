export interface Patient {
  id?: number;
  name: string;
  phone: string;
  village: string;
  createdAt: string;
}

export interface Visit {
  id?: number;
  patientId: number;
  date: string;
  systolicBP: number;
  diastolicBP: number;
  weight: number;
  symptoms: string[];
  gestationalWeeks: number;
  previousComplications: string[];
  distance: string; // "<5km", "5-10km", ">10km"
  createdAt: string;
}

export type RiskLevel = "Low" | "Medium" | "High";

export interface RiskScore {
  preeclampsia: {
    level: RiskLevel;
    reasons: string[];
  };
  anemia: {
    level: RiskLevel;
    reasons: string[];
  };
  overallPriority: number; // Higher is more urgent (e.g., 0-10)
}

export const SYMPTOMS_LIST = [
  "Headache",
  "Blurred vision",
  "Upper abdominal pain",
  "Swelling (hands/face)",
  "Shortness of breath",
  "Extreme fatigue",
  "Dizziness",
  "Palpitations",
  "Pallor (pale skin)"
];

export const COMPLICATIONS_LIST = [
  "Preeclampsia",
  "Anemia",
  "Stillbirth",
  "Postpartum hemorrhage",
  "Miscarriage"
];
