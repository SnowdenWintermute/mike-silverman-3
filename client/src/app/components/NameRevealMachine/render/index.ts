import { MatterSim } from "../../MatterSim";
import { EntityShape, EntityType } from "../../MatterSim/MatterSimEntities";
import { baseWorldSize } from "../../MatterSim/consts";
import { WidthAndHeight } from "../../ResposiveCanvas";
import drawCircle from "../../ResposiveCanvas/drawCircle";
import drawPoly from "../../ResposiveCanvas/drawPoly";

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
  Object.values(sim.entities[EntityType.STATIC]).forEach((entity) => {
    if (entity.shape === EntityShape.CIRCLE) drawCircle(context, canvasDrawFractions, entity.body.position, entity.body.circleRadius!, "grey", true);
    else if (entity.shape === EntityShape.RECT) drawPoly(context, canvasDrawFractions, entity.body.vertices, "grey");
  });
}
