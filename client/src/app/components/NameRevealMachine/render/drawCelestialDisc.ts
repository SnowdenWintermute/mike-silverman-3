import { Vector } from "matter-js";
import { baseWorldSize } from "../../MatterSim/consts";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import { CelestialBody } from "./createCelestialBodies";
import { CELESTIAL_ANGLES } from "./consts";
import drawSun from "./drawSun";
import { percentBetweenTwoNumbers } from "@/app/utils";

export default function drawCelestialDisc(
  context: CanvasRenderingContext2D,
  drawFractions: Vector,
  rotation: number,
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
  rotation = rotation % (Math.PI * 2);
  bodies.forEach((body, i) => {
    const rotatedPosition = Vector.rotateAbout(body.position, rotation, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
    bodies[i].position = rotatedPosition;

    // if (i === bodies.length - 2) drawSun(context, drawFractions, body, opacity, sunAngle);
    if (i === bodies.length - 2) return;
    else drawCircle(context, drawFractions, body.position, body.radius, body.color, true);
  });
  context.globalAlpha = 1;
}
