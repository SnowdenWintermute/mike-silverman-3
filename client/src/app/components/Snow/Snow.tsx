import React, { useRef, useEffect } from "react";
import draw from "./draw";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import createSnowInterval from "./snowInterval/createSnowInterval";
import Snowflake from "./Snowflake";
import QuadTree from "./Quadtree/Quadtree";

type Props = {
  numFlakes: number;
  parentHeight: number;
  parentWidth: number;
};

export default function Snow({ numFlakes, parentHeight, parentWidth }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<() => void>();
  const snowInterval = useRef<NodeJS.Timeout>();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const snowflakes = useRef<Snowflake[]>([]);
  const qtRef = useRef<QuadTree>();
  const mouseData = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 50,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    snowflakes.current = [];
    for (let i = numFlakes; i > 0; i--)
      snowflakes.current.push(new Snowflake(Math.random() * canvasRef.current.clientWidth, Math.random() * canvasRef.current.clientHeight));
  }, [windowWidth, windowHeight, parentHeight, parentWidth, numFlakes, canvasRef.current]);

  useEffect(() => {
    drawRef.current = function () {
      if (!canvasRef.current) return;
      const context = canvasRef.current.getContext("2d");
      draw(
        context,
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
         snowflakes.current,
        qtRef,
      });
    };
  });

  useEffect(() => {
    function currentDrawFunction() {
      drawRef.current();
    }

    snowInterval.current = createSnowInterval(currentDrawFunction, canvasRef.current.clientWidth, canvasRef.current.clientHeight, snowflakes, qtRef);
    return () => clearInterval(snowInterval.current);
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseData.current.x = e.nativeEvent.offsetX;
    mouseData.current.y = e.nativeEvent.offsetY;
  };

  return <canvas className="snow-canvas" height={parentHeight || 400} width={parentWidth || 400} ref={canvasRef} onMouseMove={handleMouseMove} />;
}
