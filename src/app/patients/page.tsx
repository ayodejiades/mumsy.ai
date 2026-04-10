"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { calculateRisk, getRiskColor } from "@/lib/risk";

export default function PatientsList() {
  const [search, setSearch] = useState("");
  
  const patientsData = useLiveQuery(async () => {
    const patients = await db.patients.toArray();
    const visits = await db.visits.toArray();
    
    return patients.map(p => {
      const patientVisits = visits.filter(v => v.patientId === p.id);
      const risk = calculateRisk(patientVisits);
      return { patient: p, risk, visitCount: patientVisits.length };
    });
  }, []);

  if (!patientsData) {
    return <div className="p-4 text-center">Loading patients...</div>;
  }

  const filtered = patientsData.filter(d => 
    d.patient.name.toLowerCase().includes(search.toLowerCase()) ||
    d.patient.phone.includes(search) || 
    d.patient.village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">All Patients</h2>
        <Link href="/visit/new" className="bg-primary/10 text-primary p-2 rounded-full">
          <UserPlus className="h-6 w-6" />
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by name, phone or village..." 
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-8">No patients found.</p>
        )}
        
        {filtered.map(item => (
          <Card key={item.patient.id}>
            <Link href={`/patients/${item.patient.id}`}>
              <CardContent className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-lg">{item.patient.name}</h3>
                  <p className="text-sm text-gray-500">{item.patient.village}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {item.risk.overallPriority > 4 ? (
                    <Badge variant="destructive">High Risk</Badge>
                  ) : item.risk.overallPriority > 0 ? (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium Risk</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low Risk</Badge>
                  )}
                  <span className="text-xs text-gray-400">{item.visitCount} visits</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
