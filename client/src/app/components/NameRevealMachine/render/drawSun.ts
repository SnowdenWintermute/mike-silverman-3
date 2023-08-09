import { Vector } from "matter-js";
import { CelestialBody, SUN_COLORS } from "./createCelestialBodies";
import { rgba } from "@/app/utils/colors";
import { CELESTIAL_ANGLES } from "./consts";

export default function drawSun(context: CanvasRenderingContext2D, drawFractions: Vector, sun: CelestialBody, skyOpacity: number, sunAngle: number) {
  const { SUNRISE, HIGH_NOON, SUNSET } = CELESTIAL_ANGLES;
  if (sunAngle > SUNRISE && sunAngle < HIGH_NOON) {
    const percentAngle = (sunAngle - SUNRISE) / (HIGH_NOON - SUNRISE);
    // opacity = 1 - percentAngle * 2;
  } else if (sunAngle > HIGH_NOON && sunAngle < SUNSET) {
    const percentAngle = (sunAngle - HIGH_NOON) / (SUNSET - HIGH_NOON);
    // opacity = percentAngle;
  }
  context.globalAlpha = 1;
  const ax = sun.position.x * drawFractions.x;
  const ay = sun.position.y * drawFractions.y;
  const grd = context.createRadialGradient(ax, ay, sun.radius / 8, ax, ay, sun.radius);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.4, rgba(SUN_COLORS.WHITE.red, SUN_COLORS.WHITE.green, SUN_COLORS.WHITE.blue, 0));

  context.fillStyle = grd;
  context.beginPath();
  context.arc(ax, ay, sun.radius, 0, Math.PI * 2);
  context.shadowBlur = 200;
  context.fill();
  context.closePath();
  context.globalAlpha = skyOpacity;
}
