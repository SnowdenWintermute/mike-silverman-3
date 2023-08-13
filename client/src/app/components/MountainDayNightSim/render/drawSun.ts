import { Vector } from "matter-js";
import { CelestialBody } from "../celestialBodies/createCelestialBodies";
import { RGBColor, rgba } from "@/app/utils/colors";

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
}
