import { Vector } from "matter-js";
import { CelestialBody } from "./createCelestialBodies";
import { RGBColor, rgba } from "@/app/utils/colors";
import { getPointInArc } from "@/app/utils";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import { baseWorldSize } from "../../MatterSim/consts";

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

  // const numRays = 8;
  // const baseRayLength = 300;
  // const rayLengthModifier = (baseWorldSize.height / 2 - sun.position.y) / (baseWorldSize.height / 2);
  // for (let i = 0; i < numRays; i += 1) {
  //   // drawCircle(context, drawFractions, { x: , y: ay }, 30, "blue", true);
  //   const startingRayLength = i % 2 === 0 ? baseRayLength : baseRayLength / 2;
  //   const rayLength = startingRayLength * rayLengthModifier;
  //   const rayPoint = getPointInArc({ x: ax, y: ay }, (Math.PI / (numRays / 2)) * i, (rayLength * (drawFractions.x + drawFractions.y)) / 2);

  //   context.beginPath();
  //   context.lineTo(ax, ay);
  //   context.lineTo(rayPoint.x, rayPoint.y);
  //   context.lineWidth = 5;
  //   const rayGradient = context.createLinearGradient(ax, ay, rayPoint.x, rayPoint.y);
  //   rayGradient.addColorStop(0.0, rgba(sunColor.red, sunColor.green, sunColor.blue, 1));
  //   rayGradient.addColorStop(0.75, rgba(sunColor.red, sunColor.green, sunColor.blue, 0));
  //   context.strokeStyle = rayGradient;
  //   // context.strokeStyle = "blue";
  //   context.stroke();
  // }
}
