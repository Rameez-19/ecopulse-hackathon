"use client";

import { useState } from "react";
import { Target, Trophy, Flame, CheckCircle2, Clock, Medal } from "lucide-react";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<"challenges" | "badges">("challenges");

  const challenges = [
    { id: 1, title: "Public Transport Pioneer", desc: "Use public transport for 3 days this week.", points: 150, status: "active", progress: 33 },
    { id: 2, title: "Plant-Powered Weekend", desc: "Eat exclusively plant-based meals Saturday and Sunday.", points: 200, status: "active", progress: 0 },
    { id: 3, title: "Energy Saver", desc: "Reduce electricity usage by 10% this month.", points: 300, status: "completed", progress: 100 },
    { id: 4, title: "Zero Plastic Week", desc: "Avoid single-use plastics for 7 consecutive days.", points: 250, status: "active", progress: 60 },
  ];

  const badges = [
    { id: 1, name: "First Step", desc: "Completed onboarding.", icon: "🌱", earned: true },
    { id: 2, name: "Eco Warrior", desc: "Saved 100kg of CO2.", icon: "⚔️", earned: true },
    { id: 3, name: "Tree Hugger", desc: "Planted equivalent of 5 trees.", icon: "🌳", earned: false },
    { id: 4, name: "Streak Master", desc: "Maintained a 7-day activity streak.", icon: "🔥", earned: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Target className="h-8 w-8 text-rose-500" />
            Challenges & Rewards
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Build sustainable habits, earn points, and unlock achievements.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 px-3">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-slate-700 dark:text-slate-300">5 Day Streak</span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2 px-3">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="font-bold text-slate-700 dark:text-slate-300">450 pts</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab("challenges")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "challenges" 
              ? "border-rose-500 text-rose-600 dark:text-rose-400" 
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Active Challenges
        </button>
        <button
          onClick={() => setActiveTab("badges")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "badges" 
              ? "border-rose-500 text-rose-600 dark:text-rose-400" 
              : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          My Badges
        </button>
      </div>

      {activeTab === "challenges" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c) => (
            <div key={c.id} className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl ${c.status === 'completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                  {c.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                </div>
                <div className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full text-sm">
                  <Trophy className="h-4 w-4" /> {c.points}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{c.desc}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Progress</span>
                  <span>{c.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div 
                    className={`h-full transition-all duration-500 ${c.status === 'completed' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${c.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "badges" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div key={b.id} className={`flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all ${
              b.earned 
                ? 'border-amber-200 bg-gradient-to-b from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-900 dark:border-amber-500/30 shadow-lg shadow-amber-500/10' 
                : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 opacity-60 grayscale'
            }`}>
              <div className="text-5xl mb-4 drop-shadow-md">{b.icon}</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{b.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{b.desc}</p>
              {b.earned && (
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 px-2 py-1 rounded-full">
                  <Medal className="h-3 w-3" /> Unlocked
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
