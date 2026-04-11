import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity, Droplets, Scale, Save } from "lucide-react";
import { HealthRecord } from "@/types";

interface VitalsFormProps {
  onSave: (record: Omit<HealthRecord, 'id' | 'date'>) => void;
  isCHWMode: boolean;
}

export function VitalsForm({ onSave, isCHWMode }: VitalsFormProps) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      systolicBP: Number(systolic),
      diastolicBP: Number(diastolic),
      hemoglobin: Number(hemoglobin),
      weight: Number(weight),
    });
    // Reset form
    setSystolic("");
    setDiastolic("");
    setHemoglobin("");
    setWeight("");
  };

  return (
    <Card className="shadow-xl border-pink-100 overflow-hidden">
      <CardHeader className="bg-pink-50/50">
        <CardTitle className="text-xl text-pink-700 flex items-center gap-2">
          <Activity className="text-pink-500" />
          {isCHWMode ? "Record Health Data (Helper Mode)" : "Enter Today's Vitals"}
        </CardTitle>
        <CardDescription>
          {isCHWMode 
            ? "Enter the mother's readings from the medical devices." 
            : "Keep track of your daily health readings."}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bp" className="text-sm font-semibold text-gray-700">Blood Pressure (mmHg)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="systolic"
                  placeholder="Sys (e.g. 120)" 
                  type="number" 
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="text-lg h-12 border-pink-100 focus:ring-pink-500"
                  required
                />
                <span className="text-gray-400">/</span>
                <Input 
                  id="diastolic"
                  placeholder="Dia (e.g. 80)" 
                  type="number" 
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="text-lg h-12 border-pink-100 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hemoglobin" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Droplets size={16} className="text-red-500" />
                Hemoglobin (g/dL)
              </Label>
              <Input 
                id="hemoglobin"
                placeholder="e.g. 12.5" 
                type="number" 
                step="0.1"
                value={hemoglobin}
                onChange={(e) => setHemoglobin(e.target.value)}
                className="text-lg h-12 border-pink-100 focus:ring-pink-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Scale size={16} className="text-blue-500" />
                Weight (kg)
              </Label>
              <Input 
                id="weight"
                placeholder="e.g. 65.2" 
                type="number" 
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg h-12 border-pink-100 focus:ring-pink-500"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white h-14 text-lg rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95">
            <Save className="mr-2" />
            Save Records
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
