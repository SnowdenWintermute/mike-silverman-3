import { Vector } from "matter-js";
import { MatterSim } from "../../MatterSim";
import { Entity } from "../../MatterSim/Entity";
import { EntityShape, EntityType } from "../../MatterSim/MatterSimEntities";
import drawPoly from "../../ResposiveCanvas/drawPoly";
import drawCircle from "../../ResposiveCanvas/drawCircle";

export default function drawEntities(context: CanvasRenderingContext2D, drawFractions: Vector, sim: MatterSim) {
  const polys: Entity[] = [];
  Object.values(sim.entities[EntityType.STATIC]).forEach((entity) => {
    if (entity.shape === EntityShape.CIRCLE) drawCircle(context, drawFractions, entity.body.position, entity.body.circleRadius!, entity.color, true);
    else if (entity.shape === EntityShape.RECT) drawPoly(context, drawFractions, entity.body.vertices, entity.color);
    else if (entity.shape === EntityShape.POLY) polys.push(entity);
  });
  polys.forEach((entity) => {
    drawPoly(context, drawFractions, entity.body.vertices, entity.color);
  });
}
