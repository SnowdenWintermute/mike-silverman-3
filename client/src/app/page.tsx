"use client";
import IntroPage from "./components/IntroPage";
import dynamic from "next/dynamic";
const NameRevealMachine = dynamic(() => import("./components/NameRevealMachine"), { ssr: false });

export default function Home() {
  return (
    <main className="main-element">
      <NameRevealMachine />
      <IntroPage />
    </main>
  );
}
