import { Vector } from "matter-js";

export default function pathAlongPoints(context: CanvasRenderingContext2D, drawFractions: Vector, points: Vector[]) {
  const { x, y } = drawFractions;
  context.moveTo(points[0].x * x, points[0].y * y);
  context.beginPath();
  points.forEach((point) => {
    context.lineTo(point.x * x, point.y * y);
  });
  context.closePath();
}
