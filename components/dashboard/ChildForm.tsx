import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Baby, Ruler, Scale, Thermometer, Save } from "lucide-react";
import { ChildRecord } from "@/types";

interface ChildFormProps {
  onSave: (record: Omit<ChildRecord, 'id' | 'date'>) => void;
  isCHWMode: boolean;
  childName?: string;
}

export function ChildForm({ onSave, isCHWMode, childName }: ChildFormProps) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [temperature, setTemperature] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      weight: Number(weight),
      height: Number(height),
      headCircumference: headCircumference ? Number(headCircumference) : undefined,
      temperature: temperature ? Number(temperature) : undefined,
      notes,
    });
    setWeight("");
    setHeight("");
    setHeadCircumference("");
    setTemperature("");
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label htmlFor="weight" className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
              <Scale size={16} className="text-blue-600" />
              Weight (kg)
            </Label>
            <Input 
              id="weight"
              placeholder="e.g. 8.5" 
              type="number" 
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-blue-500 focus:ring-blue-500/20 font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="height" className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
              <Ruler size={16} className="text-green-600" />
              Height (cm)
            </Label>
            <Input 
              id="height"
              placeholder="e.g. 72" 
              type="number" 
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-blue-500 focus:ring-blue-500/20 font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="temp" className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
              <Thermometer size={16} className="text-orange-500" />
              Temperature (°C)
            </Label>
            <Input 
              id="temp"
              placeholder="e.g. 36.6" 
              type="number" 
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="text-lg h-14 rounded-2xl border-outline-variant bg-white focus:border-blue-500 focus:ring-blue-500/20 font-medium"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white h-16 text-lg rounded-2xl font-headline font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] hover:opacity-90"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">save</span>
            Save Growth Record
          </div>
        </button>
      </form>
    </div>
  );
}
