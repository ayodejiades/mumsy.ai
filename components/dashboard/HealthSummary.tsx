import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { HealthRecord, PredictionResult } from "@/types";
import { AlertCircle, CheckCircle2, TrendingUp, Droplets, Bell, Activity } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

interface HealthSummaryProps {
  records: HealthRecord[];
  latestPrediction: PredictionResult | null;
}

export function HealthSummary({ records, latestPrediction }: HealthSummaryProps) {
  const chartData = records.slice(-7).map(r => ({
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    bp: r.systolicBP,
    hb: r.hemoglobin,
  }));

  return (
    <div className="space-y-8">
      {latestPrediction && (
        <div 
          className={`p-6 rounded-[2rem] border-2 flex gap-4 items-start ${
            latestPrediction.riskLevel === 'high' 
              ? 'bg-red-50 border-red-200 text-red-900 shadow-lg shadow-red-500/10' 
              : 'bg-primary-fixed border-primary/10 text-on-primary-fixed'
          }`}
        >
          <div className={`p-3 rounded-2xl ${latestPrediction.riskLevel === 'high' ? 'bg-red-100' : 'bg-white/50'}`}>
            {latestPrediction.riskLevel === 'high' ? <AlertCircle className="h-6 w-6 text-red-600" /> : <Activity className="h-6 w-6 text-primary" />}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-headline font-extrabold mb-1">
              AI Health Insight: {latestPrediction.condition === 'none' ? 'Perfect Status' : latestPrediction.condition.toUpperCase()}
            </h3>
            <p className="font-medium opacity-90 leading-relaxed mb-4">{latestPrediction.message}</p>
            {latestPrediction.riskLevel === 'high' && (
              <div className="flex items-center gap-2 font-bold bg-red-100/50 p-3 rounded-xl animate-pulse mb-4 text-red-700">
                <Bell className="h-4 w-4" />
                <span>Emergency: Medical team has been alerted.</span>
              </div>
            )}
            <div className={`p-4 rounded-xl font-bold ${latestPrediction.riskLevel === 'high' ? 'bg-red-100' : 'bg-white/40'}`}>
              <span className="opacity-70 text-sm block mb-1">Recommended Action</span>
              {latestPrediction.recommendation}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h4 className="font-headline font-bold text-on-surface">Blood Pressure</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">7 Day Trend</span>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DB2777" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#DB2777" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Area type="monotone" dataKey="bp" stroke="#DB2777" fillOpacity={1} fill="url(#colorBp)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">water_drop</span>
              <h4 className="font-headline font-bold text-on-surface">Hemoglobin</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Stable</span>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} domain={[8, 16]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Line type="monotone" dataKey="hb" stroke="#DB2777" strokeWidth={4} dot={{ r: 5, fill: '#DB2777', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
