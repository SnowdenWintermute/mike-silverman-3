import { WidthAndHeight } from "@/app/types";
import { MatterSim } from "../../MatterSim";
import { baseWorldSize } from "../../MatterSim/consts";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import drawMountains from "./drawMountains";
import drawDebug from "./drawDebug";
import createRandomStars from "./createRandomStars";

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim) {
  const stars = createRandomStars(canvasSize, 1000, 100);
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);

  if (stars)
    stars.forEach((star) => {
      drawCircle(context, { x: 1, y: 1 }, star.position, star.radius, star.color, true);
    });
  // MOUNTAINS
  drawMountains(context, canvasSize);
  drawCircle(context, canvasDrawFractions, { x: 1600, y: 80 }, 40, "yellow", true);

  // context.moveTo(canvasSize.width/2, canvasSize.height *2);
  // context.beginPath();
  // context.arc(canvasSize.width / 2, canvasSize.height * 2, canvasSize.height * 2, Math.PI * 2, 0);
  // context.strokeStyle = "red";
  // context.lineWidth = 5;
  // context.stroke();
  // context.closePath();

  drawDebug(context, canvasDrawFractions, canvasSize, sim);
}
