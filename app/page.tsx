"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { VitalsForm } from "@/components/dashboard/VitalsForm";
import { HealthSummary } from "@/components/dashboard/HealthSummary";
import { HealthRecord, ChildRecord, PredictionResult, UserProfile } from "@/types";
import { predictHealthRisk, predictChildHealthRisk } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Users, Plus, History, LayoutDashboard, Baby, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChildForm } from "@/components/dashboard/ChildForm";
import { ChildHealthSummary } from "@/components/dashboard/ChildHealthSummary";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<'mother' | 'child'>('mother');
  const [profile, setProfile] = useState<UserProfile>({
    name: "Aliko Aisha",
    age: 28,
    weeksPregnant: 24,
    hasChild: true,
    childName: "Leo",
    childAgeMonths: 8,
    isCHWMode: true
  });
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [childRecords, setChildRecords] = useState<ChildRecord[]>([]);
  const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);
  const [latestChildPrediction, setLatestChildPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Initialize data on client side to avoid hydration mismatch
    const initialRecords: HealthRecord[] = [
      { id: '1', date: new Date(Date.now() - 86400000 * 3).toISOString(), systolicBP: 118, diastolicBP: 78, hemoglobin: 12.2, weight: 64.5 },
      { id: '2', date: new Date(Date.now() - 86400000 * 2).toISOString(), systolicBP: 122, diastolicBP: 80, hemoglobin: 11.8, weight: 64.8 },
      { id: '3', date: new Date(Date.now() - 86400000 * 1).toISOString(), systolicBP: 125, diastolicBP: 82, hemoglobin: 11.5, weight: 65.1 },
    ];
    const initialChildRecords: ChildRecord[] = [
      { id: 'c1', date: new Date(Date.now() - 86400000 * 10).toISOString(), weight: 7.8, height: 68, temperature: 36.5 },
      { id: 'c2', date: new Date(Date.now() - 86400000 * 5).toISOString(), weight: 8.1, height: 69.5, temperature: 36.7 },
    ];
    
    setRecords(initialRecords);
    setChildRecords(initialChildRecords);
    
    if (initialRecords.length > 0) {
      handlePrediction(initialRecords[initialRecords.length - 1]);
    }
    if (initialChildRecords.length > 0) {
      handleChildPrediction(initialChildRecords[initialChildRecords.length - 1]);
    }
  }, []);

  // Remove aggressive isMounted check to allow initial HTML to render
  // if (!isMounted) return null;

  const handlePrediction = async (record: HealthRecord) => {
    setIsLoading(true);
    const result = await predictHealthRisk(record, { age: profile.age, weeksPregnant: profile.weeksPregnant || 0 });
    setLatestPrediction(result);
    setIsLoading(false);
  };

  const handleChildPrediction = async (record: ChildRecord) => {
    setIsLoading(true);
    const result = await predictChildHealthRisk(record, { ageMonths: profile.childAgeMonths || 0 });
    setLatestChildPrediction(result);
    setIsLoading(false);
  };

  const onSaveRecord = async (newRecord: Omit<HealthRecord, 'id' | 'date'>) => {
    const record: HealthRecord = {
      ...newRecord,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setRecords([...records, record]);
    await handlePrediction(record);
  };

  const onSaveChildRecord = async (newRecord: Omit<ChildRecord, 'id' | 'date'>) => {
    const record: ChildRecord = {
      ...newRecord,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setChildRecords([...childRecords, record]);
    await handleChildPrediction(record);
  };

  const toggleCHWMode = () => {
    setProfile({ ...profile, isCHWMode: !profile.isCHWMode });
  };

  const handleStart = () => {
    console.log("Navigating to dashboard...");
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar onNavigate={setView} />
      
      {view === 'landing' ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile.name}</h1>
              <p className="text-gray-500">
                {activeTab === 'mother' 
                  ? `Week ${profile.weeksPregnant} of your pregnancy journey`
                  : `Tracking growth for ${profile.childName}`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">


              <Button 
                variant={profile.isCHWMode ? "default" : "outline"}
                // onClick={toggleCHWMode}
                className={`rounded-full ${profile.isCHWMode ? (activeTab === 'mother' ? 'bg-pink-600' : 'bg-blue-600') : (activeTab === 'mother' ? 'border-pink-200 text-pink-600' : 'border-blue-200 text-blue-600')}`}
              >
                <Users size={18} className="mr-2" />
                {profile.isCHWMode ? "CHW Mode Active" : "Enable CHW Mode"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white border p-1 h-12 rounded-xl shadow-sm">
              <TabsTrigger value="overview" className={`rounded-lg data-[state=active]:shadow-sm ${activeTab === 'mother' ? 'data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600' : 'data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600'}`}>
                <LayoutDashboard size={16} className="mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="records" className={`rounded-lg data-[state=active]:shadow-sm ${activeTab === 'mother' ? 'data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600' : 'data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600'}`}>
                <Plus size={16} className="mr-2" />
                New Record
              </TabsTrigger>
              <TabsTrigger value="history" className={`rounded-lg data-[state=active]:shadow-sm ${activeTab === 'mother' ? 'data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600' : 'data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600'}`}>
                <History size={16} className="mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="overview">
                <motion.div 
                  key={`${activeTab}-overview`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <HealthSummary records={records} latestPrediction={latestPrediction} />
                  {/* {activeTab === 'mother' ? (
                    <HealthSummary records={records} latestPrediction={latestPrediction} />
                  ) : (
                    <ChildHealthSummary records={childRecords} latestPrediction={latestChildPrediction} childName={profile.childName} />
                  )} */}
                </motion.div>
              </TabsContent>

              <TabsContent value="records">
                <motion.div 
                  key={`${activeTab}-records`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <VitalsForm onSave={onSaveRecord} isCHWMode={profile.isCHWMode} />
                  {/* {activeTab === 'mother' ? (
                    <VitalsForm onSave={onSaveRecord} isCHWMode={profile.isCHWMode} />
                  ) : (
                    <ChildForm onSave={onSaveChildRecord} isCHWMode={profile.isCHWMode} childName={profile.childName} />
                  )} */}
                </motion.div>
              </TabsContent>

              <TabsContent value="history">
                <motion.div 
                  key={`${activeTab}-history`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {activeTab === 'mother' ? (
                    records.slice().reverse().map((record) => (
                      <div key={record.id} className="bg-white p-4 rounded-xl border border-pink-50 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">BP: {record.systolicBP}/{record.diastolicBP} | Hb: {record.hemoglobin} | Wt: {record.weight}kg</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2 py-1 rounded-full">Verified</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    childRecords.slice().reverse().map((record) => (
                      <div key={record.id} className="bg-white p-4 rounded-xl border border-blue-50 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Wt: {record.weight}kg | Ht: {record.height}cm | Temp: {record.temperature || 'N/A'}°C</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Growth Log</span>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </main>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto ${activeTab === 'mother' ? 'border-pink-200 border-t-pink-600' : 'border-blue-200 border-t-blue-600'}`}></div>
            <p className={`font-bold animate-pulse ${activeTab === 'mother' ? 'text-pink-600' : 'text-blue-600'}`}>AI is analyzing vitals...</p>
          </div>
        </div>
      )}
    </div>
  );
}
