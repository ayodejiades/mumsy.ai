"use client";

import { LandingPage } from "@/components/LandingPage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/dashboard");
  };

  return (
    <LandingPage onStart={handleStart} />
  );
}
