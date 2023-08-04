import { cosineInterpolate, linearInterpolate } from "./interpolate";
import linearCongruentialGeneratorPRNG from "./linearCongruentialGeneratorPRNG";
import { PerlinAttributes } from "./types";

export function perlin(xStart: number, xEnd: number, useLerp = false, amplitude: number = 100, wavelength: number = 100) {
  const result: number[] = [];
  let a = linearCongruentialGeneratorPRNG();
  let b = linearCongruentialGeneratorPRNG();
  let x = xStart;
  while (x < xEnd) {
    if (x % wavelength === 0) {
      a = b;
      b = linearCongruentialGeneratorPRNG();
      result.push(a * amplitude);
    } else {
      if (useLerp) result.push(linearInterpolate(a, b, (x % wavelength) / wavelength) * amplitude);
      else result.push(cosineInterpolate(a, b, (x % wavelength) / wavelength) * amplitude);
    }
    x += 1;
  }
  return result;
}

function perlinOctaves(useLerp: boolean, amplitude: number, wavelength: number, numberOfOctaves: number, numberOfPoints: number, divisor = 2) {
  var result: number[][] = [];
  for (var i = 0; i < numberOfOctaves; i++) {
    const generated = perlin(0, numberOfPoints, useLerp, amplitude, wavelength);
    result.push(generated);
    amplitude /= divisor;
    wavelength /= divisor;
  }
  return result;
}

//combines octaves together
function combinePerlinOctaves(octaves: number[][]) {
  const result: number[] = [];
  for (var i = 0, total = 0, j = 0; i < octaves[0].length; i++) {
    total = 0;
    for (j = 0; j < octaves.length; j++) {
      total += octaves[j][i];
    }
    result.push(total);
  }
  return result;
}

export function perlin1D(attributes: PerlinAttributes, divisor = 2) {
  const { amplitude, numberOfPoints, wavelength, numberOfOctaves, useLerp } = attributes;
  const octaves = perlinOctaves(!!useLerp, amplitude, wavelength, numberOfOctaves, numberOfPoints, divisor);
  return combinePerlinOctaves(octaves);
}
