"use client";

import { motion } from "motion/react";
import { BentoCard } from "@/components/ui/BentoCard";

export default function CommunityPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-headline font-extrabold text-on-surface mb-6">A sanctuary of <span className="text-primary italic">shared stories.</span></h1>
        <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">Connect with a supportive network of mothers and health experts who prioritize community-led wellness.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Safe Spaces", icon: "forum", desc: "Moderated discussions about pregnancy, recovery, and early childhood care." },
          { icon: "campaign", title: "Public Health Hub", desc: "Stay informed about regional health announcements and clinical breakthroughs." },
          { icon: "celebration", title: "Milestone Circle", desc: "Celebrate and share the beautiful moments of your maternal journey." }
        ].map((item, i) => (
          <BentoCard key={i} delay={i * 0.1}>
            <span className="material-symbols-outlined text-primary text-4xl mb-6">{item.icon}</span>
            <h2 className="text-2xl font-headline font-bold mb-4">{item.title}</h2>
            <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
          </BentoCard>
        ))}
      </div>

      <div className="bg-primary-fixed rounded-[3rem] p-12 lg:p-20 text-center">
         <h2 className="text-3xl font-headline font-bold text-on-primary-fixed mb-6">Join your regional circle</h2>
         <p className="text-on-primary-fixed/80 max-w-xl mx-auto mb-10">We prioritize connecting you with mothers in your local area to foster real-world support and shared local wisdom.</p>
         <button className="bg-primary text-white px-10 py-4 rounded-xl font-headline font-bold hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-primary/20">
            Find My Community
         </button>
      </div>
    </div>
  );
}
