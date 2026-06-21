"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Bell, User, LogOut, Settings, Award } from "lucide-react";

export function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-xl dark:bg-slate-950/60 supports-[backdrop-filter]:bg-white/60">
      <div className="flex w-full h-16 items-center px-6 md:px-12 relative">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="hidden text-xl font-bold tracking-tight md:inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-800 dark:from-emerald-400 dark:to-teal-200">
            EcoPulse
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 relative">
            
            {/* Notification Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800 animate-in fade-in slide-in-from-top-2">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Let&apos;s make an impact</div>
                        <p className="text-xs text-slate-500">You earned the Eco Warrior badge.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600">
                        <Leaf className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Log your commute</p>
                        <p className="text-xs text-slate-500">Don&apos;t forget to track your transport today to keep your streak.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <div className="relative">
              <div 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-emerald-500/20 bg-slate-100 p-1 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
              </div>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Eco Adventurer</p>
                    <p className="text-xs text-slate-500">user@example.com</p>
                  </div>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>

          </nav>
        </div>
      </div>
    </header>
  );
}
