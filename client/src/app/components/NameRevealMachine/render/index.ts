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

let rotationSpeed = 0.0025;

const sunStartAngle = Math.PI + 0.5;
const moonStartAngle = 0;
const celestialBodies = createCelestialBodies(baseWorldSize, 1000, baseWorldSize.height * 0.75, sunStartAngle, moonStartAngle);
const sun = celestialBodies[celestialBodies.length - 2];
const mountains = createMountains(baseWorldSize);
const sineMountains: SineWaveMountain[] = [];
const numMountains = 4;
const spaceBetweenMountains = baseWorldSize.width / numMountains;
console.log(spaceBetweenMountains);
// for (let i = 0; i < numMountains; i += 1) {
const mountain = createSineWaveMountain({ width: baseWorldSize.width / 2, height: baseWorldSize.height / 2 }, 100, baseWorldSize.height / 3);
sineMountains.push(mountain);
const mountain2 = createSineWaveMountain({ width: baseWorldSize.width / 2, height: baseWorldSize.height / 2 }, 530, -100);
sineMountains.push(mountain2);
// }

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  // rotation += 0.0035;
  // drawSky(context, canvasSize, rotation);
  drawCelestialDisc(context, canvasDrawFractions, rotationSpeed, celestialBodies);
  drawMountains(context, canvasDrawFractions, mountains);
  // sineMountains.forEach((sineWaveMountain) => {
  //   drawSineWaveMountain(context, canvasDrawFractions, sineWaveMountain, sun);
  // });
  drawSineWaveMountain(context, canvasDrawFractions, sineMountains[1], sun);
  drawSineWaveMountain(context, canvasDrawFractions, sineMountains[0], sun);

  // drawDebug(context, canvasDrawFractions, canvasSize, sim);
}
