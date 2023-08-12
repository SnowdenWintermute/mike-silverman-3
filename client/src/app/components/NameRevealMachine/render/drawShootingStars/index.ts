import { Vector } from "matter-js";
import { ShootingStar } from "./ShootingStar";
import spawnShootingStars from "./spawnShootingStars";
import drawShootingStar from "./drawShootingStar";
import { CELESTIAL_ANGLES } from "../consts";

const shootingStars: { [key: string]: ShootingStar } = {};
const deadShootingStars: { [key: string]: ShootingStar } = {};

export default function drawShootingStars(context: CanvasRenderingContext2D, drawFractions: Vector, renderRate: number, sunAngle: number) {
  const { LATE_EVENING, EVENING_HORIZON, SUNSET, MIDNIGHT, SUNRISE, LATE_MORNING } = CELESTIAL_ANGLES;
  let chanceToSpawn = 0;
  let maxNumberOfStars = 0;
  if (sunAngle >= LATE_EVENING && sunAngle < EVENING_HORIZON) {
    chanceToSpawn = 0.01;
    maxNumberOfStars = 3;
  } else if (sunAngle >= EVENING_HORIZON && sunAngle < SUNSET) {
    chanceToSpawn = 0.1;
    maxNumberOfStars = 4;
  } else if (sunAngle <= SUNSET && sunAngle < MIDNIGHT - 0.5) {
    chanceToSpawn = 0.5;
    maxNumberOfStars = 100;
  } else if (sunAngle >= MIDNIGHT && sunAngle < SUNRISE) {
    chanceToSpawn = 0.1;
    maxNumberOfStars = 3;
  } else if (sunAngle >= SUNRISE && sunAngle < LATE_MORNING) {
  }

  spawnShootingStars(shootingStars, chanceToSpawn, maxNumberOfStars);
  context.lineCap = "round";

  Object.entries(deadShootingStars).forEach(([key, shootingStar]) => {
    shootingStar.update(shootingStar.dissipationSpeed * -1, renderRate);
    drawShootingStar(context, drawFractions, shootingStar);
    if (shootingStar.currentTailLength <= 0) {
      delete deadShootingStars[key];
    }
  });

  Object.entries(shootingStars).forEach(([key, shootingStar]) => {
    shootingStar.update(0.5, renderRate);
    drawShootingStar(context, drawFractions, shootingStar);
    if (shootingStar.age >= shootingStar.duration) {
      deadShootingStars[key] = shootingStar;
      delete shootingStars[key];
    }
  });

  context.lineCap = "butt";
}
