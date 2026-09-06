import { getAngleFromCenter, percentBetweenTwoNumbers } from "@/app/utils";
import { Vector } from "matter-js";
import { SineWaveMountain } from "./createSineWaveMountain";
import calculateSineWaveMountainLighting from "./calculateSineWaveMountainLighting";
import { HSLColor, RGBColor, hsl, rgba } from "@/app/utils/colors";
import { CELESTIAL_ANGLES } from "../consts";
import { baseWorldSize } from "@/app/components/MatterSim/consts";
import { CelestialBody } from "../celestialBodies/createCelestialBodies";

export default function drawSineWaveMountain(
  context: CanvasRenderingContext2D,
  drawFractions: Vector,
  sineWaveMountain: SineWaveMountain,
  sun: CelestialBody,
  moon: CelestialBody,
  materialColor: HSLColor,
  sunColor: RGBColor,
  sunAngle: number
) {
  const { SUNRISE, MORNING_HORIZON, EARLY_MORNING, LATE_MORNING, SUNSET, EVENING_HORIZON, EARLY_EVENING, LATE_EVENING } = CELESTIAL_ANGLES;
  const baseColoredLightTransparency = 0.06;

  const { litPath, shadowPath } = sineWaveMountain;
  const sunAngleToMountainCenter = getAngleFromCenter(sineWaveMountain.center, sun.position);
  let sunIsUp = false;
  if (sunAngleToMountainCenter > -Math.PI && sunAngleToMountainCenter < 0) sunIsUp = true;
  let moonIsUp = false;
  const moonAngleToMountainCenter = getAngleFromCenter(sineWaveMountain.center, moon.position);
  if (moonAngleToMountainCenter > -Math.PI && moonAngleToMountainCenter < 0) moonIsUp = true;
  const minLightness = 4;
  const percentTowardForeground = percentBetweenTwoNumbers(sineWaveMountain.yOffset, 0, baseWorldSize.height);
  const sunMaxLightness = 50 * percentTowardForeground * 1.2;
  const moonMaxLightness = 40 * percentTowardForeground * 1.2;
  let rightSideLightness = minLightness;
  let leftSideLightness = minLightness;
  if (sunIsUp) {
    const { left, right } = calculateSineWaveMountainLighting(sunMaxLightness, minLightness, sunAngleToMountainCenter);
    rightSideLightness = right;
    leftSideLightness = left;
  } else if (moonIsUp) {
    const { left, right } = calculateSineWaveMountainLighting(moonMaxLightness, minLightness, moonAngleToMountainCenter);
    rightSideLightness = right;
    leftSideLightness = left;
  }
  context.save();
  context.scale(drawFractions.x, drawFractions.y);

  context.fillStyle = hsl(materialColor.hue, materialColor.saturation, rightSideLightness);
  context.fill(litPath);

  context.fillStyle = hsl(materialColor.hue, materialColor.saturation, leftSideLightness);
  context.fill(shadowPath);

  // colored light
  if (sunAngle >= SUNRISE && sunAngle < EARLY_MORNING) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, SUNRISE, EARLY_MORNING);
    context.fillStyle = rgba(sunColor.red, sunColor.green, sunColor.blue, baseColoredLightTransparency * percentAngle);
  } else if (sunAngle >= EARLY_MORNING && sunAngle < LATE_MORNING)
    context.fillStyle = rgba(sunColor.red, sunColor.green, sunColor.blue, baseColoredLightTransparency);
  else if (sunAngle >= LATE_MORNING && sunAngle < EARLY_EVENING)
    context.fillStyle = rgba(sunColor.red, sunColor.green, sunColor.blue, baseColoredLightTransparency);
  if (sunAngle >= EARLY_EVENING && sunAngle < LATE_EVENING) context.fillStyle = rgba(sunColor.red, sunColor.green, sunColor.blue, baseColoredLightTransparency);
  else if (sunAngle >= LATE_EVENING && sunAngle < SUNSET) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, LATE_EVENING, SUNSET);
    context.fillStyle = rgba(sunColor.red, sunColor.green, sunColor.blue, baseColoredLightTransparency * (1 - percentAngle));
  } else if (sunAngle >= SUNSET * -1 && sunAngle < SUNRISE) context.fillStyle = rgba(255, 255, 255, 0);
  context.fill(litPath);

  context.restore();
}
