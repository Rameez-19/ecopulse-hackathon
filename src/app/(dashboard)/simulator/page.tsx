"use client";

import { useState, useEffect } from "react";
import { Map, Loader2, ArrowRight, Lightbulb } from "lucide-react";

export default function SimulatorPage() {
  const [simulation, setSimulation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCo2, setCurrentCo2] = useState<number>(3360); // Default annual (280 * 12)
  const [scenarioInput, setScenarioInput] = useState("");

  useEffect(() => {
    // Load local ecoData
    const results = localStorage.getItem("ecoResults");
    if (results) {
      const parsed = JSON.parse(results);
      if (parsed.totalMonthly) {
        // eslint-disable-next-line
        setCurrentCo2(parsed.totalMonthly * 12); // Convert to annual
      }
    }
  }, []);

  const runSimulation = async (scenarioToRun: string) => {
    if (!scenarioToRun.trim()) return;
    
    setLoading(true);
    setScenarioInput(scenarioToRun); // Update input field if clicked from presets

    try {
      const res = await fetch("/api/ai/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentCo2, scenario: scenarioToRun }),
      });
      const data = await res.json();
      setSimulation(data.simulation);
    } catch (error) {
      console.error("Error running simulation:", error);
    } finally {
      setLoading(false);
    }
  };

  const predefinedScenarios = [
    "What if I switch to a 100% plant-based diet?",
    "What if I commute by bicycle 3 days a week instead of driving?",
    "What if I install solar panels for all my home electricity?",
    "What if I completely stop buying fast fashion?",
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Map className="h-8 w-8 text-teal-500" />
            Eco Future Simulator
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Ask &quot;What if?&quot; and let AI predict how lifestyle changes impact your carbon footprint.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input & Presets */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Custom Scenario</h3>
            <textarea
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder="E.g., What if I stop eating beef and only eat chicken?"
              className="w-full h-32 rounded-xl border border-slate-200 p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white resize-none"
            />
            <button 
              onClick={() => runSimulation(scenarioInput)}
              disabled={loading || !scenarioInput.trim()}
              className="mt-4 w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              Run Simulation
            </button>
          </div>

          <div className="rounded-3xl bg-teal-50 dark:bg-teal-950/20 p-6 border border-teal-100 dark:border-teal-900/50">
            <h3 className="text-sm font-bold text-teal-800 dark:text-teal-400 mb-4 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Try these scenarios
            </h3>
            <div className="space-y-3">
              {predefinedScenarios.map((scenario, i) => (
                <button
                  key={i}
                  onClick={() => runSimulation(scenario)}
                  className="w-full text-left text-sm p-3 rounded-lg bg-white/60 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                >
                  {scenario}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Simulation Output */}
        <div className="col-span-1 lg:col-span-2 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            Simulation Results
          </h3>
          
          <div className="flex-1 flex flex-col relative">
            {!simulation && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400">
                <Map className="h-16 w-16 text-slate-200 dark:text-slate-800 mb-4" />
                <p>Run a scenario to see how it shapes your future.</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-teal-500 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin" />
                <p className="animate-pulse">Simulating alternate reality...</p>
              </div>
            )}

            {simulation && !loading && (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {/* Advanced markdown parsing for bold text and list items */}
                {simulation.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-extrabold mt-6 mb-6 text-slate-900 dark:text-white">{line.replace('## ', '')}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-teal-600 dark:text-teal-400">{line.replace('### ', '')}</h3>;
                  
                  // Handle bullet points with bold text support
                  if (line.startsWith('* ') || line.startsWith('- ')) {
                    const text = line.substring(2);
                    return (
                      <li key={i} className="ml-6 mb-3 text-slate-700 dark:text-slate-300 leading-relaxed text-base list-disc" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>') }} />
                    );
                  }
                  
                  if (line.trim() === '' || line.startsWith('---')) return <br key={i} />;
                  
                  // Paragraphs with bold text support
                  return <p key={i} className="mb-5 text-slate-700 dark:text-slate-300 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>') }} />;
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
