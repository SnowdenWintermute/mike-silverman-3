import drawArc from "@/app/components/ResposiveCanvas/unresponsiveArc";
import { PeakWithRelativePoints } from "./drawRandomMountain";
import { WidthAndHeight } from "@/app/types";
import { perlin1D } from "@/app/utils/perlin";
import { distBetweenTwoPoints } from "@/app/utils";

const perlinAttributesA = {
  amplitude: 50,
  numberOfPoints: 30,
  wavelength: 3,
  numberOfOctaves: 3,
};

const perlins = perlin1D(perlinAttributesA);
export default function drawMountainShadows(
  context: CanvasRenderingContext2D,
  canvasSize: WidthAndHeight,
  item: PeakWithRelativePoints,
  perlinsNotUsed: number[]
) {
  const { prevSlopes, prevValley, nextSlopes, nextValley, position } = item;
  const { x, y } = position;

  if (!prevValley) return;
  context.moveTo(prevValley.x, prevValley.y);
  context.beginPath();
  if (prevSlopes)
    prevSlopes.forEach((slope, i) => {
      context.lineTo(slope.x, slope.y);
    });
  let currLinePosition = { x, y };
  context.lineTo(currLinePosition.x, currLinePosition.y);

  const distPeakToFloor = canvasSize.height - y;
  let distBetweenPerlinPoints = distPeakToFloor / perlins.length;
  let j = y;
  for (let i = 0; i < perlins.length; i += 1) {
    j += distBetweenPerlinPoints;
    // const proposedX = x + perlins[i]/4

    currLinePosition = { x: x + perlins[i] / 4, y: j };
    context.lineTo(currLinePosition.x, currLinePosition.y);
  }

  // context.lineTo(x, canvasSize.height);

  context.lineTo(prevValley.x, prevValley.y);
  context.closePath();
  context.fillStyle = "black";
  context.fill();
  context.strokeStyle = "darkslateblue";
  context.stroke();
}
