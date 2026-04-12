"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export function BentoCard({ 
  children, 
  className = "", 
  delay = 0,
  hoverEffect = true 
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" } : undefined}
      className={`bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm transition-all duration-300 border border-transparent hover:border-outline-variant/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
