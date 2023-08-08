import { Vector } from "matter-js";
import getRidgelinePointType, { RidglelinePointType } from "./getRidgelinePointType";
import { PeakWithRelativePoints } from "./createRandomMountain";

let slopeStorage: Vector[] | null = null;
let valleyStorage: Vector | null = null;

export default function getPeaksAndValleys(perlins: number[], i: number) {
  // const pointType = getRidgelinePointType(perlins, i);
  // const currPoint = { x: j, y: sampledValue + baselineY - amplitude - topMountainOffset };
  // const prevPeak = peaksWithRelativePoints[peaksWithRelativePoints.length - 1];
  // if (pointType === RidglelinePointType.PEAK) {
  //   const peak = new PeakWithRelativePoints(currPoint);
  //   if (prevPeak) peak.prevValley = prevPeak.nextValley;
  //   else if (valleyStorage) {
  //     peak.prevValley = valleyStorage;
  //     valleyStorage = null;
  //   }
  //   peak.prevSlopes = slopeStorage;
  //   slopeStorage = null;
  //   peaksWithRelativePoints.push(peak);
  // } else if (pointType === RidglelinePointType.VALLEY) {
  //   if (prevPeak) {
  //     prevPeak.nextValley = currPoint;
  //     prevPeak.nextSlopes = slopeStorage;
  //     slopeStorage = null;
  //   } else valleyStorage = currPoint;
  // } else if (pointType === RidglelinePointType.SLOPE) {
  //   if (!slopeStorage) slopeStorage = [];
  //   slopeStorage.push(currPoint);
  // }
}
