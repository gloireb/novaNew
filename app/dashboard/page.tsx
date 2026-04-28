"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserHeader from "@/components/dashboard/user-header";
import ConnectionStatus from "@/components/dashboard/connection-status";
import SubscriptionCard from "@/components/dashboard/subscription-card";
import UsageStats from "@/components/dashboard/usage-stats";
import QuickActions from "@/components/dashboard/quick-actions";
import PaymentHistory from "@/components/dashboard/payment-history";
import InstallationTracker from "@/components/dashboard/installation-tracker";
import { motion } from "motion/react";

export default function DashboardPage() {
  const { user, loading, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  const subscriptionStatus = profile?.subscriptionStatus || "none";
  const planName = profile?.subscriptionPlan || "Aucun";
  
  const getPrice = (plan: string) => {
    if (plan === "Basic") return "$35";
    if (plan === "Famille") return "$60";
    if (plan === "Entreprise") return "$120";
    return "$0";
  };

  const getCycle = (plan: string) => {
    return "Mois";
  };

  const getSpeed = (plan: string) => {
    if (plan === "Basic") return "10 Mbps";
    if (plan === "Famille") return "25 Mbps";
    if (plan === "Entreprise") return "50+ Mbps";
    return "N/A";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <UserHeader />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
            Bonjour, {profile?.displayName || user.displayName?.split(" ")[0] || "Cher client"} !
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {subscriptionStatus === "active" 
              ? "Votre connexion est optimale. Profitez-en !" 
              : "Renouvelez votre forfait pour rester connecté."}
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ConnectionStatus 
              status={subscriptionStatus}
              planName={planName}
              speed={getSpeed(planName)}
              expiryDate={subscriptionStatus === "active" ? "En cours" : "Expiré"}
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SubscriptionCard 
                  planName={planName}
                  price={getPrice(planName)}
                  cycle={getCycle(planName)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <InstallationTracker />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <PaymentHistory />
              </motion.div>
            </div>

            {/* Side Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <UsageStats />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuickActions />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          NOVA+ Connect &copy; 2026 - Likasi, RDC
        </p>
      </footer>
    </div>
  );
}
