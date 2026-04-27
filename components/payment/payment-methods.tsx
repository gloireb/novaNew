"use client";

import { Check, CreditCard, Smartphone, Landmark } from "lucide-react";

export type PaymentMethodType = "mpesa" | "airtel" | "orange" | "card" | "cash";

interface PaymentMethodsProps {
  selected: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
}

const methods = [
  { id: "mpesa" as const, name: "M-Pesa", desc: "Vodacom Mobile Money", icon: <Smartphone className="w-5 h-5" />, color: "bg-[#e11d24]" },
  { id: "airtel" as const, name: "Airtel Money", desc: "Airtel Africa", icon: <Smartphone className="w-5 h-5" />, color: "bg-[#e11d24]" },
  { id: "orange" as const, name: "Orange Money", desc: "Orange DRC", icon: <Smartphone className="w-5 h-5" />, color: "bg-[#ff7900]" },
  { id: "card" as const, name: "Carte Bancaire", desc: "Visa / Mastercard", icon: <CreditCard className="w-5 h-5" />, color: "bg-blue-600" },
  { id: "cash" as const, name: "Espèces / Manuel", desc: "Points de vente Likasi", icon: <Landmark className="w-5 h-5" />, color: "bg-slate-700" },
];

export default function PaymentMethods({ selected, onSelect }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6 px-1">
        Sélectionnez votre méthode
      </h3>
      
      <div className="grid gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all group ${
              selected === method.id
                ? "border-blue-600 bg-blue-50/10 dark:bg-blue-900/10 shadow-lg shadow-blue-600/5 translate-x-1"
                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${method.color} flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105`}>
                {method.icon}
              </div>
              <div className="text-left">
                <p className={`font-black text-sm ${selected === method.id ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white"}`}>
                  {method.name}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                  {method.desc}
                </p>
              </div>
            </div>

            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selected === method.id 
                ? "border-blue-600 bg-blue-600 text-white" 
                : "border-slate-200 dark:border-slate-700 bg-transparent"
            }`}>
              {selected === method.id && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
