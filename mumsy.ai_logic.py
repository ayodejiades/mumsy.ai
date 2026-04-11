import from datetime import datetime, timedelta


client = ()


def analyze_patient_risk(patient_data: dict) -> dict:
    """
    Analyses patient data to predict preeclampsia and anaemia risk,
    and generates a personalised weekly action plan for the CHW.
    """


    prompt = f"""
    You are a maternal health AI assistant supporting Community Health Workers (CHWs).
    
    Analyse the following patient data and do TWO things:
    
    1. RISK PREDICTION: Predict the risk level (Low/Medium/High) for:
       - Preeclampsia over the next 4 weeks
       - Anaemia over the next 4 weeks
       Include a brief clinical rationale for each prediction.
    
    2. WEEKLY ACTION PLAN: Generate a personalised 4-week action plan for the CHW that specifies:
       - WHO to visit (patient name, location, priority level)
       - WHAT to check during each visit (specific vitals, symptoms, lab indicators)
       - WHEN to escalate (clear threshold-based escalation criteria)
    
    Patient Data:
    - Name: {patient_data['name']}
    - Age: {patient_data['age']}
    - Gestational Age: {patient_data['gestational_age']} weeks
    - Blood Pressure: {patient_data['blood_pressure']}
    - Hemoglobin Level: {patient_data['hemoglobin']} g/dL
    - Edema: {patient_data['edema']}
    - Previous Pregnancies: {patient_data['previous_pregnancies']}
    - Symptoms: {', '.join(patient_data['symptoms'])}
    - Last Visit Date: {patient_data['last_visit']}
    
    Respond in structured JSON format with keys: 
    "risk_assessment" and "weekly_action_plan"
    """


    response = client.messages.create(
        model=" ",
        max_tokens=1500,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )


    return {
        "patient": patient_data['name'],
        "analysis_date": datetime.now().strftime("%Y-%m-%d"),
        "ai_response": response.content[0].text
    }




def generate_chw_dashboard(patients: list) -> None:
    """
    Processes multiple patients and displays a CHW action dashboard.
    """
    print("=" * 60)
    print("CHW MATERNAL HEALTH DASHBOARD")
    print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 60)


    for patient_data in patients:
        print(f"\nProcessing patient: {patient_data['name']}...")
        result = analyze_patient_risk(patient_data)


        print(f"\n{'─' * 40}")
        print(f"Patient: {result['patient']}")
        print(f"Analysis Date: {result['analysis_date']}")
        print(f"\nAI Assessment & Action Plan:")
        print(result['ai_response'])
        print(f"{'─' * 40}")




# Example usage
if __name__ == "__main__":
    patients = [
        {
            "name": "Amara Amaka",
            "age": 25,
            "gestational_age": 30,
            "blood_pressure": "145/95 mmHg",
            "haemoglobin": 9.2,
            "oedema": "mild ankle swelling",
            "previous_pregnancies": 1,
            "symptoms": ["headache", "blurred vision", "fatigue"],
            "last_visit": "2024-01-08"
        },
        {
            "name": "Fatima Muhammad",
            "age": 22,
            "gestational_age": 24,
            "blood_pressure": "118/76 mmHg",
            "haemoglobin": 7.8,
            "oedema": "none",
            "previous_pregnancies": 0,
            "symptoms": ["fatigue", "dizziness", "pale conjunctiva"],
            "last_visit": "2024-01-05"
        }
    ]


    generate_chw_dashboard(patients)