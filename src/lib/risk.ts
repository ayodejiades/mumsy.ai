import { type Visit, type RiskScore, type RiskLevel } from "./types";

/**
 * Calculates risk scores for a patient based on their visits.
 * We want to look at the latest visit and optionally consider trends.
 * In a real app, this would be a more sophisticated algorithm or ML model.
 */
export function calculateRisk(visits: Visit[]): RiskScore {
  const result: RiskScore = {
    preeclampsia: { level: "Low", reasons: [] },
    anemia: { level: "Low", reasons: [] },
    overallPriority: 0,
  };

  if (!visits || visits.length === 0) {
    return result;
  }

  // Sort visits newest first to get the latest
  const sortedVisits = [...visits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestVisit = sortedVisits[0];
  const previousVisit = sortedVisits.length > 1 ? sortedVisits[1] : null;

  let priorityScore = 0;

  // ==== PREECLAMPSIA LOGIC ====
  const peReasons: string[] = [];
  let peLevel: RiskLevel = "Low";

  const hasHighBP = latestVisit.systolicBP >= 140 || latestVisit.diastolicBP >= 90;
  if (hasHighBP) {
    peReasons.push(`High BP recorded: ${latestVisit.systolicBP}/${latestVisit.diastolicBP}`);
    peLevel = "High";
    priorityScore += 5;
  }

  // Check BP rise from previous visit
  if (previousVisit && !hasHighBP) {
    const sysRise = latestVisit.systolicBP - previousVisit.systolicBP;
    const diaRise = latestVisit.diastolicBP - previousVisit.diastolicBP;
    if (sysRise >= 30 || diaRise >= 15) {
      peReasons.push(`Significant BP rise since last visit (+${sysRise}/+${diaRise})`);
      peLevel = peLevel === "High" ? "High" : "Medium";
      priorityScore += 3;
    }
  }

  const peSymptoms = ["Headache", "Blurred vision", "Upper abdominal pain"];
  const presentPESymptoms = latestVisit.symptoms.filter(s => peSymptoms.includes(s));
  if (presentPESymptoms.length > 0) {
    peReasons.push(`Reported symptoms: ${presentPESymptoms.join(', ')}`);
    peLevel = "High";
    priorityScore += 4;
  }

  if (latestVisit.previousComplications.includes("Preeclampsia")) {
    peReasons.push("History of Preeclampsia");
    peLevel = peLevel === "Low" ? "Medium" : peLevel; // bump to at least medium
    priorityScore += 2;
  }

  result.preeclampsia.level = peLevel;
  result.preeclampsia.reasons = peReasons.length > 0 ? peReasons : ["Vitals normal, no warning symptoms."];

  // ==== ANEMIA LOGIC ====
  const anemiaReasons: string[] = [];
  let anemiaLevel: RiskLevel = "Low";

  const anemiaSymptoms = ["Extreme fatigue", "Pallor (pale skin)", "Dizziness"];
  const presentAnemiaSymptoms = latestVisit.symptoms.filter(s => anemiaSymptoms.includes(s));
  if (presentAnemiaSymptoms.length > 0) {
    anemiaReasons.push(`Reported symptoms: ${presentAnemiaSymptoms.join(', ')}`);
    anemiaLevel = "High";
    priorityScore += 4;
  }

  if (latestVisit.previousComplications.some(c => c === "Anemia" || c === "Postpartum hemorrhage")) {
    anemiaReasons.push("History of Anemia or Hemorrhage");
    anemiaLevel = anemiaLevel === "High" ? "High" : "Medium";
    priorityScore += 3;
  }

  // Weight check (simplistic: pregnant woman should generally gain over time)
  if (previousVisit) {
    const weightChange = latestVisit.weight - previousVisit.weight;
    if (weightChange < 0 && latestVisit.gestationalWeeks > 20) {
      anemiaReasons.push(`Weight loss (-${Math.abs(weightChange)}kg) during 2nd/3rd trimester`);
      anemiaLevel = anemiaLevel === "Low" ? "Medium" : anemiaLevel;
      priorityScore += 2;
    }
  }

  result.anemia.level = anemiaLevel;
  result.anemia.reasons = anemiaReasons.length > 0 ? anemiaReasons : ["No signs of anemia."];

  result.overallPriority = priorityScore;

  return result;
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "High": return "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    case "Medium": return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-400";
    case "Low": return "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
  }
}
