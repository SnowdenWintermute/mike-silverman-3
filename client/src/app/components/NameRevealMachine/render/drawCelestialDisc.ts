import { Vector } from "matter-js";
import { baseWorldSize } from "../../MatterSim/consts";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import { CelestialBody } from "./createCelestialBodies";

const highnoon = Math.PI / 2;
const sunset = Math.PI;
const midnight = -Math.PI / 2;
const sunrise = 0;

export default function drawCelestialDisc(context: CanvasRenderingContext2D, drawFractions: Vector, rotation: number, bodies: CelestialBody[]) {
  context.fillStyle = "black";
  context.fillRect(0, 0, baseWorldSize.width, baseWorldSize.height);
  rotation = rotation % (Math.PI * 2);
  bodies.forEach((body, i) => {
    const rotatedPosition = Vector.rotateAbout(body.position, rotation, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
    bodies[i].position = rotatedPosition;

    if (i === bodies.length - 2) {
      const ax = body.position.x * drawFractions.x;
      const ay = body.position.y * drawFractions.y;
      const grd = context.createRadialGradient(ax, ay, body.radius / 8, ax, ay, body.radius);
      // context.createRadialGradient()
      // grd.addColorStop(0.3, "rgba(230,210,210, 1)");
      // grd.addColorStop(0.5, "rgba(230,210,210, .3)");
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.4, "rgba(242,224,131, 0)");

      // Draw a filled Rectangle
      context.fillStyle = grd;
      context.beginPath();
      context.arc(ax, ay, body.radius / 2, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    } else drawCircle(context, drawFractions, body.position, body.radius, body.color, true);
  });
}
