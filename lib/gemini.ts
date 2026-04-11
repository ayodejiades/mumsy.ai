import { GoogleGenAI, Type } from "@google/genai";
import { HealthRecord, PredictionResult, ChildRecord } from "@/types";

function getAI() {
  return new GoogleGenAI({ apiKey: "asa"});//process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });
}

export async function predictHealthRisk(
  record: HealthRecord,
  profile: { age: number; weeksPregnant: number }
): Promise<PredictionResult> {
  const ai = getAI();
  const prompt = `
    Analyze the following health data for a pregnant woman:
    - Age: ${profile.age}
    - Weeks Pregnant: ${profile.weeksPregnant}
    - Blood Pressure: ${record.systolicBP}/${record.diastolicBP} mmHg
    - Hemoglobin: ${record.hemoglobin} g/dL
    - Weight: ${record.weight} kg
    
    Assess the risk for Preeclampsia and Anemia.
    Preeclampsia risk is high if BP >= 140/90.
    Anemia risk is high if Hemoglobin < 11 g/dL.
    
    Return the result in JSON format with the following structure:
    {
      "riskLevel": "low" | "medium" | "high",
      "condition": "preeclampsia" | "anemia" | "none",
      "message": "A clear, simple explanation of the risk",
      "recommendation": "What the user or health worker should do next"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ["low", "medium", "high"] },
            condition: { type: Type.STRING, enum: ["preeclampsia", "anemia", "none"] },
            message: { type: Type.STRING },
            recommendation: { type: Type.STRING },
          },
          required: ["riskLevel", "condition", "message", "recommendation"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Prediction Error:", error);
    // Fallback logic if AI fails
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let condition: 'preeclampsia' | 'anemia' | 'none' = 'none';
    let message = "Vitals are within normal range.";
    let recommendation = "Continue regular checkups.";

    if (record.systolicBP >= 140 || record.diastolicBP >= 90) {
      riskLevel = 'high';
      condition = 'preeclampsia';
      message = "High blood pressure detected. This could be a sign of preeclampsia.";
      recommendation = "Contact your health professional immediately.";
    } else if (record.hemoglobin < 11) {
      riskLevel = 'high';
      condition = 'anemia';
      message = "Low hemoglobin levels detected. This could be a sign of anemia.";
      recommendation = "Increase iron-rich food intake and consult your doctor.";
    }

    return { riskLevel, condition, message, recommendation };
  }
}

export async function predictChildHealthRisk(
  record: ChildRecord,
  profile: { ageMonths: number }
): Promise<PredictionResult> {
  const ai = getAI();
  const prompt = `
    Analyze the following health data for a child:
    - Age: ${profile.ageMonths} months
    - Weight: ${record.weight} kg
    - Height: ${record.height} cm
    - Temperature: ${record.temperature || 'N/A'} °C
    
    Assess the risk for malnutrition (stunting/wasting) and fever.
    Fever risk is high if Temperature > 37.5 °C.
    
    Return the result in JSON format with the following structure:
    {
      "riskLevel": "low" | "medium" | "high",
      "condition": "malnutrition" | "fever" | "none",
      "message": "A clear, simple explanation of the risk",
      "recommendation": "What the parent or health worker should do next"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ["low", "medium", "high"] },
            condition: { type: Type.STRING, enum: ["malnutrition", "fever", "none"] },
            message: { type: Type.STRING },
            recommendation: { type: Type.STRING },
          },
          required: ["riskLevel", "condition", "message", "recommendation"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Child Prediction Error:", error);
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let condition = 'none';
    let message = "Child's vitals are within normal range.";
    let recommendation = "Continue regular growth monitoring.";

    if (record.temperature && record.temperature > 37.5) {
      riskLevel = 'high';
      condition = 'fever';
      message = "High temperature detected. This could be a sign of infection.";
      recommendation = "Consult a pediatrician and monitor temperature closely.";
    }

    return { riskLevel, condition, message, recommendation };
  }
}
