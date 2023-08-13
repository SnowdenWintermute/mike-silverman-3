import { ShootingStar } from "./ShootingStar";
import { getPointInArc } from "@/app/utils";
import { Vector } from "matter-js";

const maxTailLength = 40;
export default function drawShootingStar(context: CanvasRenderingContext2D, drawFractions: Vector, shootingStar: ShootingStar) {
  const { angle, size, currentTailLength, color } = shootingStar;

  context.strokeStyle = color;
  context.lineWidth = size * drawFractions.x;
  const { x, y } = shootingStar.position;
  for (let j = 0; j < Math.min(shootingStar.currentTailLength, maxTailLength); j += 1) {
    const strokeLength = j * currentTailLength;
    const endPoint = getPointInArc({ x, y }, angle, -strokeLength);
    context.beginPath();
    context.moveTo(x * drawFractions.x, y * drawFractions.y);
    context.lineTo(endPoint.x * drawFractions.x, endPoint.y * drawFractions.y);
    context.stroke();
  }
}
