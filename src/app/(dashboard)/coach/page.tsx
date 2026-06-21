"use client";

import { useState, useEffect, useCallback } from "react";
import { BrainCircuit, Sparkles, Loader2 } from "lucide-react";
import { OnboardingData } from "@/lib/emissions";

export default function AICoachPage() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  const getHouseType = (kwh: number) => {
    if (kwh <= 300) return "Small Apartment";
    if (kwh <= 600) return "Medium House";
    return "Large House";
  };

  useEffect(() => {
    // Load local ecoData
    const data = localStorage.getItem("ecoData");
    if (data) {
      setTimeout(() => setUserData(JSON.parse(data)), 0);
    } else {
      setTimeout(() => setUserData({
        transportMode: "car",
        fuelType: "petrol",
        dailyCommuteKm: 25,
        travelDaysPerWeek: 5,
        dietType: "meat_heavy",
        electricityKwh: 450,
        householdSize: 2,
        onlinePurchases: 5,
      }), 0);
    }
  }, []);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData }),
      });
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error fetching coach:", error);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  return (
    <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-emerald-500" />
            AI Sustainability Coach
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Get personalized, intelligent recommendations based on your unique footprint.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Current Profile Summary */}
        <div className="col-span-1 space-y-6 h-fit">
          <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-8">Your Life, Your Impact</h3>
            
            {userData && (
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-2xl">
                    🚗
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">The Daily Journey</p>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      You rely on your <strong className="text-blue-600 dark:text-blue-400 capitalize">{userData.fuelType !== 'none' && userData.fuelType !== undefined ? `${userData.fuelType} ` : ''}{userData.transportMode.replace('_', ' ')}</strong> to travel <strong>{userData.dailyCommuteKm}km</strong>, <strong>{userData.travelDaysPerWeek || 5} days</strong> a week.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-2xl">
                    🥗
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Fueling Your Body</p>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      Your <strong className="text-rose-600 dark:text-rose-400 capitalize">{userData.dietType.replace('_', ' ')}</strong> diet fuels you. What we put on our plate deeply connects us to Earth&apos;s resources.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-2xl">
                    ⚡
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Powering Your Sanctuary</p>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      Sharing a <strong className="text-amber-600 dark:text-amber-400">{getHouseType(userData.electricityKwh)}</strong> with <strong>{userData.householdSize || 1} people</strong>. Your personal share is ~<strong>{Math.round(userData.electricityKwh / (userData.householdSize || 1))} kWh</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              onClick={fetchRecommendations}
              disabled={loading}
              className="mt-10 w-full flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Sparkles className="h-6 w-6" />}
              {recommendations ? "Refresh Insights" : "Discover Your Potential"}
            </button>
          </div>
        </div>

        {/* AI Recommendations Window */}
        <div className="col-span-1 lg:col-span-2 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-1 dark:from-emerald-950/40 dark:to-slate-900 shadow-xl min-h-[500px]">
          <div className="h-full w-full rounded-[28px] bg-slate-900 p-6 sm:p-10 flex flex-col">
            {!recommendations && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 animate-in zoom-in-95 duration-500">
                <div className="p-6 bg-slate-800 rounded-full mb-6">
                  <BrainCircuit className="h-16 w-16 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Ready to transform your impact?</h2>
                <p className="max-w-md mx-auto text-slate-400 leading-relaxed">
                  Our AI is standing by to analyze your daily habits and provide an actionable, personalized roadmap to a greener future.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-emerald-400 space-y-6">
                <Loader2 className="h-16 w-16 animate-spin" />
                <p className="animate-pulse text-lg font-medium tracking-wide">Gemini is analyzing your life choices...</p>
              </div>
            )}

            {recommendations && !loading && (
              <div className="prose prose-invert prose-emerald max-w-none animate-in fade-in duration-700">
                {/* Advanced markdown parsing for bold text and list items */}
                {recommendations.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-extrabold mt-6 mb-6 text-white">{line.replace('## ', '')}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-emerald-400">{line.replace('### ', '')}</h3>;
                  
                  // Handle bullet points with bold text support
                  if (line.startsWith('* ') || line.startsWith('- ')) {
                    const text = line.substring(2);
                    return (
                      <li key={i} className="ml-6 mb-3 text-slate-300 leading-relaxed text-lg list-disc" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />
                    );
                  }
                  
                  if (line.trim() === '') return <br key={i} />;
                  
                  // Paragraphs with bold text support
                  return <p key={i} className="mb-5 text-slate-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />;
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
