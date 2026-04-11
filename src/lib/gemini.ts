import { HealthRecord, ChildRecord, PredictionResult } from "@/types";

export const predictHealthRisk = async (
  record: HealthRecord,
  maternalInfo: { age: number; weeksPregnant: number }
): Promise<PredictionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let riskLevel: "low" | "medium" | "high" = "low";
      let condition = "none";

      if (record.systolicBP >= 140 || record.diastolicBP >= 90) {
        riskLevel = "medium";
        condition = "Elevated Blood Pressure";
        
        if (record.systolicBP >= 160 || record.diastolicBP >= 110) {
          riskLevel = "high";
          condition = "Preeclampsia";
        }
      }

      if (record.hemoglobin < 11 && riskLevel !== "high") {
        riskLevel = "medium";
        condition = "Anemia";
      }

      const message = riskLevel === "low" 
        ? "Vitals are within normal ranges."
        : riskLevel === "medium"
        ? "Some vitals are elevated, indicating potential health risks."
        : "Critical vitals detected. Immediate medical intervention required.";

      const recommendation = riskLevel === "low" 
        ? "Continue normal antenatal care schedule and healthy diet."
        : riskLevel === "medium"
        ? "Schedule a follow-up check within 7 days. Monitor daily."
        : "Immediate medical referral required. Go to the nearest hospital.";

      resolve({
        riskLevel,
        condition,
        message,
        recommendation,
      });
    }, 1500);
  });
};

export const predictChildHealthRisk = async (
  record: ChildRecord,
  childInfo: { ageMonths: number }
): Promise<PredictionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let riskLevel: "low" | "medium" | "high" = "low";
      let condition = "none";

      if (record.temperature && record.temperature > 37.5) {
        riskLevel = "medium";
        condition = "Fever";
        if (record.temperature > 38.5) {
          riskLevel = "high";
          condition = "High Fever";
        }
      }

      const message = riskLevel === "low" 
        ? "Growth measurements look good."
        : riskLevel === "medium"
        ? "Slight temperature elevation detected."
        : "High fever detected. Immediate medical attention needed.";

      const recommendation = riskLevel === "low" 
        ? "Continue regular feeding and growth monitoring."
        : riskLevel === "medium"
        ? "Monitor temperature closely. Ensure adequate fluid intake."
        : "Seek immediate medical attention for high fever.";

      resolve({
        riskLevel,
        condition,
        message,
        recommendation,
      });
    }, 1500);
  });
};
