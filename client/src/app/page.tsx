"use client";
import dynamic from "next/dynamic";
const IntroPage = dynamic(() => import("./components/IntroPage"));
const NameRevealMachine = dynamic(() => import("./components/NameRevealMachine"), {
  ssr: false,
  loading: () => <div className="mountain-range-scene-section" />,
});

export default function Home() {
  return (
    <main className="main-element">
      <NameRevealMachine />
      <IntroPage />
    </main>
  );
}
