import { baseWorldSize } from "../../MatterSim/consts";
import { CelestialBody } from "./createCelestialBodies";
import { MountainDayNightSim } from "..";

export default function updateCelestialBodies(sim: MountainDayNightSim, rotation: number, bodies: CelestialBody[]) {
  sim.totalRotation = (sim.totalRotation + rotation) % (Math.PI * 2);
  rotation = rotation % (Math.PI * 2);

  const centerX = baseWorldSize.width / 2;
  const centerY = baseWorldSize.height * 2;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  for (const body of bodies) {
    const offsetX = body.position.x - centerX;
    const offsetY = body.position.y - centerY;
    body.position.x = centerX + (offsetX * cos - offsetY * sin);
    body.position.y = centerY + (offsetX * sin + offsetY * cos);
  }
}
