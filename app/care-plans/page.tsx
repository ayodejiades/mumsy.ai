"use client";

import { motion } from "motion/react";
import { BentoCard } from "@/components/ui/BentoCard";

export default function CarePlansPage() {
  const plans = [
    {
      name: "Basic Sanctuary",
      price: "Free",
      desc: "Essential health tracking and AI risk monitoring for every mother.",
      features: ["Daily vitals log", "AI risk prediction", "Weekly health reports"],
      current: false
    },
    {
      name: "CHW Plus",
      price: "$12/mo",
      desc: "Direct connection to specialized Community Health Workers for personalized care.",
      features: ["Everything in Basic", "24/7 CHW support", "Direct referral priority"],
      current: true
    },
    {
      name: "Clinical Elite",
      price: "$45/mo",
      desc: "Full-spectrum clinical monitoring with specialized specialist access.",
      features: ["Everything in CHW Plus", "Monthly specialist call", "Emergency response sync"],
      current: false
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-headline font-extrabold text-on-surface mb-6">Choose your <span className="text-primary italic">level of care.</span></h1>
        <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">Plans tailored to provide the sanctuary you and your baby deserve.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <BentoCard key={i} className={plan.current ? "border-primary/40 shadow-xl shadow-primary/5 relative" : ""} delay={i * 0.1}>
            {plan.current && (
               <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</div>
            )}
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-headline font-black text-primary">{plan.price}</span>
              {plan.price !== "Free" && <span className="text-on-surface-variant text-sm">/month</span>}
            </div>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">{plan.desc}</p>
            <ul className="space-y-4 mb-12">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-headline font-bold transition-all active:scale-[0.98] ${plan.current ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90' : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'}`}>
              Get {plan.name}
            </button>
          </BentoCard>
        ))}
      </div>
    </div>
  );
}
