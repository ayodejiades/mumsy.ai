"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { calculateRisk } from "@/lib/risk";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navigation, ArrowLeft, Phone, MapPin, Plus, AlertTriangle, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { use } from "react";

export default function PatientProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const patientId = parseInt(id, 10);

  const data = useLiveQuery(async () => {
    const patient = await db.patients.get(patientId);
    if (!patient) return null;
    
    let visits = await db.visits.where('patientId').equals(patientId).toArray();
    visits = visits.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const risk = calculateRisk(visits);
    return { patient, visits, risk };
  }, [patientId]);

  if (data === undefined) return <div className="p-4 text-center">Loading profile...</div>;
  if (data === null) return <div className="p-4 text-center">Patient not found</div>;

  const { patient, visits, risk } = data;

  const chartData = visits.map(v => ({
    date: format(new Date(v.date), 'MMM d'),
    systolic: v.systolicBP,
    diastolic: v.diastolicBP,
    weight: v.weight,
  }));

  const handleEscalate = () => {
    const message = `URGENT REFERRAL: ${patient.name}, ${patient.phone}. \nRisk: High. Found symptoms/vitals needing immediate facility care.`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/patients" className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Patient Profile</h2>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{patient.name}</h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1 text-sm">
                <Phone className="h-4 w-4" /> {patient.phone}
              </p>
              <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
                <MapPin className="h-4 w-4" /> {patient.village}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
            <Button className="w-full" variant="outline" onClick={handleEscalate}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Refer / Escalate
            </Button>
            <Button className="w-full" asChild>
              <Link href={`/visit/new?patientId=${patient.id}`}>
                <Plus className="h-4 w-4 mr-2" />
                Add Visit
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {risk.overallPriority > 0 && (
        <Card className={risk.overallPriority > 4 ? "bg-red-50" : "bg-yellow-50"}>
          <CardContent className="p-4">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <AlertTriangle className={risk.overallPriority > 4 ? "text-red-500" : "text-yellow-600"} />
              Risk Assessment
            </h4>
            
            {risk.preeclampsia.level !== "Low" && (
              <div className="mb-2">
                <Badge variant={risk.preeclampsia.level === "High" ? "destructive" : "secondary"}>
                  Preeclampsia: {risk.preeclampsia.level}
                </Badge>
                <ul className="text-sm mt-1 list-disc pl-4 text-gray-700">
                  {risk.preeclampsia.reasons.map((r, i) => <li key={`pe-${i}`}>{r}</li>)}
                </ul>
              </div>
            )}

            {risk.anemia.level !== "Low" && (
              <div>
                <Badge variant={risk.anemia.level === "High" ? "destructive" : "secondary"}>
                  Anemia: {risk.anemia.level}
                </Badge>
                <ul className="text-sm mt-1 list-disc pl-4 text-gray-700">
                  {risk.anemia.reasons.map((r, i) => <li key={`an-${i}`}>{r}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {visits.length > 0 ? (
        <>
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800">Blood Pressure Trend</h4>
            <Card>
              <CardContent className="p-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{fontSize: 12}} />
                    <YAxis domain={['auto', 'auto']} tick={{fontSize: 12}} />
                    <Tooltip />
                    <ReferenceLine y={140} stroke="red" strokeDasharray="3 3" />
                    <ReferenceLine y={90} stroke="red" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800">Recent Visits History</h4>
            <div className="space-y-3">
              {[...visits].reverse().slice(0, 5).map((v) => (
                <Card key={v.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{format(new Date(v.date), 'MMMM d, yyyy')}</span>
                      <span className="text-sm text-gray-500">Week {v.gestationalWeeks}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm max-w-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500 block text-xs">BP</span>
                        <span className="font-semibold">{v.systolicBP}/{v.diastolicBP}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500 block text-xs">Weight</span>
                        <span className="font-semibold">{v.weight} kg</span>
                      </div>
                    </div>
                    {v.symptoms.length > 0 && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Symptoms: </span>
                        <span className="text-red-600">{v.symptoms.join(', ')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center text-gray-500">
            No visits recorded yet for this patient.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
