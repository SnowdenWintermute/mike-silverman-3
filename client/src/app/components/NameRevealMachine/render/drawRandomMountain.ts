import { WidthAndHeight } from "@/app/types";
import { PerlinAttributes } from "@/app/utils/perlin/types";

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
  for (let i = 0; i < numberOfPoints; i += 1) {
    const sampledValue = perlins[i];
    context.lineTo(j, sampledValue + baselineY - amplitude - topMountainOffset);
    j += distBetweenPoints;
  }

  context.lineTo(canvasSize.width, canvasSize.height);
  context.lineTo(0, canvasSize.height);
  context.lineTo(0, perlins[0] + baselineY - amplitude - topMountainOffset);

  context.closePath();
  context.save();
  context.clip();
  context.fillStyle = fillColor;
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  context.restore();
}
