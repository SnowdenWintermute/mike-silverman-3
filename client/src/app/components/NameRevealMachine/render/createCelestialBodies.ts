import { WidthAndHeight } from "@/app/types";
import { getPointInArc, getRectDiagonal, randBetween } from "@/app/utils";
import { rgba } from "@/app/utils/colors";
import { Vector } from "matter-js";
import { STAR_COLORS, SUN_COLORS } from "./consts";
import { perlin1D } from "@/app/utils/perlin";

export class CelestialBody {
  luminosity = 1;
  constructor(public position: Vector, public radius: number, public color: string) {}
}

let generated = false;
const stars: CelestialBody[] = [];

export default function createCelestialBodies(
  worldSize: WidthAndHeight,
  numberOfStars: number,
  spread: number = 100,
  sunStartAngle: number,
  moonStartAngle: number,
  celestialDiscStartAngle: number
) {
  if (generated) return stars;
  const center = { x: worldSize.width / 2, y: worldSize.height * 2 };

  const skyRadius = getRectDiagonal(worldSize.width / 2, worldSize.height * 2);
  const radiusVariance = spread; // how far a generated star can stray from the skyRadius line

  let currAngle = 0;
  const maxAngle = Math.PI * 2;
  const angleIncrement = maxAngle / numberOfStars;
  for (let i = 0; i < numberOfStars; i += 1) {
    const radiusOffset = randBetween(0, radiusVariance);
    const position = getPointInArc(center, currAngle, skyRadius - radiusOffset);
    const radius = Math.random() * 3;
    const colorStarChanceOneIn = 5;
    const shouldBeColoredStar = randBetween(0, colorStarChanceOneIn) < 1;
    let color = "white";
    if (shouldBeColoredStar) color = STAR_COLORS[Math.round(randBetween(0, STAR_COLORS.length - 1))];
    stars.push(new CelestialBody(position, radius, color));
    currAngle += angleIncrement;
  }

  const milkyWayNumber = 500;
  const numPerlins = milkyWayNumber;
  const perlinAttributes = {
    amplitude: 300,
    numberOfPoints: numPerlins,
    wavelength: 120,
    numberOfOctaves: 4,
  };

  const perlins = perlin1D(perlinAttributes);
  const milkyWaySpread = 350;

  currAngle = celestialDiscStartAngle - Math.PI / 3;
  for (let i = 0; i < milkyWayNumber * 2; i += 1) {
    // const radiusOffset = (i / milkyWayNumber) * (spread - spread / 3) + spread / 3;
    const radiusOffset = ((i % milkyWayNumber) / milkyWayNumber) * (spread * 1.5) - spread * 0.4;
    const position = getPointInArc(center, currAngle, skyRadius - radiusOffset);
    position.x += perlins[i % milkyWayNumber] + Math.random() * milkyWaySpread - milkyWaySpread / 2;
    const radius = Math.random() * 1.5;
    const colorStarChanceOneIn = 5;
    const shouldBeColoredStar = randBetween(0, colorStarChanceOneIn) < 1;
    let color = "lightblue";
    if (shouldBeColoredStar) color = STAR_COLORS[Math.round(randBetween(0, STAR_COLORS.length - 1))];
    stars.push(new CelestialBody(position, radius, color));
  }

  for (let i = 0; i < milkyWayNumber; i += 1) {
    const radiusOffset = (i / milkyWayNumber) * (spread + spread / 4) - spread / 4;
    const position = getPointInArc(center, currAngle, skyRadius - radiusOffset);
    position.x += perlins[i] + (Math.random() * milkyWaySpread) / 3 - milkyWaySpread / 6;
    const radius = Math.random() * 2.1;
    const colorStarChanceOneIn = 5;
    const shouldBeColoredStar = randBetween(0, colorStarChanceOneIn) < 1;
    let color = "white";
    if (shouldBeColoredStar) color = STAR_COLORS[Math.round(randBetween(0, STAR_COLORS.length - 1))];
    stars.push(new CelestialBody(position, radius, color));
  }

  const sunPosition = getPointInArc(center, sunStartAngle, skyRadius - worldSize.height / 4);
  stars.push(new CelestialBody(sunPosition, 100, rgba(SUN_COLORS.WHITE.red, SUN_COLORS.WHITE.green, SUN_COLORS.WHITE.blue)));
  const moonPosition = getPointInArc(center, moonStartAngle, skyRadius - worldSize.height / 4);
  stars.push(new CelestialBody(moonPosition, 40, "aliceblue"));
  generated = true;
  return stars;
}
