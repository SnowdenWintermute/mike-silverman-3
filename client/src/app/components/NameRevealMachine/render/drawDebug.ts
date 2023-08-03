import { Vector } from "matter-js";
import { MatterSim } from "../../MatterSim";
import { WidthAndHeight } from "@/app/types";

export default function drawDebug(context: CanvasRenderingContext2D, drawFractions: Vector, canvasSize: WidthAndHeight, sim: MatterSim) {
  context.fillStyle = "white";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(`${canvasSize.width}, ${canvasSize.height}`, 10, 10);
  context.fillText(`${drawFractions.x.toFixed(1)}, ${drawFractions.y.toFixed(1)}`, 10, 30);
  context.fillText(`${sim.worldSize.width.toFixed(1)}, ${sim.worldSize.height.toFixed(1)}`, 10, 50);
}
