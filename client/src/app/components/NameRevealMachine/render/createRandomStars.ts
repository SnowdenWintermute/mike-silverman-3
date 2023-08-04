import { WidthAndHeight } from "@/app/types";
import { getPointInArc, getRectDiagonal, randBetween } from "@/app/utils";
import { Vector } from "matter-js";

export class Star {
  luminosity = 1;
  constructor(public position: Vector, public radius: number, public color: string) {}
}

const starColors = [`#afc9ff`, `#c7d8ff`, `#fff4f3`, `#ffe5cf`, `#ffd9b2`, `#ffc78e`, `#ffa651`];

let generated = false;
const stars: Star[] = [];

export default function createRandomStars(worldSize: WidthAndHeight, numberOfStars: number, spread: number = 100) {
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
    if (shouldBeColoredStar) color = starColors[Math.round(randBetween(0, starColors.length - 1))];
    stars.push(new Star(position, radius, color));
    currAngle += angleIncrement;
  }

  const sunPosition = getPointInArc(center, Math.PI * -1 + 0.7, skyRadius - worldSize.height / 4);
  stars.push(new Star(sunPosition, 100, "yellow"));
  const moonPosition = getPointInArc(center, Math.PI * 2 + 0.7, skyRadius - worldSize.height / 4);
  stars.push(new Star(moonPosition, 40, "aliceblue"));
  generated = true;
  return stars;
}
