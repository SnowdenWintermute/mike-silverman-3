import React, { useRef, useEffect, useState } from "react";
import { WidthAndHeight } from "@/app/types";
import SnowQuadtreeSim from "./SnowQuadtreeSim";
import ResponsiveCanvas from "../ResposiveCanvas";

type Props = {
  percentScrolled?: number;
  style?: Object;
};

export default function Snow({ percentScrolled, style }: Props) {
  const canvasSizeRef = useRef<WidthAndHeight>(null);
  const [canvasSize, setCanvasSize] = useState<WidthAndHeight>({
    width: 1,
    height: 1,
  });
  const snowSimRef = useRef<SnowQuadtreeSim>(new SnowQuadtreeSim(canvasSize));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startSimulation = () => {
    if (!canvasRef || !canvasRef.current) return;
    const numFlakes = canvasSize.width / 8;
    snowSimRef.current.spawnInitialSnowflakes(numFlakes, canvasRef);
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    snowSimRef.current.canvasSize = canvasSize;
    snowSimRef.current.stepSimulation(context);
  };

  useEffect(() => {
    startSimulation();
    return () => snowSimRef.current.cleanup();
  }, [canvasSize, canvasRef.current]);

  return (
    <div className="snow-canvas-container" style={style}>
      <ResponsiveCanvas canvasRef={canvasRef} setCanvasSize={setCanvasSize} parentCanvasSizeRef={canvasSizeRef} />
    </div>
  );
}
