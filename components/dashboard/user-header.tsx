"use client";

import { useAuth } from "@/hooks/use-auth";
import { LogOut, Bell, Settings, User as UserIcon, Search } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";

export default function UserHeader() {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              N+
            </div>
            <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">
              NOVA+
            </span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Dashboard</Link>
            <Link href="/pricing" className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Forfaits</Link>
            {user?.email === "kulewakangitsirobert@gmail.com" && (
              <>
                <Link href="/admin/installations" className="text-sm font-bold text-blue-600 dark:text-blue-400">Admin: Installations</Link>
                <Link href="/admin/technicians" className="text-sm font-bold text-blue-600 dark:text-blue-400">Admin: Techs</Link>
              </>
            )}
          </nav>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-sm mx-8 hidden md:block">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Rechercher..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 h-10 pl-10 pr-4 rounded-xl text-xs font-bold transition-all outline-none focus:border-blue-600/20"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-600" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
          <ThemeToggle />

          <div className="flex items-center gap-3 pl-2">
            <div className="hidden text-right md:block">
              <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">
                {profile?.displayName || user?.displayName || "Utilisateur"}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {profile?.role || "Membre"}
              </p>
            </div>
            <div className="relative group">
              <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-transparent group-hover:border-blue-600/20 transition-all">
                {user?.photoURL ? (
                  <Image src={user.photoURL} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </button>
              
              {/* Dropdown Menu (Simplified for MVP) */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <button className="w-full px-4 py-2 text-left text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Paramètres
                </button>
                <button 
                  onClick={() => signOut()}
                  className="w-full px-4 py-2 text-left text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
