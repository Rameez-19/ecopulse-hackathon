"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, Target, Users, Map } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", href: "/home", icon: LayoutDashboard },
    { name: "Coach", href: "/coach", icon: Sparkles },
    { name: "Simulator", href: "/simulator", icon: Map },
    { name: "Challenges", href: "/challenges", icon: Target },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-slate-200 bg-white/80 backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-950/80"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            aria-label={item.name}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${
              isActive 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
            }`}
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
