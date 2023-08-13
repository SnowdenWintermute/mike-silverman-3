import { RGBColor, rgba } from "@/app/utils/colors";
import { percentBetweenTwoNumbers } from "@/app/utils";
import { CELESTIAL_ANGLES } from "../consts";
import { baseWorldSize } from "../../MatterSim/consts";
import { Vector } from "matter-js";

export default function drawSkyGlow(context: CanvasRenderingContext2D, drawFractions: Vector, sunAngle: number, sunColor: RGBColor) {
  const { SUNRISE, SUNSET, MORNING_HORIZON, EVENING_HORIZON } = CELESTIAL_ANGLES;
  const baseGlowTransparency = 0.5;
  let glowTransparency = 0;

  if (sunAngle >= SUNRISE && sunAngle < MORNING_HORIZON) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, SUNRISE, MORNING_HORIZON);
    glowTransparency = baseGlowTransparency * percentAngle;
  } else if (sunAngle >= MORNING_HORIZON && sunAngle < EVENING_HORIZON) glowTransparency = baseGlowTransparency;
  else if (sunAngle >= EVENING_HORIZON && sunAngle < SUNSET) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, EVENING_HORIZON, SUNSET);
    glowTransparency = baseGlowTransparency * (1 - percentAngle);
  }

  const gx = (baseWorldSize.width / 2) * drawFractions.x;
  const gy = baseWorldSize.height * 10 * drawFractions.y;
  const gr = baseWorldSize.height * 10 * drawFractions.y;
  const gr2 = baseWorldSize.height * 9 * drawFractions.y;
  const glowGradient = context.createRadialGradient(gx, gy, gr, gx, gy, gr2);
  glowGradient.addColorStop(0, rgba(sunColor.red, sunColor.green, sunColor.blue, 0));
  glowGradient.addColorStop(0.4, rgba(sunColor.red, sunColor.green, sunColor.blue, glowTransparency));
  context.fillStyle = glowGradient;
  context.fillRect(0, 0, baseWorldSize.width * drawFractions.x, baseWorldSize.height * drawFractions.y);
}
