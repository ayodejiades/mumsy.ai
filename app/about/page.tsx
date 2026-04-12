"use client";

import { motion } from "motion/react";
import { BentoCard } from "@/components/ui/BentoCard";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-headline font-extrabold text-on-surface mb-8">Nurturing the <span className="text-primary italic">future generation.</span></h1>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
            mumsy.ai was founded on the belief that every mother deserves a clinical sanctuary. We combined AI innovation with the deep wisdom of Community Health Workers to bridge the gap in maternal healthcare accessibility.
          </p>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Our mission is to eliminate preventable maternal health crises through early detection and community-led intervention.
          </p>
        </motion.div>
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
           <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKKPqh1zTNQ-yvSp5EE1Ufa3Q76MSxAml26DwFXgPKe9pIu8HtwrNfmsgmL2SLVewDD0_UmESw3ey1GROKJEfYvzGV0PJJFnQb_dE6Ws38yYF_C_WHZ0WL95WoCGMFtVA57XS3DQVQsmkIZkjyUee0xwJujBcP6phXwmISfSew6MSvNCTIH6eMORpebII4PQPqpE9uq7uu5j303h-hHHyRKtUrhAJjQadgOcuO3iTP7-2k9UQofmqfYGssjsuPzklXfh8Sw15WDsQZ" 
            alt="About Mumsy" 
            className="w-full h-full object-cover"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "favorite", title: "Maternal Health First", desc: "Prioritizing the well-being of mothers as the foundation of health." },
          { icon: "groups", title: "Community Powered", desc: "Leveraging the trust and knowledge of Community Health Workers." },
          { icon: "bolt", title: "AI Precision", desc: "Using advanced models to predict risks before they become issues." }
        ].map((item, i) => (
          <BentoCard key={i} delay={i * 0.1}>
            <span className="material-symbols-outlined text-primary text-4xl mb-4">{item.icon}</span>
            <h3 className="text-xl font-headline font-bold mb-2">{item.title}</h3>
            <p className="text-on-surface-variant text-sm">{item.desc}</p>
          </BentoCard>
        ))}
      </div>
    </div>
  );
}
