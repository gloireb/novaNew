"use client";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { MessageCircle, Ticket, BookOpen, Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import UserHeader from "@/components/dashboard/user-header";
import FAQSection from "@/components/support/faq-section";

const CONTACT_METHODS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp Support",
    desc: "Réponse en moins de 15 min",
    href: "https://wa.me/243970550517",
    external: true,
    color: "bg-emerald-50 text-emerald-600",
    buttonText: "Ouvrir WhatsApp"
  },
  {
    icon: <Ticket className="w-6 h-6" />,
    title: "Tickets Support",
    desc: "Suivez vos demandes techniques",
    href: "/support/tickets",
    color: "bg-blue-50 text-blue-600",
    buttonText: "Mes tickets"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Appel Direct",
    desc: "Disponible 8h - 20h",
    href: "tel:+243970550517",
    external: true,
    color: "bg-slate-50 text-slate-600",
    buttonText: "Appeler"
  }
];

export default function SupportPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <UserHeader />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <header className="mb-12 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Centre d&apos;Aide NOVA+</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl">
              Besoin d&apos;aide ? Choisissez la méthode qui vous convient pour contacter nos experts à Likasi.
            </p>
          </motion.div>
        </header>

        {/* Quick Contacts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CONTACT_METHODS.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{method.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">{method.desc}</p>

              <Link
                href={method.href}
                {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
              >
                {method.buttonText} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Questions Fréquentes</h2>
            </div>
            <FAQSection />
          </div>

          {/* Need More Help? */}
          <div className="space-y-6">
            <div className="bg-slate-900 dark:bg-blue-900/20 text-white p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">Un problème spécifique ?</h3>
              <p className="text-slate-400 font-medium text-sm mb-8 leading-relaxed">
                Si vous n&apos;avez pas trouvé de réponse dans la FAQ, ouvrez un ticket technique pour une assistance personnalisée.
              </p>
              <Link
                href="/support/new"
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Ouvrir un Ticket
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Autres Contacts</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">support@novaplus.cd</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">+243 000 000 000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Action (Visible on mobile) */}
      <Link
        href="https://wa.me/243970550517"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all z-50 group sm:bottom-12 sm:right-12"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none whitespace-nowrap border border-slate-100 dark:border-slate-800">
          WhatsApp Support
        </span>
      </Link>
    </div>
  );
}
