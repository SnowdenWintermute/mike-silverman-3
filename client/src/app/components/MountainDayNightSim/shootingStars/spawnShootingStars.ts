import { baseWorldSize } from "@/app/components/MatterSim/consts";
import { ShootingStar } from "./ShootingStar";
import { randBetween, randIntBetween } from "@/app/utils";

let lastStarCreatedId = 0;
export default function spawnShootingStars(shootingStars: { [key: string]: ShootingStar }, chanceToSpawn: number, maxNumberOfStars: number) {
  const shouldSpawnStar = Math.random() < chanceToSpawn && Object.keys(shootingStars).length < maxNumberOfStars;
  const spawnHeightRange = { min: -350, max: -100 };
  const sizeRange = { min: 1, max: 5 };
  const durationRange = { min: 100, max: 400 };
  const speedRange = { min: 0.3, max: 0.8 };
  const accelerationRange = { min: 0.01, max: 0.05 };
  const angleRange = { min: 1.8, max: 2.2 };
  if (shouldSpawnStar) {
    const position = { x: Math.random() * (baseWorldSize.width + baseWorldSize.width / 2), y: Math.random() * spawnHeightRange.min + spawnHeightRange.max };
    const angle = randBetween(angleRange.min, angleRange.max);
    const size = randIntBetween(sizeRange.min, sizeRange.max);
    const duration = randIntBetween(durationRange.min, durationRange.max);
    const speed = randBetween(speedRange.min, speedRange.max);
    const acceleration = randBetween(accelerationRange.min, accelerationRange.max);
    shootingStars[lastStarCreatedId++] = new ShootingStar(position, angle, size, duration, speed, acceleration);
  }
}
