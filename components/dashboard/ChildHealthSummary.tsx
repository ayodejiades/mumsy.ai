import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { ChildRecord, PredictionResult } from "@/types";
import { AlertCircle, CheckCircle2, TrendingUp, Thermometer, Bell, Baby, Activity } from "lucide-react";

interface ChildHealthSummaryProps {
  records: ChildRecord[];
  latestPrediction: PredictionResult | null;
  childName?: string;
}

export function ChildHealthSummary({ records, latestPrediction, childName }: ChildHealthSummaryProps) {
  const chartData = records.slice(-7).map(r => ({
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: r.weight,
    temp: r.temperature || 36.6,
  }));

  return (
    <div className="space-y-8">
      {latestPrediction && (
        <div 
          className={`p-6 rounded-[2rem] border-2 flex gap-4 items-start ${
            latestPrediction.riskLevel === 'high' 
              ? 'bg-orange-50 border-orange-200 text-orange-900 shadow-lg shadow-orange-500/10' 
              : 'bg-blue-50 border-blue-100 text-blue-900'
          }`}
        >
          <div className={`p-3 rounded-2xl ${latestPrediction.riskLevel === 'high' ? 'bg-orange-100' : 'bg-white/50'}`}>
            {latestPrediction.riskLevel === 'high' ? <AlertCircle className="h-6 w-6 text-orange-600" /> : <Activity className="h-6 w-6 text-blue-600" />}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-headline font-extrabold mb-1">
              AI Child Insight: {latestPrediction.condition === 'none' ? 'Healthy Growth' : latestPrediction.condition.toUpperCase()}
            </h3>
            <p className="font-medium opacity-90 leading-relaxed mb-4">{latestPrediction.message}</p>
            {latestPrediction.riskLevel === 'high' && (
              <div className="flex items-center gap-2 font-bold bg-orange-100/50 p-3 rounded-xl animate-pulse mb-4 text-orange-700">
                <Bell className="h-4 w-4" />
                <span>Pediatrician notification recommended.</span>
              </div>
            )}
            <div className={`p-4 rounded-xl font-bold ${latestPrediction.riskLevel === 'high' ? 'bg-orange-100' : 'bg-white/40'}`}>
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
              <TrendingUp size={18} className="text-blue-500" />
              <h4 className="font-headline font-bold text-on-surface">Weight Growth (kg)</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Normal Range</span>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#3B82F6" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Thermometer size={18} className="text-orange-500" />
              <h4 className="font-headline font-bold text-on-surface">Temperature Trend</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Post-Vaccine</span>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#6b7280'}} domain={[35, 40]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontFamily: 'Plus Jakarta Sans' }}
                />
                <Line type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={4} dot={{ r: 5, fill: '#F97316', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {records.length === 0 && (
        <div className="bg-white/50 backdrop-blur-sm p-12 rounded-[2rem] border-2 border-dashed border-outline-variant/20 text-center space-y-4">
          <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto text-primary">
            <Baby size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-bold text-on-surface">No records for {childName || 'your child'}</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto">Start tracking growth and health vitals to see AI insights in your sanctuary.</p>
          </div>
        </div>
      )}
    </div>
  );
}
