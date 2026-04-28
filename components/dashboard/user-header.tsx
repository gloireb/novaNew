"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Bell, Settings, User as UserIcon, Search, Menu, X, ChevronRight, Shield, LayoutDashboard } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function UserHeader() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/pricing", label: "Forfaits" },
    { href: "/support", label: "Support" },
  ];

  const adminLinks = isAdmin ? [
    { href: "/admin", label: "Admin: Dashboard" },
    { href: "/admin/users", label: "Admin: Utilisateurs" },
    { href: "/admin/installations", label: "Admin: Installations" },
    { href: "/admin/technicians", label: "Admin: Techs" },
    { href: "/admin/support", label: "Admin: Support" },
  ] : [];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 lg:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

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
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
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
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="px-4 py-2 mb-2 border-b border-slate-50 dark:border-slate-800/50">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{profile?.displayName || user?.displayName || "Profil"}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.email}</p>
                </div>

                <div className="px-2 space-y-0.5">
                  <Link href="/dashboard" className="w-full px-4 py-2.5 text-left text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-3 transition-colors">
                    <UserIcon className="w-4 h-4" /> Dashboard
                  </Link>
                  <button className="w-full px-4 py-2.5 text-left text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-3 transition-colors">
                    <Settings className="w-4 h-4" /> Paramètres
                  </button>
                </div>

                {adminLinks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                    <div className="px-4 py-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Administration</p>
                    </div>
                    <div className="px-2 space-y-0.5">
                      {adminLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href}
                          className="w-full px-4 py-2.5 text-left text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl flex items-center gap-3 transition-colors"
                        >
                          <Shield className="w-4 h-4" /> {link.label.replace('Admin: ', '')}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 px-2">
                  <button 
                    onClick={() => signOut()}
                    className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4 pb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 rounded-2xl text-base font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-between group"
                >
                  {link.label}
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
              {adminLinks.length > 0 && (
                <>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-4 mx-6" />
                  <div className="px-6 py-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Administration</p>
                  </div>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-6 py-4 rounded-2xl text-base font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
              
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-4 mx-6" />
              <button 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="mx-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-500 font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
