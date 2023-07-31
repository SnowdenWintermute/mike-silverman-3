"use client";
import FullScreenCanvas from "./components/FullScreenCanvas";

export type WidthAndHeight = { width: number; height: number };

export default function Home() {
  return (
    <main>
      <FullScreenCanvas />
    </main>
  );
}
