import { Vector } from "matter-js";
import { baseWorldSize } from "../../MatterSim/consts";
import { CelestialBody } from "./createCelestialBodies";

export default function updateCelestialBodies(rotation: number, bodies: CelestialBody[]) {
  rotation = rotation % (Math.PI * 2);
  bodies.forEach((body, i) => {
    const rotatedPosition = Vector.rotateAbout(body.position, rotation, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
    bodies[i].position = rotatedPosition;
  });
}
