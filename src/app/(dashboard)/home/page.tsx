"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Leaf, TrendingDown, Car, Zap, Utensils, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CarbonBreakdown } from "@/lib/emissions";

export default function DashboardHome() {
  const [results, setResults] = useState<CarbonBreakdown | null>(null);

  useEffect(() => {
    // Load local ecoResults
    const saved = localStorage.getItem("ecoResults");
    if (saved) {
      // eslint-disable-next-line
      setResults(JSON.parse(saved));
    } else {
      // Dummy data fallback
      setResults({
        score: 65,
        totalMonthly: 280,
        transport: 120,
        energy: 80,
        food: 50,
        shopping: 30,
      });
    }
  }, []);

  // Dummy trend data for Recharts
  const trendData = [
    { name: 'Jan', co2: 400 },
    { name: 'Feb', co2: 380 },
    { name: 'Mar', co2: 350 },
    { name: 'Apr', co2: 320 },
    { name: 'May', co2: 290 },
    { name: 'Jun', co2: results?.totalMonthly || 280 },
  ];

  if (!results) return null;

  // Gauge Chart Data (0-100 scale)
  const gaugeData = [
    { name: "Score", value: results.score },
    { name: "Remaining", value: 100 - results.score },
  ];
  
  // Dynamic color based on score
  const scoreColor = results.score >= 80 ? "#10b981" : results.score >= 50 ? "#f59e0b" : "#ef4444";
  const gaugeColors = [scoreColor, "#f1f5f9"]; // Dynamic and Slate-100
  
  let scoreText = "Average Impact";
  if (results.score >= 80) scoreText = "Excellent Eco-Warrior";
  else if (results.score >= 60) scoreText = "Good, Keep it up!";
  else if (results.score < 40) scoreText = "Needs Improvement";

  const categories = [
    { name: 'Transport', val: results.transport, color: 'bg-emerald-500', icon: Car },
    { name: 'Home Energy', val: results.energy, color: 'bg-amber-400', icon: Zap },
    { name: 'Diet & Food', val: results.food, color: 'bg-rose-400', icon: Utensils },
    { name: 'Shopping', val: results.shopping, color: 'bg-indigo-400', icon: ShoppingBag },
  ];

  const topSource = [...categories].sort((a, b) => b.val - a.val)[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Impact Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Track and analyze your monthly carbon footprint.</p>
        </div>
        <Link 
          href="/onboarding"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 transition-colors"
        >
          <Leaf className="h-4 w-4" /> Recalculate Footprint
        </Link>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Carbon Score Gauge */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800 min-h-[260px]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Sustainability Score</h3>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
          
          <div className="relative h-32 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={gaugeColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{results.score}</span>
            </div>
          </div>
          <div className="text-center mt-2 flex flex-col items-center">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 mb-3">
              {scoreText}
            </span>
            <div className="flex gap-1.5 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              <span className="text-red-500 dark:text-red-400">0-39 Poor</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-amber-500 dark:text-amber-400">40-59 Avg</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-emerald-400">60-79 Good</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-emerald-600 dark:text-emerald-300">80+ Best</span>
            </div>
          </div>
        </div>

        {/* Total Emissions */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800 min-h-[260px]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Monthly CO₂</h3>
            <Leaf className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">{results.totalMonthly}</span>
              <span className="text-lg font-semibold text-slate-500">kg</span>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md dark:bg-emerald-900/30">
              <TrendingDown className="h-4 w-4" />
              12% vs last month
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Equivalent to driving {(results.totalMonthly * 4).toFixed(0)} km.</p>
        </div>

        {/* Top Emission Source */}
        <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl dark:from-emerald-950 dark:to-emerald-900 min-h-[260px]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-300">Top Emission Source</h3>
            <topSource.icon className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold capitalize">{topSource.name}</span>
            </div>
            <div className="mt-4 text-sm text-slate-300 leading-relaxed">
              Accounts for <span className="text-emerald-400 font-bold text-lg">{Math.round((topSource.val / results.totalMonthly) * 100)}%</span> of your footprint.
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Focus on reducing this category first.</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trend Chart */}
        <div className="col-span-1 lg:col-span-2 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Emission Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3'}}
                />
                <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown */}
        <div className="col-span-1 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800">
          <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Category Breakdown</h3>
          <div className="space-y-6">
            {categories.map(cat => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-2 items-center">
                  <div className="flex items-center gap-2">
                    <cat.icon className="h-4 w-4 text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">{cat.val} kg</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${(cat.val / results.totalMonthly) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
