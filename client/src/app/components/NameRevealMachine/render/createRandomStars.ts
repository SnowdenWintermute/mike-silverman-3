import { WidthAndHeight } from "@/app/types";
import { getPointInArc, randBetween } from "@/app/utils";
import { Vector } from "matter-js";

export class Star {
  luminosity = 1;
  constructor(public position: Vector, public radius: number, public color: string) {}
}

let generated = false;
const stars: Star[] = [];
export default function createRandomStars(canvasSize: WidthAndHeight, numberOfStars: number, spread: number = 100) {
  if (generated) return stars;
  const center = { x: canvasSize.width / 2, y: canvasSize.height * 2 };
  const skyRadius = canvasSize.height * 2;
  const radiusVariance = spread; // how far a generated star can stray from the skyRadius line

  let currAngle = 0;
  const maxAngle = Math.PI * 2;
  const angleIncrement = maxAngle / numberOfStars;
  for (let i = 0; i < numberOfStars; i += 1) {
    const radiusOffset = randBetween(-radiusVariance, radiusVariance);
    const position = getPointInArc(center, currAngle, radiusOffset + skyRadius);
    // const radius = randBetween(1, 2);
    const radius = Math.random();
    stars.push(new Star(position, radius, "white"));
    currAngle += angleIncrement;
  }
  generated = true;
  return stars;
}
