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
    // Reset form
    setWeight("");
    setHeight("");
    setHeadCircumference("");
    setTemperature("");
    setNotes("");
  };

  return (
    <Card className="shadow-xl border-blue-100 overflow-hidden">
      <CardHeader className="bg-blue-50/50">
        <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
          <Baby className="text-blue-500" />
          {isCHWMode ? `Record Data for ${childName || 'Child'}` : `Enter ${childName || 'Child'}'s Vitals`}
        </CardTitle>
        <CardDescription>
          {isCHWMode 
            ? "Enter the child's growth measurements." 
            : "Track your child's growth and health."}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Scale size={16} className="text-blue-500" />
                Weight (kg)
              </Label>
              <Input 
                id="weight"
                placeholder="e.g. 8.5" 
                type="number" 
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg h-12 border-blue-100 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Ruler size={16} className="text-green-500" />
                Height (cm)
              </Label>
              <Input 
                id="height"
                placeholder="e.g. 72" 
                type="number" 
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg h-12 border-blue-100 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temp" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
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
                className="text-lg h-12 border-blue-100 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="head" className="text-sm font-semibold text-gray-700">Head Circumference (cm)</Label>
              <Input 
                id="head"
                placeholder="e.g. 44" 
                type="number" 
                step="0.1"
                value={headCircumference}
                onChange={(e) => setHeadCircumference(e.target.value)}
                className="text-lg h-12 border-blue-100 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Notes</Label>
            <Input 
              id="notes"
              placeholder="Any observations..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-lg h-12 border-blue-100 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Save className="mr-2" />
            Save Child Records
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
