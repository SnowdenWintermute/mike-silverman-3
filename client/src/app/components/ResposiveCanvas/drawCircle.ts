import { Vector } from "matter-js";

export default function drawCircle(context: CanvasRenderingContext2D, drawFractions: Vector, center: Vector, radius: number, color: string, fill = true) {
  const { x, y } = center;
  context.beginPath();
  if (fill) context.fillStyle = color;
  else context.strokeStyle = color;
  context.ellipse(x * drawFractions.x, y * drawFractions.y, radius * drawFractions.x, radius * drawFractions.y, 0, 0, Math.PI * 2);
  !fill ? context.stroke() : context.fill();
}
