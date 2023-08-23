"use client";
import dynamic from "next/dynamic";
const IntroPage = dynamic(() => import("./components/IntroPage"));
const MountainDayNightScene = dynamic(() => import("./components/MountainDayNightScene"), {
  ssr: false,
  loading: () => <div className="mountain-range-scene-section" />,
});

export default function Home() {
  return (
    <main className="main-element">
      <MountainDayNightScene />
      <IntroPage />
    </main>
  );
}
