import { WidthAndHeight } from "../../FullScreenCanvas";
import drawPoly from "../../FullScreenCanvas/drawPoly";
import { MatterSim } from "../../MatterSim";
import { EntityType } from "../../MatterSim/MatterSimEntities";

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, matterSim: MatterSim) {
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  // drawGrid(context, canvasSize, 25);
  Object.values(matterSim.entities[EntityType.STATIC]).forEach((entity) => {
    drawPoly(context, entity.body.vertices, "grey");
  });
}
