"use client";

import { useEffect, useState } from "react";
import { seedDatabase } from "@/lib/seed";
import { Navigation } from "./Navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    seedDatabase().then(() => setSeeded(true)).catch(console.error);
  }, []);

  if (!seeded) {
    return <div className="flex h-screen items-center justify-center p-4">Loading offline database...</div>;
  }

  return (
    <>
      <div className="min-h-screen pb-20 md:pb-0 bg-gray-50">
        <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-40">
          <h1 className="text-xl font-bold">Mumsy.ai</h1>
        </header>
        <main className="max-w-2xl mx-auto md:p-4">
          {children}
        </main>
      </div>
      <Navigation />
    </>
  );
}
