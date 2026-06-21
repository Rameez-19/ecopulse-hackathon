"use client";

import { Users, Globe2, Leaf, Heart, MessageSquare, Award } from "lucide-react";

export default function CommunityPage() {
  const feedItems = [
    {
      id: 1,
      user: "Sarah Jenkins",
      avatar: "SJ",
      action: "Completed the 'Zero Plastic Week' challenge!",
      co2Saved: "12 kg",
      time: "2 hours ago",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      user: "David Chen",
      avatar: "DC",
      action: "Switched to 100% renewable energy for their home.",
      co2Saved: "150 kg",
      time: "5 hours ago",
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      user: "Elena Rodriguez",
      avatar: "ER",
      action: "Logged 50km of bicycle commuting this week.",
      co2Saved: "8 kg",
      time: "1 day ago",
      likes: 45,
      comments: 2,
    },
    {
      id: 4,
      user: "Marcus Johnson",
      avatar: "MJ",
      action: "Earned the 'Plant-Powered' badge.",
      co2Saved: "15 kg",
      time: "1 day ago",
      likes: 112,
      comments: 18,
    }
  ];

  const leaderboard = [
    { rank: 1, name: "EcoQueen99", points: 15400 },
    { rank: 2, name: "GreenGiant", points: 14250 },
    { rank: 3, name: "SustainableSam", points: 13800 },
    { rank: 4, name: "PlanetSaver", points: 12100 },
    { rank: 5, name: "You (Seedling)", points: 450 },
  ];

  return (
    <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Globe2 className="h-8 w-8 text-indigo-500" aria-hidden="true" />
            Global Impact Community
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            See how the community is making a difference together.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
          <Users className="h-4 w-4" /> 24,502 Active Eco Warriors
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Feed */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
          
          {feedItems.map((item) => (
            <div key={item.id} className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800 transition-all hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:ring-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-bold text-lg shadow-inner">
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{item.user}</h4>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                      <Leaf className="h-3 w-3" /> Saved {item.co2Saved} CO₂
                    </div>
                  </div>
                  <p className="mt-3 text-slate-700 dark:text-slate-300">
                    {item.action}
                  </p>
                  <div className="mt-4 flex gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <button aria-label={`Like post by ${item.user}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-500 transition-colors">
                      <Heart className="h-4 w-4" /> {item.likes}
                    </button>
                    <button aria-label={`Comment on post by ${item.user}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-500 transition-colors">
                      <MessageSquare className="h-4 w-4" /> {item.comments}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full py-4 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            Load More Activity
          </button>
        </div>

        {/* Leaderboard Sidebar */}
        <div className="col-span-1">
          <div className="rounded-3xl bg-gradient-to-b from-indigo-50 to-white p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 dark:from-indigo-950/20 dark:to-slate-900 dark:shadow-none dark:ring-slate-800 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Global Top 5</h3>
            </div>
            
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    user.rank === 5 
                      ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                      : 'bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                      user.rank === 1 ? 'bg-amber-100 text-amber-600' :
                      user.rank === 2 ? 'bg-slate-200 text-slate-600' :
                      user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      user.rank === 5 ? 'bg-indigo-500 text-white' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      #{user.rank}
                    </div>
                    <span className={`font-semibold ${user.rank === 5 ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                      {user.name}
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${user.rank === 5 ? 'text-indigo-200' : 'text-indigo-600 dark:text-indigo-400'}`}>
                    {user.points} pt
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-indigo-100 dark:border-indigo-800/50 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Complete more challenges to climb the ranks!
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
