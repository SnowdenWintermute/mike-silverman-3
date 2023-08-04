import { WidthAndHeight } from "@/app/types";

export default function drawSky(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, rotation: number) {
  const highnoon = Math.PI / 2;
  const sunset = Math.PI;
  const midnight = -Math.PI / 2;
  const sunrise = 0;
  const adjustedRotation = rotation + Math.PI / 2;
  const h = 200;
  const s = 60;
  const l = (adjustedRotation / (Math.PI / 2)) * 30;
  // console.log(l);

  context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
}
