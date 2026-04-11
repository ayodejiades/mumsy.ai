import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChildRecord, PredictionResult } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, TrendingUp, Thermometer, Bell, Baby } from "lucide-react";

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
    <div className="space-y-6">
      {latestPrediction && (
        <Alert variant={latestPrediction.riskLevel === 'high' ? 'destructive' : 'default'} 
          className={`border-2 ${latestPrediction.riskLevel === 'high' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
          {latestPrediction.riskLevel === 'high' ? <AlertCircle className="h-5 w-5 text-orange-600" /> : <CheckCircle2 className="h-5 w-5 text-blue-600" />}
          <AlertTitle className={`text-lg font-bold ${latestPrediction.riskLevel === 'high' ? 'text-orange-800' : 'text-blue-800'}`}>
            AI Child Health Insight: {latestPrediction.condition === 'none' ? 'Healthy Growth' : latestPrediction.condition.toUpperCase()} Risk
          </AlertTitle>
          <AlertDescription className="mt-2 space-y-2">
            <p className="text-gray-700 font-medium">{latestPrediction.message}</p>
            {latestPrediction.riskLevel === 'high' && (
              <div className="flex items-center gap-2 text-orange-600 font-bold bg-orange-100 p-2 rounded-md animate-pulse">
                <Bell className="h-4 w-4" />
                <span>Alert: Pediatrician notification recommended.</span>
              </div>
            )}
            <div className={`p-3 rounded-lg ${latestPrediction.riskLevel === 'high' ? 'bg-orange-100/50' : 'bg-blue-100/50'}`}>
              <span className="font-bold">Recommendation: </span>
              {latestPrediction.recommendation}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              Weight Growth (kg)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="#2563EB" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Thermometer size={16} className="text-orange-500" />
              Temperature Trend (°C)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[35, 40]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={3} dot={{ r: 4, fill: '#F97316' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {records.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-blue-100 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500">
            <Baby size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">No records yet for {childName || 'your child'}</h3>
            <p className="text-gray-500">Start tracking growth and health vitals to see AI insights.</p>
          </div>
        </div>
      )}
    </div>
  );
}
