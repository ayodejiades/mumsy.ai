"use client";

import { useState, useEffect } from "react";
import { HealthRecord, ChildRecord, PredictionResult, UserProfile } from "@/types";
import { predictHealthRisk, predictChildHealthRisk } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Users, Plus, History, LayoutDashboard, Bell, Activity, Heart, Baby } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HealthSummary } from "@/components/dashboard/HealthSummary";
import { VitalsForm } from "@/components/dashboard/VitalsForm";
import { ChildForm } from "@/components/dashboard/ChildForm";
import { ChildHealthSummary } from "@/components/dashboard/ChildHealthSummary";
import { BentoCard } from "@/components/ui/BentoCard";

export default function Dashboard() {
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
    // Initialize data on client side
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
    
    if (initialRecords.length > 0) handlePrediction(initialRecords[initialRecords.length - 1]);
    if (initialChildRecords.length > 0) handleChildPrediction(initialChildRecords[initialChildRecords.length - 1]);
  }, []);

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

  return (
    <div className="pt-24 pb-12 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-headline font-bold text-xs tracking-wider uppercase mb-4">
              <Activity size={12} className="animate-pulse" />
              Live Health Tracking
            </div>
            <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-on-surface tracking-tight">
              Hello, <span className="text-primary italic">{profile.name.split(' ')[1]}</span>
            </h1>
            <p className="text-on-surface-variant text-lg mt-2 max-w-xl">
              {activeTab === 'mother' 
                ? `You're in Week ${profile.weeksPregnant} of your pregnancy sanctuary.`
                : `Monitoring growth patterns for ${profile.childName}.`}
            </p>
          </div>

          <div className="flex bg-surface-container-high p-1.5 rounded-2xl shadow-inner gap-1">
            <button 
              onClick={() => setActiveTab('mother')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-headline font-bold transition-all ${activeTab === 'mother' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Heart size={18} /> Mother
            </button>
            <button 
              onClick={() => setActiveTab('child')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-headline font-bold transition-all ${activeTab === 'child' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Baby size={18} /> Child
            </button>
          </div>
        </header>

        {/* Unified Bento Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Insights Column */}
          <div className="lg:col-span-8 space-y-6">
            <BentoCard className="bg-gradient-to-br from-white to-primary-fixed/30 border-primary/5">
              {activeTab === 'mother' ? (
                <HealthSummary records={records} latestPrediction={latestPrediction} />
              ) : (
                <ChildHealthSummary records={childRecords} latestPrediction={latestChildPrediction} childName={profile.childName} />
              )}
            </BentoCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BentoCard>
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-headline font-bold text-on-surface">Recent Logs</h3>
                    <button className="text-sm font-bold text-primary group flex items-center gap-1">
                      View All <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                 </div>
                 <div className="space-y-4">
                    {(activeTab === 'mother' ? records : childRecords).slice().reverse().slice(0, 3).map((record) => (
                      <div key={record.id} className="p-4 rounded-2xl bg-white/50 border border-white/20 flex items-center justify-between hover:bg-white transition-colors">
                        <div>
                          <p className="font-bold text-on-surface">{new Date(record.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                          <p className="text-xs text-on-surface-variant">
                            {activeTab === 'mother' 
                              ? `BP: ${(record as HealthRecord).systolicBP}/${(record as HealthRecord).diastolicBP} | Hb: ${(record as HealthRecord).hemoglobin}`
                              : `Wt: ${(record as ChildRecord).weight}kg | Ht: ${(record as ChildRecord).height}cm`}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-primary text-xl">description</span>
                      </div>
                    ))}
                 </div>
              </BentoCard>

              <BentoCard className="bg-primary text-on-primary">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <Users className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-headline font-bold mb-2">CHW Contact</h3>
                    <p className="text-white/80 text-sm">Your specialist is online. Get culture-first care advice instantly.</p>
                  </div>
                  <button className="mt-6 bg-white text-primary px-6 py-3 rounded-xl font-headline font-bold hover:bg-primary-fixed transition-colors active:scale-95">
                    Start Chat
                  </button>
                </div>
              </BentoCard>
            </div>
          </div>

          {/* Side Action Column */}
          <div className="lg:col-span-4 space-y-6">
            <BentoCard className="bg-surface-container-lowest border-outline-variant/10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-headline font-bold text-on-surface">
                  {activeTab === 'mother' ? 'New Vitals' : 'Growth Log'}
                </h3>
                <span className="material-symbols-outlined text-on-surface-variant">add_circle</span>
              </div>
              {activeTab === 'mother' ? (
                <VitalsForm onSave={onSaveRecord} isCHWMode={profile.isCHWMode} />
              ) : (
                <ChildForm onSave={onSaveChildRecord} isCHWMode={profile.isCHWMode} childName={profile.childName} />
              )}
            </BentoCard>

            <BentoCard className="bg-tertiary-container/20 border-tertiary/10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnuRKNAkDfSUsgflpzQB1SyUHoU0Der4Vy8t-J9hZGhJRlY011I946BXss4_tdZAkW51LfQqos2OA6_svI4vU0hqHTiziS8iNp5Y_xr_ohekQR1PY_lDY-iF9E6oqQgPlS6xML8WySp9YFbdDkwS3DF5r9uYyfDP5hyXxw7RZvAGuiDMBYMHf0t_MqyBVUIQo_G_TPIKSO4W5w-sxBIkHSKP7ftNk5klkH3Btsz_BKhuzyZ7dsRc7QLFHQgRjPJO0Cpwey4p2OLG69" alt="CHW" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Your Specialist</p>
                    <p className="font-bold text-on-surface">Dr. Zainab B.</p>
                  </div>
               </div>
               <p className="text-sm text-on-surface-variant leading-relaxed">"Based on your latest vitals, remember to stay hydrated and take small walks. You're doing great!"</p>
            </BentoCard>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="font-headline font-bold text-primary animate-pulse tracking-tight">AI Sanctuary is analyzing...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Add simple Link shim if missing (Wait, Link is from next/link)
import Link from "next/link";
