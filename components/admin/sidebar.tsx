"use client";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  MapPin, 
  HardHat, 
  Ticket, 
  BarChart3,
  Settings,
  ChevronRight
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/admin/users", label: "Utilisateurs", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/payments", label: "Paiements", icon: <CreditCard className="w-5 h-5" /> },
  { href: "/admin/installations", label: "Installations", icon: <MapPin className="w-5 h-5" /> },
  { href: "/admin/technicians", label: "Techniciens", icon: <HardHat className="w-5 h-5" /> },
  { href: "/admin/support", label: "Support Tickets", icon: <Ticket className="w-5 h-5" /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 hidden lg:flex flex-col sticky top-20 h-[calc(100vh-5rem)]">
      <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"} transition-colors`}>
                  {link.icon}
                </div>
                <span className="text-sm font-black uppercase tracking-tight">{link.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
            </Link>
          );
        })}

        <div className="pt-8 mt-8 border-t border-slate-50 dark:border-slate-800">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">System</p>
          <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-sm uppercase tracking-tight">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-sm uppercase tracking-tight">
            <Settings className="w-5 h-5" />
            Config
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800/50">
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Admin Session</p>
           <p className="text-xs font-bold text-slate-500 dark:text-slate-400">NOVA+ Backend v1.0</p>
        </div>
      </div>
    </aside>
  );
}
