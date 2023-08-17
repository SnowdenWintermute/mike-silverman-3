import { MountainDayNightSim } from "..";
import drawCelestialBodies from "../celestialBodies/drawCelestialBodies";
import drawSky from "./drawSky";
import { WidthAndHeight } from "@/app/types";
import drawShootingStars from "../shootingStars/drawShootingStars";
import determineSunColor from "./determineSunColor";
import drawSun from "./drawSun";
import drawSkyGlow from "./drawSkyGlow";
import drawRidgelines from "../ridgelines/drawRidgelines";
import drawSineWaveMountain from "../sineWaveMountains/drawSineWaveMountain";
import { MOUNTAIN_MATERIAL } from "../consts";

export default function renderMountainDayNightScene(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MountainDayNightSim) {
  const drawFractions = {
    x: canvasSize.width / sim.worldSize.width,
    y: canvasSize.height / sim.worldSize.height,
  };

  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  sim.skyColor = drawSky(context, canvasSize, sim.sunAngle);
  drawCelestialBodies(context, drawFractions, sim.rotationSpeed, sim.celestialBodies, sim.sunAngle);
  drawShootingStars(context, drawFractions, sim);
  const sunColor = determineSunColor(sim.sunAngle);
  drawSun(context, drawFractions, sim.sun, sunColor);
  drawSkyGlow(context, drawFractions, sim.sunAngle, sunColor);
  drawRidgelines(context, drawFractions, sim.ridgelines, sim.sunAngle, sim.moonAngle, sunColor);
  sim.sineMountains.forEach((sineWaveMountain) => {
    drawSineWaveMountain(context, drawFractions, sineWaveMountain, sim.sun, sim.moon, MOUNTAIN_MATERIAL, sunColor, sim.sunAngle);
  });

  // context.fillStyle = "black";
  // context.fillText(`${sim.scrollPercent}`, 9, 9);
  // context.fillStyle = "white";
  // context.fillText(`${sim.scrollPercent}`, 10, 10);
}
