"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SYMPTOMS_LIST, COMPLICATIONS_LIST, Patient } from "@/lib/types";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function NewVisitPage({ searchParams }: { searchParams: Promise<{ patientId?: string }> }) {
  const router = useRouter();
  const searchParamsValue = use(searchParams);
  const initialPatientId = searchParamsValue.patientId ? parseInt(searchParamsValue.patientId, 10) : null;

  const allPatients = useLiveQuery(() => db.patients.toArray(), []);

  const [step, setStep] = useState<"SELECT_PATIENT" | "NEW_PATIENT" | "VISIT_FORM">(
    initialPatientId ? "VISIT_FORM" : "SELECT_PATIENT"
  );
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(initialPatientId);

  // New Patient Form State
  const [newPatient, setNewPatient] = useState({ name: "", phone: "", village: "" });

  // Visit Form State
  const [visit, setVisit] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    systolicBP: "",
    diastolicBP: "",
    weight: "",
    gestationalWeeks: "",
    distance: "<5km",
    symptoms: [] as string[],
    previousComplications: [] as string[]
  });

  const handleCreatePatient = async () => {
    if (!newPatient.name || !newPatient.phone || !newPatient.village) {
      alert("Please fill all patient details");
      return;
    }
    const p: Patient = {
      ...newPatient,
      createdAt: new Date().toISOString()
    };
    const id = await db.patients.add(p);
    setSelectedPatientId(id);
    setStep("VISIT_FORM");
  };

  const handleSaveVisit = async () => {
    if (!selectedPatientId) return;
    if (!visit.systolicBP || !visit.diastolicBP || !visit.weight || !visit.gestationalWeeks) {
      alert("Please fill all numeric fields (BP, weight, weeks).");
      return;
    }

    await db.visits.add({
      patientId: selectedPatientId,
      date: visit.date,
      systolicBP: parseInt(visit.systolicBP, 10),
      diastolicBP: parseInt(visit.diastolicBP, 10),
      weight: parseFloat(visit.weight),
      gestationalWeeks: parseInt(visit.gestationalWeeks, 10),
      distance: visit.distance,
      symptoms: visit.symptoms,
      previousComplications: visit.previousComplications,
      createdAt: new Date().toISOString()
    });

    router.push(`/patients/${selectedPatientId}`);
  };

  const toggleArrayItem = (array: string[], setArray: (val: string[]) => void, item: string) => {
    if (array.includes(item)) setArray(array.filter(i => i !== item));
    else setArray([...array, item]);
  };

  if (!allPatients) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto pb-24 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">
          {step === "VISIT_FORM" ? "New ANC Visit" : "Select Patient"}
        </h2>
      </div>

      {step === "SELECT_PATIENT" && (
        <div className="space-y-4">
          <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700" onClick={() => setStep("NEW_PATIENT")}>
            + Register New Patient
          </Button>

          <div className="pt-4 space-y-2">
            <h3 className="font-semibold text-gray-600">Or Select Existing Patient:</h3>
            <select 
              className="w-full p-4 border rounded-lg text-lg bg-white"
              value={selectedPatientId || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  setSelectedPatientId(parseInt(val, 10));
                  setStep("VISIT_FORM");
                }
              }}
            >
              <option value="">-- Choose Patient --</option>
              {allPatients.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.phone}) - {p.village}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === "NEW_PATIENT" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input type="text" className="w-full p-3 border rounded-lg text-lg" placeholder="e.g. Fatima Ali" value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input type="tel" className="w-full p-3 border rounded-lg text-lg" placeholder="080..." value={newPatient.phone} onChange={e => setNewPatient({...newPatient, phone: e.target.value})} />
            </div>
            <div>
              <label className="block font-medium mb-1">Village / Ward</label>
              <input type="text" className="w-full p-3 border rounded-lg text-lg" placeholder="Village name" value={newPatient.village} onChange={e => setNewPatient({...newPatient, village: e.target.value})} />
            </div>
            <div className="pt-4 flex gap-4">
              <Button variant="outline" className="w-full h-14" onClick={() => setStep("SELECT_PATIENT")}>Cancel</Button>
              <Button className="w-full h-14" onClick={handleCreatePatient}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "VISIT_FORM" && (
        <div className="space-y-6">
          <Card className="border-t-4 border-t-primary shadow-sm bg-white">
            <CardContent className="p-6 space-y-5">
              
              <div>
                <label className="block font-bold text-gray-700 mb-2">Visit Date</label>
                <input type="date" className="w-full p-4 border rounded-lg text-lg bg-gray-50" value={visit.date} onChange={e => setVisit({...visit, date: e.target.value})} />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-2">Blood Pressure (mmHg)</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Systolic (120)" className="w-1/2 p-4 border rounded-lg text-xl text-center bg-gray-50 placeholder:text-gray-400" value={visit.systolicBP} onChange={e => setVisit({...visit, systolicBP: e.target.value})} />
                  <span className="text-3xl text-gray-400 font-light">/</span>
                  <input type="number" placeholder="Diastolic (80)" className="w-1/2 p-4 border rounded-lg text-xl text-center bg-gray-50 placeholder:text-gray-400" value={visit.diastolicBP} onChange={e => setVisit({...visit, diastolicBP: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Weight (kg)</label>
                  <input type="number" placeholder="e.g. 65" className="w-full p-4 border rounded-lg text-xl bg-gray-50" value={visit.weight} onChange={e => setVisit({...visit, weight: e.target.value})} />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Weeks Preg.</label>
                  <input type="number" placeholder="e.g. 24" className="w-full p-4 border rounded-lg text-xl bg-gray-50" value={visit.gestationalWeeks} onChange={e => setVisit({...visit, gestationalWeeks: e.target.value})} />
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-gray-800 border-b pb-2">Warning Symptoms currently present</h3>
              <div className="flex flex-wrap gap-2">
                {SYMPTOMS_LIST.map(sym => {
                  const isSelected = visit.symptoms.includes(sym);
                  return (
                    <button 
                      key={sym} 
                      onClick={() => toggleArrayItem(visit.symptoms, s => setVisit({...visit, symptoms: s}), sym)}
                      className={`px-4 py-3 rounded-full border-2 text-sm font-medium transition-all ${isSelected ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                    >
                      {sym}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-gray-800 border-b pb-2">Previous Medical Complications</h3>
              <div className="flex flex-wrap gap-2">
                {COMPLICATIONS_LIST.map(comp => {
                  const isSelected = visit.previousComplications.includes(comp);
                  return (
                    <button 
                      key={comp} 
                      onClick={() => toggleArrayItem(visit.previousComplications, c => setVisit({...visit, previousComplications: c}), comp)}
                      className={`px-4 py-3 rounded-full border-2 text-sm font-medium transition-all ${isSelected ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                    >
                      {comp}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-gray-800">Distance to Nearest Facility</h3>
              <select className="w-full p-4 border rounded-lg text-lg bg-white" value={visit.distance} onChange={e => setVisit({...visit, distance: e.target.value})}>
                <option value="<5km">&lt; 5km (Close)</option>
                <option value="5-10km">5 - 10km (Moderate)</option>
                <option value=">10km">&gt; 10km (Far)</option>
              </select>
            </CardContent>
          </Card>

          <Button className="w-full h-16 text-xl shadow-lg mt-8 bg-blue-600 hover:bg-blue-700" onClick={handleSaveVisit}>
            <Save className="mr-2 h-6 w-6" /> Save ANC Visit
          </Button>

        </div>
      )}
    </div>
  );
}
