import { Vector } from "matter-js";

export default function strokePathAlongPoints(context: CanvasRenderingContext2D, drawFractions: Vector, points: Vector[], color: string) {
  const { x, y } = drawFractions;
  context.moveTo(points[0].x * x, points[0].y * y);
  context.beginPath();
  points.forEach((point, i) => {
    if (i === 0) return;
    context.lineTo(point.x * x, point.y * y);
  });
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
}
