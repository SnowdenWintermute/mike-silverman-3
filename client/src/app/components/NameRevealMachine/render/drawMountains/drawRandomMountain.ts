import { WidthAndHeight } from "@/app/types";
import { PerlinAttributes } from "@/app/utils/perlin/types";
import { Vector } from "matter-js";
import getRidgelinePointType, { RidglelinePointType } from "./getRidgelinePointType";
import drawArc from "@/app/components/ResposiveCanvas/unresponsiveArc";
import drawMountainShadows from "./drawMountainShadows";

export class PeakWithRelativePoints {
  prevSlopes: Vector[] | null = null;
  nextSlopes: Vector[] | null = null;
  prevValley: Vector | null = null;
  nextValley: Vector | null = null;
  constructor(public position: Vector) {}
}

export default function drawRandomMountain(
  context: CanvasRenderingContext2D,
  canvasSize: WidthAndHeight,
  perlinAttributes: PerlinAttributes,
  perlins: number[],
  fillColor: string,
  yOffsetFromCenter = 0
) {
  const { amplitude, numberOfPoints } = perlinAttributes;
  const baselineY = canvasSize.height / 2 + amplitude + yOffsetFromCenter;
  const distBetweenPoints = canvasSize.width / (numberOfPoints - 1);
  const topMountainOffset = amplitude * 1.5;
  context.moveTo(0, baselineY - amplitude - topMountainOffset);
  context.beginPath();

  let j = 0;
  const peaksWithRelativePoints: PeakWithRelativePoints[] = [];
  let slopeStorage: Vector[] | null = null;
  let valleyStorage: Vector | null = null;
  for (let i = 0; i < numberOfPoints; i += 1) {
    const sampledValue = perlins[i];
    // GET PEAKS AND VALLEYS
    const pointType = getRidgelinePointType(perlins, i);
    const currPoint = { x: j, y: sampledValue + baselineY - amplitude - topMountainOffset };
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

    // DRAW RIDGELINE
    context.lineTo(j, sampledValue + baselineY - amplitude - topMountainOffset);
    j += distBetweenPoints;
  }

  // FILL MOUNTAIN ------
  context.lineTo(canvasSize.width, canvasSize.height);
  context.lineTo(0, canvasSize.height);
  context.lineTo(0, perlins[0] + baselineY - amplitude - topMountainOffset);
  context.closePath();
  context.save();
  context.clip();
  context.fillStyle = fillColor;
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  context.restore();
  // --------------------
  //

  peaksWithRelativePoints.forEach((item) => {
    drawMountainShadows(context, canvasSize, item, perlins);
  });
}
