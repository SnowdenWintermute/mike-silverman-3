import { Vector } from "matter-js";
import { Ridgeline } from "./createRidgeline";
import { percentBetweenTwoNumbers } from "@/app/utils";
import { MOUNTAIN_MATERIAL, CELESTIAL_ANGLES } from "../consts";
import { RGBColor, hsl, rgba } from "@/app/utils/colors";
import drawRidgeline from "./drawRidgeline";

export default function drawRidgelines(
  context: CanvasRenderingContext2D,
  drawFractions: Vector,
  ridgelines: Ridgeline[],
  sunAngle: number,
  moonAngle: number,
  sunColor: RGBColor
) {
  const { SUNRISE, HIGH_NOON, SUNSET } = CELESTIAL_ANGLES;
  const minLightness = 5;
  const maxLightness = 50;
  let lightness = minLightness;
  let percentAngle = 0;
  let ridgelineSunlightTransparency = 0;
  // SUN LIGHTING
  if (sunAngle >= SUNRISE && sunAngle < HIGH_NOON) {
    percentAngle = percentBetweenTwoNumbers(sunAngle, SUNRISE, HIGH_NOON);
    lightness = maxLightness * percentAngle;
    ridgelineSunlightTransparency = percentAngle;
  } else if (sunAngle >= HIGH_NOON && sunAngle < SUNSET) {
    percentAngle = percentBetweenTwoNumbers(sunAngle, HIGH_NOON, SUNSET);
    lightness = maxLightness * (1 - percentAngle);
    ridgelineSunlightTransparency = 1 - percentAngle;
  }
  // MOON LIGHTING
  if (moonAngle >= SUNRISE && moonAngle < HIGH_NOON) {
    percentAngle = percentBetweenTwoNumbers(moonAngle, SUNRISE, HIGH_NOON);
    lightness = maxLightness * percentAngle;
  } else if (moonAngle >= HIGH_NOON && moonAngle < SUNSET) {
    percentAngle = percentBetweenTwoNumbers(moonAngle, HIGH_NOON, SUNSET);
    lightness = maxLightness * (1 - percentAngle);
  }

  if (lightness < minLightness) lightness = minLightness;

  ridgelines.forEach((ridgeline, i) => {
    const indexPercentOfTotal = percentBetweenTwoNumbers(i + 1, 0, ridgelines.length);

    drawRidgeline(context, drawFractions, ridgeline, hsl(MOUNTAIN_MATERIAL.hue, MOUNTAIN_MATERIAL.saturation * indexPercentOfTotal, lightness * 0.8));
    drawRidgeline(context, drawFractions, ridgeline, rgba(sunColor.red, sunColor.green, sunColor.blue, 0.1 * ridgelineSunlightTransparency));
  });
}
