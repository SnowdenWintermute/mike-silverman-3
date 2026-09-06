import { Vector } from "matter-js";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import { CelestialBody } from "./createCelestialBodies";
import { CELESTIAL_ANGLES } from "../consts";
import { percentBetweenTwoNumbers } from "@/app/utils";
import { WidthAndHeight } from "@/app/types";

export default function drawCelestialBodies(
  context: CanvasRenderingContext2D,
  drawFractions: Vector,
  canvasSize: WidthAndHeight,
  bodies: CelestialBody[],
  sunAngle: number
) {
  const { SUNRISE, SUNSET, HIGH_NOON } = CELESTIAL_ANGLES;
  let opacity = 1;

  if (sunAngle > SUNRISE && sunAngle < HIGH_NOON) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, SUNRISE, HIGH_NOON);
    opacity = 1 - percentAngle * 2;
  } else if (sunAngle > HIGH_NOON && sunAngle < SUNSET) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, HIGH_NOON, SUNSET);
    opacity = percentAngle;
  }

  if (opacity < 0) opacity = 0;
  context.globalAlpha = opacity;
  bodies.forEach((body, i) => {
    // the sun is drawn separately, with its own gradient
    if (i === bodies.length - 2) return;
    // the celestial sphere is centred well below the horizon, so most of it is off-canvas at any
    // given moment
    const x = body.position.x * drawFractions.x;
    const y = body.position.y * drawFractions.y;
    const radiusX = body.radius * drawFractions.x;
    const radiusY = body.radius * drawFractions.y;
    if (x + radiusX < 0 || x - radiusX > canvasSize.width || y + radiusY < 0 || y - radiusY > canvasSize.height) return;
    drawCircle(context, drawFractions, body.position, body.radius, body.color, true);
  });
  context.globalAlpha = 1;
}
