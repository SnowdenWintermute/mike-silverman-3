import { perlin1D } from "@/app/utils/perlin";
import { PerlinAttributes } from "@/app/utils/perlin/types";
import { Vector } from "matter-js";
import getRidgelinePointType, { RidglelinePointType } from "./getRidgelinePointType";

export class PeakWithRelativePoints {
  prevSlopes: Vector[] | null = null;
  nextSlopes: Vector[] | null = null;
  prevValley: Vector | null = null;
  nextValley: Vector | null = null;
  constructor(public position: Vector) {}
}

export class Mountain {
  constructor(public ridgelinePoints: Vector[], public peaksWithRelativePoints: PeakWithRelativePoints[], public ridgelinePerlins: number[]) {}
}

export default function createRandomMountan(ridgelinePerlinAttributes: PerlinAttributes, baselineY: number, width: number) {
  const ridgelinePerlins = perlin1D(ridgelinePerlinAttributes);
  const peaksWithRelativePoints: PeakWithRelativePoints[] = [];
  const ridgelinePoints: Vector[] = [];
  let slopeStorage: Vector[] | null = null;
  let valleyStorage: Vector | null = null;
  const { amplitude, numberOfPoints } = ridgelinePerlinAttributes;
  const distBetweenPoints = width / (numberOfPoints - 1);
  const topMountainOffset = amplitude * 1.5;

  let j = 0;
  for (let i = 0; i < numberOfPoints; i += 1) {
    const sampledValue = ridgelinePerlins[i];
    const pointType = getRidgelinePointType(ridgelinePerlins, i);
    const currPoint = { x: j, y: sampledValue + baselineY - amplitude - topMountainOffset };
    ridgelinePoints.push(currPoint);
    const prevPeak = peaksWithRelativePoints[peaksWithRelativePoints.length - 1];
    if (pointType === RidglelinePointType.PEAK) {
      const peak = new PeakWithRelativePoints(currPoint);
      if (prevPeak) peak.prevValley = prevPeak.nextValley;
      else if (valleyStorage) {
        peak.prevValley = valleyStorage;
        valleyStorage = null;
      }
      peak.prevSlopes = slopeStorage;
      slopeStorage = null;
      peaksWithRelativePoints.push(peak);
    } else if (pointType === RidglelinePointType.VALLEY) {
      if (prevPeak) {
        prevPeak.nextValley = currPoint;
        prevPeak.nextSlopes = slopeStorage;
        slopeStorage = null;
      } else valleyStorage = currPoint;
    } else if (pointType === RidglelinePointType.SLOPE) {
      if (!slopeStorage) slopeStorage = [];
      slopeStorage.push(currPoint);
    }
    j += distBetweenPoints;
  }

  return new Mountain(ridgelinePoints, peaksWithRelativePoints, ridgelinePerlins);
}
