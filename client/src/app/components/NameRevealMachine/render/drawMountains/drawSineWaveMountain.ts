import drawCircle from "@/app/components/ResposiveCanvas/drawCircle";
import pathAlongPoints from "@/app/components/ResposiveCanvas/pathAlongPoints";
import { getAngleFromCenter, getPointInArc } from "@/app/utils";
import { Vector } from "matter-js";
import { SineWaveMountain } from "./createSineWaveMountain";
import { CelestialBody } from "../createCelestialBodies";

export default function drawSineWaveMountain(context: CanvasRenderingContext2D, drawFractions: Vector, sineWaveMountain: SineWaveMountain, sun: CelestialBody) {
  const { peak, ridgeline } = sineWaveMountain;
  const sunAngleToMountainCenter = getAngleFromCenter(sineWaveMountain.center, sun.position);
  pathAlongPoints(context, drawFractions, sineWaveMountain.ridgeline);
  const maxLightness = 50;
  const minLightness = 10;
  const lightnessRange = maxLightness - minLightness;
  let leftSideLightness = minLightness;
  let rightSideLightness = minLightness;
  const dayglowLightness = (maxLightness - minLightness) / 3;
  const overhead = -Math.PI / 2;
  const fullyRight = 0;
  const fullyLeft = -Math.PI;
  if (sunAngleToMountainCenter > fullyLeft && sunAngleToMountainCenter < fullyRight) {
    rightSideLightness = dayglowLightness;
    if (sunAngleToMountainCenter > fullyLeft && sunAngleToMountainCenter < overhead) {
      const percentAngle = (sunAngleToMountainCenter - fullyLeft) / (fullyRight - fullyLeft);
      rightSideLightness = minLightness + lightnessRange * percentAngle;
      leftSideLightness = minLightness + lightnessRange * (1 - percentAngle) * 2 * percentAngle;
    }
    if (sunAngleToMountainCenter < fullyRight && sunAngleToMountainCenter > overhead) {
      const percentAngle = (sunAngleToMountainCenter - fullyRight) / (fullyLeft - fullyRight);
      leftSideLightness = minLightness + lightnessRange * percentAngle;
      rightSideLightness = minLightness + lightnessRange * (1 - percentAngle) * 2 * percentAngle;
    }
  }
  context.fillStyle = `hsl(232, 14%, ${rightSideLightness}%)`;
  context.fill();

  context.moveTo(sineWaveMountain.shadowDelimitingPath[0].x * drawFractions.x, sineWaveMountain.shadowDelimitingPath[0].y * drawFractions.y);
  context.beginPath();
  sineWaveMountain.shadowDelimitingPath.forEach((point) => {
    context.lineTo(point.x * drawFractions.x, point.y * drawFractions.y);
  });

  context.lineTo(ridgeline[0].x * drawFractions.x, ridgeline[0].y * drawFractions.y);
  let peakReached = false;
  ridgeline.forEach((point) => {
    if (point.x === peak.x && point.y === peak.y) return (peakReached = true);
    if (peakReached) return;
    context.lineTo(point.x * drawFractions.x, point.y * drawFractions.y);
  });
  context.fillStyle = `hsl(232, 14%, ${leftSideLightness}%)`;
  context.fill();
}
