import { WidthAndHeight } from "@/app/types";
import { MatterSim } from "../../MatterSim";
import { baseWorldSize } from "../../MatterSim/consts";
import drawMountains from "./drawMountains";
import drawDebug from "./drawDebug";
import createCelestialBodies from "./createCelestialBodies";
import drawCelestialDisc from "./drawCelestialDisc";
import drawSky from "./drawSky";
import createMountains from "./createMountains";
import createSineWaveMountain, { SineWaveMountain } from "./drawMountains/createSineWaveMountain";
import drawSineWaveMountain from "./drawMountains/drawSineWaveMountain";
import { getAngleFromCenter, randBetween } from "@/app/utils";

let rotationSpeed = 0.0025;
// let rotationSpeed = 0.0125;

const celestialDiscStartAngle = 0.96;
const sunStartAngle = Math.PI + celestialDiscStartAngle;
const moonStartAngle = 0 + celestialDiscStartAngle;
const celestialBodies = createCelestialBodies(baseWorldSize, 1000, baseWorldSize.height * 0.75, sunStartAngle, moonStartAngle);
const sun = celestialBodies[celestialBodies.length - 2];
const moon = celestialBodies[celestialBodies.length - 1];
const mountains = createMountains(baseWorldSize);
const sineMountains: SineWaveMountain[] = [];
const numMountains = 2;
const spaceBetweenMountains = baseWorldSize.width / numMountains;

for (let i = -spaceBetweenMountains; i < numMountains; i += 1) {
  const mountain = createSineWaveMountain(
    { width: baseWorldSize.width / 2, height: baseWorldSize.height / 2 },
    // spaceBetweenMountains * i - spaceBetweenMountains / 2,
    spaceBetweenMountains * i,
    baseWorldSize.height / 2 + randBetween(0, baseWorldSize.height / 5)
  );
  sineMountains.push(mountain);
}

sineMountains.sort((a, b) => (a.yOffset > b.yOffset ? 1 : -1));

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  const sunAngle = getAngleFromCenter(sun.position, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
  drawSky(context, baseWorldSize, sunAngle);
  drawCelestialDisc(context, canvasDrawFractions, rotationSpeed, celestialBodies);
  drawMountains(context, canvasDrawFractions, mountains);
  sineMountains.forEach((sineWaveMountain) => {
    drawSineWaveMountain(context, canvasDrawFractions, sineWaveMountain, sun, moon);
  });

  drawDebug(context, canvasDrawFractions, canvasSize, sim, sunAngle);
}
