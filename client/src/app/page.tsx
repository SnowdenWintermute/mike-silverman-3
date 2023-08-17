"use client";
import IntroPage from "./components/IntroPage";
import NameRevealMachine from "./components/NameRevealMachine";
import ProjectsPage from "./components/ProjectsPage";

export default function Home() {
  return (
    <main>
      {<NameRevealMachine />} <ProjectsPage />
    </main>
  );
}
