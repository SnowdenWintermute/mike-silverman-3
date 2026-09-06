import { Vector } from "matter-js";
import { Ridgeline } from "./createRidgeline";

export default function drawRidgeline(context: CanvasRenderingContext2D, drawFractions: Vector, mountain: Ridgeline, fillColor: string) {
  context.save();
  context.scale(drawFractions.x, drawFractions.y);
  context.fillStyle = fillColor;
  context.fill(mountain.path);
  context.restore();
}
