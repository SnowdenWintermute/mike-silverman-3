import { MountainDayNightSim } from "..";
import { CELESTIAL_ANGLES, baseRotationSpeed } from "../consts";
import spawnShootingStars from "./spawnShootingStars";

export default function updateShootingStars(sim: MountainDayNightSim) {
  const { sunAngle, renderRate } = sim;
  const { LATE_EVENING, EVENING_HORIZON, SUNSET, MIDNIGHT, SUNRISE, LATE_MORNING } = CELESTIAL_ANGLES;
  let chanceToSpawn = 0;
  let maxNumberOfStars = 0;
  if (sunAngle >= LATE_EVENING && sunAngle < EVENING_HORIZON) {
    chanceToSpawn = 0.01;
    maxNumberOfStars = 1;
  } else if (sunAngle >= EVENING_HORIZON && sunAngle < SUNSET) {
    chanceToSpawn = 0.1;
    maxNumberOfStars = 4;
  } else if (sunAngle <= SUNSET && sunAngle < MIDNIGHT - 0.5) {
    chanceToSpawn = 0.5;
    maxNumberOfStars = 200;
  } else if (sunAngle >= MIDNIGHT && sunAngle < SUNRISE) {
    chanceToSpawn = 0.1;
    maxNumberOfStars = 4;
  } else if (sunAngle >= SUNRISE && sunAngle < LATE_MORNING) {
  }

  spawnShootingStars(sim.shootingStars, chanceToSpawn, maxNumberOfStars);

  Object.entries(sim.deadShootingStars).forEach(([key, shootingStar]) => {
    shootingStar.update(shootingStar.dissipationSpeed * -1, renderRate, sim.rotationSpeed, baseRotationSpeed);
    if (shootingStar.currentTailLength <= 0) {
      delete sim.deadShootingStars[key];
    }
  });

  Object.entries(sim.shootingStars).forEach(([key, shootingStar]) => {
    shootingStar.update(0.5, renderRate, sim.rotationSpeed, baseRotationSpeed);
    if (shootingStar.age >= shootingStar.duration) {
      sim.deadShootingStars[key] = shootingStar;
      delete sim.shootingStars[key];
    }
  });
}
