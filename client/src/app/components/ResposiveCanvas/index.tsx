import { MutableRefObject, useEffect, useRef } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { WidthAndHeight } from "@/app/types";

type Props = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  parentCanvasSizeRef: MutableRefObject<WidthAndHeight | null>;
  setCanvasSize: (size: WidthAndHeight) => void;
  styles?: string;
};

export default function ResponsiveCanvas({ canvasRef, parentCanvasSizeRef, setCanvasSize, styles }: Props) {
  const canvasSizeRef = useRef<WidthAndHeight | null>(null);
  const windowDimensions = useWindowDimensions();

  const setCanvasSizes = () => {
    if (!canvasRef.current) return;
    // even though we don't use this value for anything, the fact that we set state forces a react refresh which actually makes the
    // canvas resize, so its needed for now
    setCanvasSize({
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    });

    canvasSizeRef.current = parentCanvasSizeRef.current = {
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    };
  };

  useEffect(() => {
    setCanvasSizes();
  }, [setCanvasSize, canvasRef, windowDimensions]);

  useEffect(() => {
    window.addEventListener("resize", setCanvasSizes);
    return () => window.removeEventListener("resize", setCanvasSizes);
  }, []);

  return (
    <canvas
      height={canvasSizeRef.current?.height}
      width={canvasSizeRef.current?.width}
      id="canvas"
      className={`canvas__full-screen ${styles || ""}`}
      ref={canvasRef}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
