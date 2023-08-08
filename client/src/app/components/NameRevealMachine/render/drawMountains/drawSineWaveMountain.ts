import drawCircle from "@/app/components/ResposiveCanvas/drawCircle";
import pathAlongPoints from "@/app/components/ResposiveCanvas/pathAlongPoints";
import { getAngleFromCenter, getPointInArc } from "@/app/utils";
import { Vector } from "matter-js";
import { SineWaveMountain } from "./createSineWaveMountain";
import { CelestialBody } from "../createCelestialBodies";
import calculateSineWaveMountainLighting from "./calculateSineWaveMountainLighting";

export default function drawSineWaveMountain(
  context: CanvasRenderingContext2D,
  drawFractions: Vector,
  sineWaveMountain: SineWaveMountain,
  sun: CelestialBody,
  moon: CelestialBody
) {
  const { peak, ridgeline } = sineWaveMountain;
  const sunAngleToMountainCenter = getAngleFromCenter(sineWaveMountain.center, sun.position);
  const moonAngleToMountainCenter = getAngleFromCenter(sineWaveMountain.center, moon.position);
  let sunIsUp = false;
  let moonIsUp = false;
  if (sunAngleToMountainCenter > -Math.PI && sunAngleToMountainCenter < 0) sunIsUp = true;
  if (moonAngleToMountainCenter > -Math.PI && moonAngleToMountainCenter < 0) moonIsUp = true;
  pathAlongPoints(context, drawFractions, sineWaveMountain.ridgeline);
  const minLightness = 4;
  let rightSideLightness = minLightness;
  let leftSideLightness = minLightness;
  if (sunIsUp) {
    const { left, right } = calculateSineWaveMountainLighting(50, minLightness, sunAngleToMountainCenter);
    rightSideLightness = right;
    leftSideLightness = left;
  } else if (moonIsUp) {
    const { left, right } = calculateSineWaveMountainLighting(20, minLightness, moonAngleToMountainCenter);
    rightSideLightness = right;
    leftSideLightness = left;
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
