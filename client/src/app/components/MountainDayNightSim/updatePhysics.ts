import { getAngleFromCenter } from "@/app/utils";
import { MountainDayNightSim } from ".";
import updateCelestialBodies from "./celestialBodies/updateCelestialBodies";
import updateShootingStars from "./shootingStars/updateShootingStars";

export default function updateMountainDayNightPhysics(sim: MountainDayNightSim) {
  const { renderRate, deltaMs } = sim;
  const speedModifier = deltaMs / renderRate;

  updateCelestialBodies(sim, sim.rotationSpeed * speedModifier, sim.celestialBodies);
  updateShootingStars(sim, speedModifier);
  sim.sunAngle = getAngleFromCenter(sim.sun.position, { x: sim.worldSize.width / 2, y: sim.worldSize.height * 2 });
  sim.moonAngle = getAngleFromCenter(sim.moon.position, { x: sim.worldSize.width / 2, y: sim.worldSize.height * 2 });
}
