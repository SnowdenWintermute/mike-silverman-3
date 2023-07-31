"use client";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

export type WidthAndHeight = { width: number; height: number };

export default function FullScreenCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeRef = useRef<WidthAndHeight | null>(null);
  // const gameRef = useRef<TestGame>(new TestGame());
  const windowDimensions = useWindowDimensions();

  const [canvasSize, setCanvasSize] = useState<WidthAndHeight>({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    if (!windowDimensions) return;
    // even though we don't use this value for anything, the fact that we set state forces a react refresh which actually makes the
    // canvas resize, so its needed for now
    setCanvasSize({
      height: windowDimensions.height,
      width: windowDimensions.width,
    });
    canvasSizeRef.current = {
      height: windowDimensions.height,
      width: windowDimensions.width,
    };
  }, [setCanvasSize, windowDimensions]);

  return (
    <main>
      <canvas
        height={canvasSizeRef.current?.height}
        width={canvasSizeRef.current?.width}
        id="canvas"
        className="canvas__full-screen"
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
      />
    </main>
  );
}
