import { MatterSim } from "../../MatterSim";
import { EntityType } from "../../MatterSim/MatterSimEntities";
import { baseCanvasDimensions } from "../../MatterSim/consts";
import { WidthAndHeight } from "../../ResposiveCanvas";
import drawCircle from "../../ResposiveCanvas/drawCircle";

export default function render(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, matterSim: MatterSim) {
  const canvasDrawFractions = {
    x: canvasSize.width / baseCanvasDimensions.width,
    y: canvasSize.height / baseCanvasDimensions.height,
  };

  context.clearRect(0, 0, canvasSize.width, canvasSize.height);
  context.fillStyle = "white";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(`${canvasSize.width}, ${canvasSize.height}`, 10, 10);
  context.fillText(`${canvasDrawFractions.x.toFixed(1)}, ${canvasDrawFractions.y.toFixed(1)}`, 10, 30);
  // drawGrid(context, canvasSize, 25);
  Object.values(matterSim.entities[EntityType.STATIC]).forEach((entity) => {
    drawCircle(context, canvasDrawFractions, entity.body.position, entity.body.circleRadius!, "grey", true);
  });
}
