import React, { useRef, useEffect, useState } from "react";
import { WidthAndHeight } from "@/app/types";
import SnowQuadtreeSim from "./SnowQuadtreeSim";
import ResponsiveCanvas from "../ResposiveCanvas";

export default function Snow() {
  const canvasSizeRef = useRef<WidthAndHeight>(null);
  const [canvasSize, setCanvasSize] = useState<WidthAndHeight>({
    width: 1,
    height: 1,
  });
  const snowSimRef = useRef<SnowQuadtreeSim>(new SnowQuadtreeSim(canvasSize));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    const numFlakes = canvasSize.width / 8;
    snowSimRef.current.spawnInitialSnowflakes(numFlakes, canvasRef);
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    snowSimRef.current.canvasSize = canvasSize;
    snowSimRef.current.stepSimulation(context);

    return () => snowSimRef.current.cleanup();
  }, [canvasSize, canvasRef.current]);

  return (
    <div className="snow-canvas-container">
      <ResponsiveCanvas canvasRef={canvasRef} setCanvasSize={setCanvasSize} parentCanvasSizeRef={canvasSizeRef} />
    </div>
  );
}
