"use client";

import Link from "next/link";

export function BrandFooter() {
  return (
    <footer className="w-full pt-16 pb-8 bg-surface-container-low border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-on-surface font-headline hover:opacity-80 transition-opacity">
            mumsy.ai
          </Link>
          <p className="font-body text-sm text-on-surface-variant text-center md:text-left max-w-xs">
            © 2026 mumsy.ai.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="font-body text-sm text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="/about">About</Link>
          <Link className="font-body text-sm text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="/privacy">Privacy Policy</Link>
          <Link className="font-body text-sm text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="/terms">Terms of Service</Link>
          <Link className="font-body text-sm text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="/contact">Contact</Link>
          <Link className="font-body text-sm text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-all" href="/support">Support</Link>
        </div>
      </div>
    </footer>
  );
}
