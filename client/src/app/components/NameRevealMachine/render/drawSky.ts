import { WidthAndHeight } from "@/app/types";
import { CELESTIAL_ANGLES } from "./consts";

const minLightness = 2;
const maxLightness = 50;
export default function drawSky(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sunAngle: number) {
  const { SUNRISE, SUNSET, HIGH_NOON } = CELESTIAL_ANGLES;
  const h = 200;
  const s = 60;
  let l = minLightness;

  if (sunAngle > SUNRISE && sunAngle < HIGH_NOON) {
    const percentAngle = (sunAngle - SUNRISE) / (HIGH_NOON - SUNRISE);
    l = maxLightness * percentAngle;
  } else if (sunAngle > HIGH_NOON && sunAngle < SUNSET) {
    const percentAngle = (sunAngle - HIGH_NOON) / (SUNSET - HIGH_NOON);
    l = maxLightness - maxLightness * percentAngle;
  }
  l = Math.max(l, minLightness);

  context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
}
