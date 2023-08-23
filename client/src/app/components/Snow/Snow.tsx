import React, { useRef, useEffect, useState } from "react";
import createSnowInterval from "./snowInterval/createSnowInterval";
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
  }, [canvasSize, canvasRef.current]);

  // useEffect(() => {
  //   drawRef.current = function () {
  //     if (!canvasRef.current) return;
  //     const context = canvasRef.current.getContext("2d");
  //     draw(
  //       context,
  //       canvasRef.current.clientWidth,
  //       canvasRef.current.clientHeight,
  //        snowflakes.current,
  //       qtRef,
  //     });
  //   };
  // });

  useEffect(() => {
    snowInterval.current = createSnowInterval(currentDrawFunction, canvasRef.current.clientWidth, canvasRef.current.clientHeight, snowflakes, qtRef);
    return () => clearInterval(snowInterval.current);
  });

  return (
    <div>
      <ResponsiveCanvas canvasRef={canvasRef} setCanvasSize={setCanvasSize} parentCanvasSizeRef={canvasSizeRef} />
    </div>
  );
}
