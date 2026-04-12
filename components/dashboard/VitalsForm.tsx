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
    setSystolic("");
    setDiastolic("");
    setHemoglobin("");
    setWeight("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="systolic" className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Blood Pressure (mmHg)</Label>
            <div className="flex items-center gap-3">
              <Input 
                id="systolic"
                placeholder="Systolic" 
                type="number" 
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-primary focus:ring-primary/20 transition-all font-medium"
                required
              />
              <span className="text-on-surface-variant font-bold text-xl">/</span>
              <Input 
                id="diastolic"
                placeholder="Diastolic" 
                type="number" 
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-primary focus:ring-primary/20 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="hemoglobin" className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
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
              className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-primary focus:ring-primary/20 transition-all font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="weight" className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
              <Scale size={16} className="text-primary" />
              Weight (kg)
            </Label>
            <Input 
              id="weight"
              placeholder="e.g. 65.2" 
              type="number" 
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-primary focus:ring-primary/20 transition-all font-medium"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-br from-primary to-primary-container text-white h-16 text-lg rounded-2xl font-headline font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98] hover:opacity-90"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">save</span>
            Save Health Record
          </div>
        </button>
      </form>
    </div>
  );
}
