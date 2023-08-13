import { Vector } from "matter-js";
import { CelestialBody } from "./createCelestialBodies";
import { RGBColor, rgba } from "@/app/utils/colors";
import { getPointInArc } from "@/app/utils";

export default function drawSun(context: CanvasRenderingContext2D, drawFractions: Vector, sun: CelestialBody, sunColor: RGBColor) {
  const ax = sun.position.x * drawFractions.x;
  const ay = sun.position.y * drawFractions.y;
  const grd = context.createRadialGradient(ax, ay, sun.radius / 8, ax, ay, sun.radius);
  grd.addColorStop(0, rgba(sunColor.red, sunColor.green, sunColor.blue, 1));
  grd.addColorStop(0.4, rgba(sunColor.red, sunColor.green, sunColor.blue, 0));

  context.fillStyle = grd;
  context.beginPath();
  context.arc(ax, ay, sun.radius, 0, Math.PI * 2);
  context.shadowBlur = 200;
  context.fill();
  context.closePath();

  const numRays = 4;
  for (let i = 0; i < numRays; i -= 1) {
    context.moveTo(ax, ay);
    context.beginPath();
    const rayPoint = getPointInArc({ x: ax, y: ay }, (Math.PI / 2) * i, (40 * (drawFractions.x + drawFractions.y)) / 2);
    context.lineTo(rayPoint.x, rayPoint.y);
    context.strokeStyle = rgba(sunColor.red, sunColor.green, sunColor.blue, 0.5);
  }
}
