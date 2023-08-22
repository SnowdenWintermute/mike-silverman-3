import { Vector } from "matter-js";
import { baseWorldSize } from "../../MatterSim/consts";
import { CelestialBody } from "./createCelestialBodies";
import { MountainDayNightSim } from "..";
import { normalizeRadians } from "@/app/utils";

export default function updateCelestialBodies(sim: MountainDayNightSim, rotation: number, bodies: CelestialBody[]) {
  sim.totalRotation = normalizeRadians(sim.totalRotation + rotation);
  rotation = rotation % (Math.PI * 2);
  bodies.forEach((body, i) => {
    const rotatedPosition = Vector.rotateAbout(body.position, rotation, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
    bodies[i].position = rotatedPosition;
  });
}
