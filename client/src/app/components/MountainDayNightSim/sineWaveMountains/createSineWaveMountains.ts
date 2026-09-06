import { randBetween } from "@/app/utils";
import createSineWaveMountain from "./createSineWaveMountain";
import { SineWaveMountain } from "./createSineWaveMountain";
import { baseWorldSize } from "@/app/components/MatterSim/consts";

// mountains are sized as a fraction of the world, so a smaller divisor makes a larger mountain
const largestMountainSizeDivisor = 1.5;
const smallestMountainSizeDivisor = 2.5;

const mountainWidthRange = {
  min: baseWorldSize.width / smallestMountainSizeDivisor,
  max: baseWorldSize.width / largestMountainSizeDivisor,
};
const mountainHeightRange = {
  min: baseWorldSize.height / smallestMountainSizeDivisor,
  max: baseWorldSize.height / largestMountainSizeDivisor,
};
const mountainJaggednessRange = { min: 30, max: 75 };

function intersectsCanvas(mountain: SineWaveMountain) {
  let minX = Infinity;
  let maxX = -Infinity;
  for (const point of mountain.ridgeline) {
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;
  }
  return maxX >= 0 && minX <= baseWorldSize.width;
}

export default function createSineWaveMountains(numMountains: number) {
  const sineMountains: SineWaveMountain[] = [];
  const spaceBetweenMountains = baseWorldSize.width / numMountains;
  // a mountain placed this far left is still wide enough to reach x=0, so it can show at the edge.
  // Anything further left never touches the canvas.
  const firstIndexReachingCanvas = -Math.ceil(mountainWidthRange.max / spaceBetweenMountains);

  for (let i = firstIndexReachingCanvas; i < numMountains; i += 1) {
    const mountain = createSineWaveMountain(
      { width: randBetween(mountainWidthRange.min, mountainWidthRange.max), height: randBetween(mountainHeightRange.min, mountainHeightRange.max) },
      spaceBetweenMountains * i,
      baseWorldSize.height / 2.7 + randBetween(0, baseWorldSize.height / 2),
      randBetween(mountainJaggednessRange.min, mountainJaggednessRange.max)
    );
    // the leftmost indices only reach the canvas if they roll a wide enough width
    if (intersectsCanvas(mountain)) sineMountains.push(mountain);
  }

  sineMountains.sort((a, b) => (a.yOffset > b.yOffset ? 1 : -1));
  return sineMountains;
}
