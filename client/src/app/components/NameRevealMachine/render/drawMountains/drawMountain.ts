import { WidthAndHeight } from "@/app/types";
import { PerlinAttributes } from "@/app/utils/perlin/types";
import { Vector } from "matter-js";
import getRidgelinePointType, { RidglelinePointType } from "./getRidgelinePointType";
import drawArc from "@/app/components/ResposiveCanvas/unresponsiveArc";
import drawMountainShadows from "./drawMountainShadows";
import { PeakWithRelativePoints } from "./createRandomMountain";

export default function drawMountain(context: CanvasRenderingContext2D, mountain: PeakWithRelativePoints, fillColor: string) {
  // const { amplitude, numberOfPoints } = perlinAttributes;
  // const baselineY = canvasSize.height / 2 + amplitude + yOffsetFromCenter;
  // const distBetweenPoints = canvasSize.width / (numberOfPoints - 1);
  // const topMountainOffset = amplitude * 1.5;
  // context.moveTo(0, baselineY - amplitude - topMountainOffset);
  // context.beginPath();
  // // FILL MOUNTAIN ------
  // context.lineTo(canvasSize.width, canvasSize.height);
  // context.lineTo(0, canvasSize.height);
  // context.lineTo(0, perlins[0] + baselineY - amplitude - topMountainOffset);
  // context.closePath();
  // context.save();
  // context.clip();
  // context.fillStyle = fillColor;
  // context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  // context.restore();
  // --------------------
  //
  // peaksWithRelativePoints.forEach((item) => {
  //   drawMountainShadows(context, canvasSize, item, perlins);
  // });
}
