"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { MatterSim } from "../MatterSim";

export type WidthAndHeight = { width: number; height: number };

type Props = {
  simulationRef: MutableRefObject<MatterSim>;
};

export default function ResponsiveCanvas({ simulationRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeRef = useRef<WidthAndHeight | null>(null);
  const windowDimensions = useWindowDimensions();

  const [canvasSize, setCanvasSize] = useState<WidthAndHeight>({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log(canvasRef.current);
    // even though we don't use this value for anything, the fact that we set state forces a react refresh which actually makes the
    // canvas resize, so its needed for now
    setCanvasSize({
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    });
    canvasSizeRef.current = {
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    };
  }, [setCanvasSize, canvasRef, windowDimensions]);

  useEffect(() => {
    const simulationRefCurrent = simulationRef.current;
    simulationRef.current.canvasSize = { width: canvasSize.width, height: canvasSize.height };
    simulationRef.current.intervals.physics = setTimeout(() => {
      const context = canvasRef.current?.getContext("2d");
      if (!context || !canvasSizeRef.current) return;
      simulationRef.current.stepSimulation(context, canvasSizeRef.current);
    });

    return () => {
      simulationRefCurrent.cleanup();
    };
  }, [canvasRef, canvasSize.height, canvasSize.width]);

  return (
    <canvas
      height={canvasSizeRef.current?.height}
      width={canvasSizeRef.current?.width}
      id="canvas"
      className="canvas__full-screen"
      ref={canvasRef}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
