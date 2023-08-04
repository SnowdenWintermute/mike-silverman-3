import { Vector } from "matter-js";

export default function drawArc(context: CanvasRenderingContext2D, point: Vector, color: string) {
  context.beginPath();
  const { x, y } = point;
  context.arc(x, y, 10, 0, Math.PI * 2);
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
}
