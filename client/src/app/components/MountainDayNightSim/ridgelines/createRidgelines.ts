import { WidthAndHeight } from "@/app/types";
import createRidgeline, { Ridgeline } from "./createRidgeline";

export default function createRidgelines(worldSize: WidthAndHeight) {
  const perlinAttributes = {
    amplitude: 50,
    numberOfPoints: 30,
    wavelength: 3,
    numberOfOctaves: 4,
  };

  const ridgelines: Ridgeline[] = [];

  const numRidgelines = 3;
  const spaceBetweenRidgelines = worldSize.height / 8;
  const baseOffsetFromCenter = (spaceBetweenRidgelines / 2) * -1;
  // const baseOffsetFromCenter = 0;
  for (let i = 0; i < numRidgelines; i += 1) {
    const baselineY = worldSize.height / 2 + perlinAttributes.amplitude + baseOffsetFromCenter + i * spaceBetweenRidgelines;
    ridgelines.push(createRidgeline(perlinAttributes, baselineY, worldSize.width));
    perlinAttributes.amplitude += 70;
    // perlinAttributes.wavelength += 1;
  }

  return ridgelines;
}
