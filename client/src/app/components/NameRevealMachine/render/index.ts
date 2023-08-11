import { WidthAndHeight } from "@/app/types";
import { MatterSim } from "../../MatterSim";
import { baseWorldSize } from "../../MatterSim/consts";
import drawDebug from "./drawDebug";
import createCelestialBodies from "./createCelestialBodies";
import drawCelestialDisc from "./drawCelestialDisc";
import drawSky from "./drawSky";
import { getAngleFromCenter } from "@/app/utils";
import drawSun from "./drawSun";
import determineSunColor from "./determineSunColor";
import drawSkyGlow from "./drawSkyGlow";
import { MOUNTAIN_MATERIAL } from "./consts";
import createSineWaveMountains from "./drawSineWaveMountains/createSineWaveMountains";
import drawSineWaveMountain from "./drawSineWaveMountains/drawSineWaveMountain";
import drawRidgelines from "./drawRidgelines";
import createRidgelines from "./drawRidgelines/createRidgelines";
import drawShootingStars from "./drawShootingStars";

// let rotationSpeed = 0.0005;
let rotationSpeed = 0.0025;
// let rotationSpeed = 0.0045;
// let rotationSpeed = 0.0125;

// const celestialDiscStartAngle = 0.96;
const celestialDiscStartAngle = Math.PI / 2;
const sunStartAngle = Math.PI + celestialDiscStartAngle;
const moonStartAngle = 0 + celestialDiscStartAngle;
const celestialBodies = createCelestialBodies(baseWorldSize, 1000, baseWorldSize.height * 0.75, sunStartAngle, moonStartAngle);
const sun = celestialBodies[celestialBodies.length - 2];
const moon = celestialBodies[celestialBodies.length - 1];
const ridgelines = createRidgelines(baseWorldSize);
const sineMountains = createSineWaveMountains(30);

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim, renderRate: number) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  const sunAngle = getAngleFromCenter(sun.position, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
  const moonAngle = getAngleFromCenter(moon.position, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
  drawSky(context, baseWorldSize, sunAngle);
  drawCelestialDisc(context, canvasDrawFractions, rotationSpeed, celestialBodies, sunAngle);
  drawShootingStars(context, canvasDrawFractions, renderRate, sunAngle);
  const sunColor = determineSunColor(sunAngle);
  drawSun(context, canvasDrawFractions, sun, sunColor);
  drawSkyGlow(context, canvasDrawFractions, sunAngle, sunColor);
  drawRidgelines(context, canvasDrawFractions, ridgelines, sunAngle, moonAngle, sunColor);
  sineMountains.forEach((sineWaveMountain) => {
    drawSineWaveMountain(context, canvasDrawFractions, sineWaveMountain, sun, moon, MOUNTAIN_MATERIAL, sunColor, sunAngle);
  });

  drawDebug(context, canvasDrawFractions, canvasSize, sim, sunAngle);
}
