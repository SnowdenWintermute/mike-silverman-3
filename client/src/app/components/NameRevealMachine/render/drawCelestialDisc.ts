import { Vector } from "matter-js";
import { baseWorldSize } from "../../MatterSim/consts";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import { CelestialBody } from "./createCelestialBodies";

export default function drawCelestialDisc(context: CanvasRenderingContext2D, drawFractions: Vector, rotation: number, bodies: CelestialBody[]) {
  bodies.forEach((body) => {
    const rotatedPosition = Vector.rotateAbout(body.position, rotation, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
    drawCircle(context, drawFractions, rotatedPosition, body.radius, body.color, true);
  });
}
