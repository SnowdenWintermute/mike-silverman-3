import { WidthAndHeight } from "@/app/types";
import { perlin1D } from "@/app/utils/perlin";
import { Vector } from "matter-js";

export default function createSineWaveMountain(dimensions: WidthAndHeight) {
  // CREATE BASE SINE WAVE
  const sineWavePoints: Vector[] = [];
  const yOffset = dimensions.height / 2;
  const amplitude = dimensions.height / 2;
  const numCycles = 1;
  const wavelength = (2 * Math.PI) / (dimensions.width / numCycles);
  const numPoints = 100;
  const spaceBetweenPoints = dimensions.width / numPoints;
  const frequency = Math.PI / 2;

  for (let x = 0; x <= dimensions.width; x += spaceBetweenPoints) sineWavePoints.push({ x, y: yOffset + Math.sin(x * wavelength + frequency) * amplitude });

  // PERLINS
  const perlinAttributesA = {
    amplitude: 100,
    numberOfPoints: numPoints,
    wavelength: 3,
    numberOfOctaves: 3,
  };

  const perlins = perlin1D(perlinAttributesA);
  sineWavePoints.forEach((point, i) => {
    const normalizedPerlin = perlins[i] - perlinAttributesA.amplitude / 2;
    // if (point.y >= dimensions.height - dimensions.height / 10) point.y += perlins[i];
    // point.y += perlins[i];
    point.y += normalizedPerlin;
  });

  return sineWavePoints;
}
