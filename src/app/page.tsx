"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { calculateRisk, getRiskColor } from "@/lib/risk";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AlertCircle, Calendar, User } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const data = useLiveQuery(async () => {
    const patients = await db.patients.toArray();
    const visits = await db.visits.toArray();
    
    // map visits to patients and calculate risk
    const patientRisks = patients.map(p => {
      const patientVisits = visits.filter(v => v.patientId === p.id);
      const risk = calculateRisk(patientVisits);
      const lastVisit = patientVisits.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      return { patient: p, risk, lastVisit, patientVisits };
    });

    // sort by highest priority
    patientRisks.sort((a, b) => b.risk.overallPriority - a.risk.overallPriority);

    return patientRisks;
  }, []);

  if (!data) {
    return <div className="p-4 text-center">Loading priorities...</div>;
  }

  // Filter out patients with NO visits yet, they need initial visit, maybe priority?
  // Let's just list them all but prioritize high risk.
  const highRisk = data.filter(d => d.risk.overallPriority > 4);
  const others = data.filter(d => d.risk.overallPriority <= 4);

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Weekly Action Plan</h2>
        <p className="text-gray-500 text-sm mt-1">Focus on these patients immediately.</p>
      </div>

      {highRisk.length === 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center text-green-800">
            <p className="font-semibold">All clear for this week!</p>
            <p className="text-sm">No high-risk patients currently.</p>
          </CardContent>
        </Card>
      )}

      {highRisk.map((item) => (
        <Card key={`high-${item.patient.id}`} className="border-red-200 bg-red-50/30">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{item.patient.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <User className="h-3 w-3" /> {item.patient.village} • {item.patient.phone}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                {item.risk.preeclampsia.level === "High" && (
                  <Badge variant="destructive" className="bg-red-600">PE Risk: High</Badge>
                )}
                {item.risk.anemia.level === "High" && (
                  <Badge variant="destructive" className="bg-red-600">Anemia: High</Badge>
                )}
              </div>
            </div>

            <div className="bg-white p-3 rounded-md text-sm border border-red-100 flex gap-2 items-start">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Action Required: Visit ASAP</p>
                <ul className="list-disc pl-4 text-red-700 mt-1 space-y-1">
                  {item.risk.preeclampsia.level === "High" && item.risk.preeclampsia.reasons.map((r, i) => <li key={`pe-${i}`}>{r}</li>)}
                  {item.risk.anemia.level === "High" && item.risk.anemia.reasons.map((r, i) => <li key={`an-${i}`}>{r}</li>)}
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 pt-2 border-t border-red-100">
              <span className="text-xs text-gray-500">
                Last checked: {item.lastVisit ? format(new Date(item.lastVisit.date), "MMM d, yyyy") : "Never"}
              </span>
              <Link 
                href={`/patients/${item.patient.id}`} 
                className="text-sm font-semibold text-primary px-3 py-1 bg-white border border-primary/20 rounded-md shadow-sm"
              >
                View Profile
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}

      {others.length > 0 && (
        <div className="pt-4">
          <h3 className="font-semibold text-gray-700 mb-3">Other Patients</h3>
          <div className="space-y-3">
            {others.map((item) => (
              <Card key={`other-${item.patient.id}`} className="shadow-sm">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.patient.name}</h4>
                    <span className="text-xs text-gray-500 inline-flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" /> 
                      {item.lastVisit ? format(new Date(item.lastVisit.date), "MMM d") : "No visits"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.risk.preeclampsia.level === "Medium" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">PE: Med</Badge>}
                    {item.risk.anemia.level === "Medium" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Anemia: Med</Badge>}
                    {item.risk.overallPriority === 0 && <Badge className="bg-green-100 text-green-800 hover:bg-green-200 shadow-none">Low Risk</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
