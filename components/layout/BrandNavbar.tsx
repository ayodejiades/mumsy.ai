"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

interface BrandNavbarProps {
  onStart?: () => void;
}

export function BrandNavbar({ onStart }: BrandNavbarProps) {
  const pathname = usePathname();
  
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Care Plans", href: "/care-plans" },
    { name: "Community", href: "/community" },
  ];

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-surface-container shadow-sm shadow-primary/5">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-on-surface text-pink-600 font-headline hover:opacity-80 transition-opacity">
          <Heart className="text-pink-600" fill="currentColor" size={24} />
          mumsy.ai
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-headline font-medium text-sm tracking-tight transition-colors hover:text-primary ${
                pathname === link.href 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-on-surface-variant"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isDashboard && (
             <Link
              href="/dashboard"
              className="font-headline font-semibold text-sm tracking-tight text-primary border-b-2 border-primary"
            >
              Tracker
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="font-headline font-medium text-sm tracking-tight text-on-surface-variant hover:text-primary transition-all duration-300">Sign In</Link>
          <Link
            href="/signup"
            className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-full font-headline font-semibold text-sm hover:opacity-90 transition-all duration-300 scale-95 active:scale-90 shadow-lg shadow-primary/20"
          >
            {isDashboard ? "My Account" : "Get Started"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
