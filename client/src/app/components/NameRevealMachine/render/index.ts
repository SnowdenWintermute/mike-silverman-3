import { perlin1D } from "@/app/utils/perlin";
import { MatterSim } from "../../MatterSim";
import { Entity } from "../../MatterSim/Entity";
import { EntityShape, EntityType } from "../../MatterSim/MatterSimEntities";
import { baseWorldSize } from "../../MatterSim/consts";
import { WidthAndHeight } from "../../ResposiveCanvas";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import drawPoly from "../../ResposiveCanvas/drawPoly";

const perlinArray = perlin1D(800, false, 300, 100, 3);

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, sim: MatterSim) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseWorldSize.width,
    y: canvasSize.height / baseWorldSize.height,
  };

  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  context.fillStyle = "white";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(`${canvasSize.width}, ${canvasSize.height}`, 10, 10);
  context.fillText(`${canvasDrawFractions.x.toFixed(1)}, ${canvasDrawFractions.y.toFixed(1)}`, 10, 30);
  context.fillText(`${sim.worldSize.width.toFixed(1)}, ${sim.worldSize.height.toFixed(1)}`, 10, 50);
  const polys: Entity[] = [];
  Object.values(sim.entities[EntityType.STATIC]).forEach((entity) => {
    if (entity.shape === EntityShape.CIRCLE) drawCircle(context, canvasDrawFractions, entity.body.position, entity.body.circleRadius!, entity.color, true);
    else if (entity.shape === EntityShape.RECT) drawPoly(context, canvasDrawFractions, entity.body.vertices, entity.color);
    else if (entity.shape === EntityShape.POLY) polys.push(entity);
  });
  polys.forEach((entity) => {
    drawPoly(context, canvasDrawFractions, entity.body.vertices, entity.color);
  });

  context.strokeStyle = "grey";
  context.beginPath();
  const baselineY = 0;
  context.moveTo(0, 800);
  perlinArray.forEach((value, i) => {
    if (i === 0) return;
    context.lineTo(i, baselineY + value / 2);
    context.lineTo(i, 9999);
  });
  context.stroke();
}
