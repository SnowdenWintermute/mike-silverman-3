"use client";
import IntroPage from "./components/IntroPage";
import NameRevealMachine from "./components/NameRevealMachine";

export default function Home() {
  return (
    <main>
      {<NameRevealMachine />} <IntroPage />
    </main>
  );
}
