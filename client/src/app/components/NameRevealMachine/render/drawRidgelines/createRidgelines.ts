import { WidthAndHeight } from "@/app/types";
import createRidgeline, { Ridgeline } from "./createRidgeline";

export default function createRidgelines(worldSize: WidthAndHeight) {
  const perlinAttributes = {
    amplitude: 50,
    numberOfPoints: 30,
    wavelength: 3,
    numberOfOctaves: 3,
  };
  // const mountainFGRidgelineAttributes = {
  //   amplitude: 220,
  //   numberOfPoints: 30,
  //   wavelength: 8,
  //   numberOfOctaves: 4,
  //   useLerp: false,
  // };

  const ridgelines: Ridgeline[] = [];

  const numRidgelines = 4;
  const spaceBetweenRidgelines = worldSize.height / 6;
  const baseOffsetFromCenter = spaceBetweenRidgelines * -1.3;
  for (let i = 0; i < numRidgelines; i += 1) {
    const baselineY = worldSize.height / 2 + perlinAttributes.amplitude + baseOffsetFromCenter + i * spaceBetweenRidgelines;
    ridgelines.push(createRidgeline(perlinAttributes, baselineY, worldSize.width));
    perlinAttributes.amplitude += 80;
  }

  return ridgelines;
}
