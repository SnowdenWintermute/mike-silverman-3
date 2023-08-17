"use client";
import IntroPage from "./components/IntroPage";
import NameRevealMachine from "./components/NameRevealMachine";

export default function Home() {
  return (
    <main className="main-element">
      {<NameRevealMachine />}
      <IntroPage />
    </main>
  );
}
