import { WidthAndHeight } from "@/app/types";

const highnoon = Math.PI / 2;
const sunset = Math.PI;
const midnight = -Math.PI / 2;
const sunrise = 0;

const minLightness = 2;
const maxLightness = 50;
export default function drawSky(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sunAngle: number) {
  const h = 200;
  const s = 60;
  let l = minLightness;

  if (sunAngle > sunrise && sunAngle < highnoon) {
    //
    const percentAngle = (sunAngle - sunrise) / (highnoon - sunrise);
    l = maxLightness * percentAngle;
  } else if (sunAngle > highnoon && sunAngle < sunset) {
    const percentAngle = (sunAngle - highnoon) / (sunset - highnoon);
    l = maxLightness - maxLightness * percentAngle;
    //
  }
  l = Math.max(l, minLightness);
  // console.log(l);

  context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
}
