import { Vector } from "matter-js";

export default function drawPoly(context: CanvasRenderingContext2D, drawFractions: Vector, vertices: Vector[], color: string) {
  context.fillStyle = color;
  context.beginPath();
  vertices.forEach((vertex, i) => {
    // console.log(vertex.x, vertex.y);
    if (i === 0) context.moveTo(vertex.x * drawFractions.x, vertex.y * drawFractions.y);
    else context.lineTo(vertex.x * drawFractions.x, vertex.y * drawFractions.y);
  });
  context.closePath();
  context.fill();
}
