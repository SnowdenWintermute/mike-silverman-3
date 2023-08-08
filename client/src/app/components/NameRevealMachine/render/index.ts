import { WidthAndHeight } from "@/app/types";
import { MatterSim } from "../../MatterSim";
import { baseWorldSize } from "../../MatterSim/consts";
import drawMountains from "./drawMountains";
import drawDebug from "./drawDebug";
import createCelestialBodies from "./createCelestialBodies";
import drawCelestialDisc from "./drawCelestialDisc";
import drawSky from "./drawSky";
import createMountains from "./createMountains";
import { generateSineWave } from "@/app/utils";
import createSineWaveMountain from "./drawMountains/createSineWaveMountain";
import strokePathAlongPoints from "../../ResposiveCanvas/strokePathAlongPoints";

const highnoon = Math.PI / 2;
const sunset = Math.PI;
const midnight = -Math.PI / 2;
const sunrise = 0;
let rotation = sunrise;

const sunStartAngle = Math.PI;
const moonStartAngle = 0;
const celestialBodies = createCelestialBodies(baseWorldSize, 1000, baseWorldSize.height * 0.75, sunStartAngle, moonStartAngle);
const mountains = createMountains(baseWorldSize);
const sinWave = generateSineWave(150, 3, 0, 20);
const sineWaveMountain = createSineWaveMountain(baseWorldSize);

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  // rotation += 0.0035;
  rotation += 0.0005;
  rotation = rotation % (Math.PI * 2);
  // drawSky(context, canvasSize, rotation);
  drawCelestialDisc(context, canvasDrawFractions, rotation, celestialBodies);
  drawMountains(context, canvasDrawFractions, mountains);

  strokePathAlongPoints(context, canvasDrawFractions, sineWaveMountain, "white");

  // drawDebug(context, canvasDrawFractions, canvasSize, sim);
}
