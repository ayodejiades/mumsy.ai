import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { HealthRecord, PredictionResult } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info, TrendingUp, Droplets, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-6">
      {latestPrediction && (
        <Alert variant={latestPrediction.riskLevel === 'high' ? 'destructive' : 'default'} 
          className={`border-2 ${latestPrediction.riskLevel === 'high' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          {latestPrediction.riskLevel === 'high' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5 text-green-600" />}
          <AlertTitle className={`text-lg font-bold ${latestPrediction.riskLevel === 'high' ? 'text-red-800' : 'text-green-800'}`}>
            AI Health Insight: {latestPrediction.condition === 'none' ? 'All Clear' : latestPrediction.condition.toUpperCase()} Risk
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <p className="text-gray-700 font-medium">{latestPrediction.message}</p>
            {latestPrediction.riskLevel === 'high' && (
              <div className="flex items-center gap-2 text-red-600 font-bold bg-red-100 p-2 rounded-md animate-pulse">
                <Bell className="h-4 w-4" />
                <span>Emergency Alert: Health professional in charge has been notified.</span>
              </div>
            )}
            <div className={`p-3 rounded-lg ${latestPrediction.riskLevel === 'high' ? 'bg-red-100/50' : 'bg-green-100/50'}`}>
              <span className="font-bold">Recommendation: </span>
              {latestPrediction.recommendation}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-pink-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <TrendingUp size={16} />
              Blood Pressure Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DB2777" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#DB2777" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="bp" stroke="#DB2777" fillOpacity={1} fill="url(#colorBp)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-pink-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Droplets size={16} className="text-red-500" />
              Hemoglobin Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[8, 16]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line type="monotone" dataKey="hb" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#EF4444' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
