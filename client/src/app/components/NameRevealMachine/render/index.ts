import { WidthAndHeight } from "@/app/types";
import { MatterSim } from "../../MatterSim";
import { baseWorldSize } from "../../MatterSim/consts";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import drawMountains from "./drawMountains";
import drawDebug from "./drawDebug";
import drawStars from "./drawStars";

let rotation = 0;
export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  rotation += 0.0005;
  rotation = rotation % (Math.PI * 2);
  drawStars(context, canvasDrawFractions, rotation);

  drawMountains(context, canvasSize);
  // drawCircle(context, canvasDrawFractions, { x: 1600, y: 80 }, 40, "yellow", true);

  // drawDebug(context, canvasDrawFractions, canvasSize, sim);
}
