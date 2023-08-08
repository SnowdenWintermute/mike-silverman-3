import { Vector } from "matter-js";
import drawMountainShadows from "./drawMountainShadows";
import { Mountain, PeakWithRelativePoints } from "./createRandomMountain";
import { baseWorldSize } from "@/app/components/MatterSim/consts";
import drawCircle from "@/app/components/ResposiveCanvas/drawCircle";

export default function drawMountain(context: CanvasRenderingContext2D, drawFractions: Vector, mountain: Mountain, fillColor: string) {
  const { peaksWithRelativePoints, ridgelinePoints, ridgelinePerlins } = mountain;
  context.moveTo(ridgelinePoints[0].x, ridgelinePoints[0].y);
  context.beginPath();
  ridgelinePoints.forEach((point) => {
    context.lineTo(point.x * drawFractions.x, point.y * drawFractions.y);
  });
  context.lineTo(baseWorldSize.width * drawFractions.x, baseWorldSize.height * drawFractions.y);
  context.lineTo(0, baseWorldSize.height * drawFractions.y);
  context.lineTo(ridgelinePoints[0].x, ridgelinePoints[0].y);
  context.closePath();
  context.save();
  context.clip();
  context.fillStyle = fillColor;
  context.fillRect(0, 0, baseWorldSize.width * drawFractions.x, baseWorldSize.height * drawFractions.y);
  context.restore();

  // peaksWithRelativePoints.forEach((item) => {
  //   drawCircle(context, drawFractions, item.position, 30, "cyan", false);
  //   // drawMountainShadows(context, canvasSize, item, perlins);
  // });
}
