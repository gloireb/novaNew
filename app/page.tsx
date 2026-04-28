"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Hero from '@/components/hero';
import Features from '@/components/features';
import Pricing from '@/components/pricing';
import ConnectivityShowcase from '@/components/connectivity-showcase';
import { Testimonials, FAQ, Footer, WhatsAppFAB } from '@/components/social';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden transition-colors duration-300 dark:bg-slate-950">
      <Hero />
      <ConnectivityShowcase />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
