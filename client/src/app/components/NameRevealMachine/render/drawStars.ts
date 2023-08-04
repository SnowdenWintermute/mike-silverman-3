import { Vector } from "matter-js";
import { baseWorldSize } from "../../MatterSim/consts";
import createRandomStars from "./createRandomStars";
import drawCircle from "../../ResposiveCanvas/drawCircle";

const stars = createRandomStars(baseWorldSize, 1000, baseWorldSize.height * 0.75);

export default function drawStars(context: CanvasRenderingContext2D, drawFractions: Vector, rotation: number) {
  stars.forEach((star) => {
    const rotatedPosition = Vector.rotateAbout(star.position, rotation, { x: baseWorldSize.width / 2, y: baseWorldSize.height * 2 });
    drawCircle(context, drawFractions, rotatedPosition, star.radius, star.color, true);
  });
}
