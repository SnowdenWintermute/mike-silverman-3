import { Vector } from "matter-js";
import { Mountain } from "./createRandomMountain";
import drawMountain from "./drawMountain";
import { RGBColor } from "@/app/utils/colors";

export default function drawMountains(context: CanvasRenderingContext2D, drawFractions: Vector, mountains: { [mountain: string]: Mountain }) {
  drawMountain(context, drawFractions, Object.values(mountains)[0], "#071c08");
  drawMountain(context, drawFractions, Object.values(mountains)[1], "#274c28");
}
