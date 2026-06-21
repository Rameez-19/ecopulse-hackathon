import Link from "next/link";
import { LayoutDashboard, Sparkles, Target, Users, Map } from "lucide-react";

export function Sidebar() {
  const navItems = [
    { name: "Dashboard", href: "/home", icon: LayoutDashboard },
    { name: "AI Coach", href: "/coach", icon: Sparkles },
    { name: "Eco Simulator", href: "/simulator", icon: Map },
    { name: "Challenges", href: "/challenges", icon: Target },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white/50 backdrop-blur-xl transition-transform md:block dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-6">
        <div className="mb-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Main Menu
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white shadow-lg shadow-emerald-500/20">
            <div className="mb-2 flex items-center gap-2 font-bold">
              <Sparkles className="h-5 w-5 text-emerald-200" />
              <span>Eco Status</span>
            </div>
            <div className="text-sm text-emerald-50">
              Level: <span className="font-semibold text-white">Seedling</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-emerald-950/30">
              <div className="h-full w-[45%] rounded-full bg-emerald-300" />
            </div>
            <div className="mt-1 text-xs text-emerald-100">450 / 1000 points</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
