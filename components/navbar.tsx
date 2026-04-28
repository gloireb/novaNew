"use client";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Search, Bell, User as UserIcon, LogOut, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

import Image from "next/image";

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
            N+
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-slate-900 dark:text-white">
            NOVA+
          </span>
        </Link>
      </div>

      {/* Search Bar (Centrale) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <input 
            type="text" 
            placeholder="Rechercher un forfait, support..."
            className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600/20 focus:bg-white dark:focus:bg-slate-900 h-11 pl-11 pr-4 rounded-2xl text-sm font-medium transition-all outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        </div>
      </div>

      {/* Action Links & Auth */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 dark:text-slate-400 mr-4">
          <Link href="#avantages" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Avantages</Link>
          <Link href="#forfaits" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
          <Link href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />
        
        <ThemeToggle />

        {user ? (
          <div className="flex items-center gap-3 pl-2 relative group">
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-transparent group-hover:border-blue-600/20 transition-all">
              {user.photoURL ? (
                <Image src={user.photoURL} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
               <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Session</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {profile?.displayName || user.displayName || "Client"}
                </p>
              </div>
              <Link href="/dashboard" className="w-full px-4 py-2 text-left text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="w-full px-4 py-2 text-left text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors hidden sm:block">
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10 dark:shadow-none"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 dark:text-slate-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-xl z-50">
          <Link href="#avantages" className="text-lg font-bold text-slate-900 dark:text-white">Avantages</Link>
          <Link href="#forfaits" className="text-lg font-bold text-slate-900 dark:text-white">Pricing</Link>
          <Link href="#contact" className="text-lg font-bold text-slate-900 dark:text-white">Contact</Link>
          <hr className="border-slate-100 dark:border-slate-800" />
          {user ? (
            <>
              <Link href="/dashboard" className="text-lg font-bold text-blue-600">Mon Dashboard</Link>
              <button onClick={() => signOut()} className="text-lg font-bold text-red-500 text-left">Déconnexion</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg font-bold text-slate-900 dark:text-white">Connexion</Link>
              <Link href="/register" className="text-lg font-bold text-blue-600">Créer un compte</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
