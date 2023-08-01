import { MatterSim } from "../MatterSim";
import { EntityShape, EntityType } from "../MatterSim/MatterSimEntities";
import { baseWorldSize } from "../MatterSim/consts";

function initializeSimulation(sim: MatterSim) {
  sim.createRegisteredEntity(
    { x: baseWorldSize.width / 2, y: baseWorldSize.height / 2 },
    EntityType.STATIC,
    { shape: EntityShape.CIRCLE, radius: 50 },
    { static: false }
  );

  const bottomWall = {
    x: baseWorldSize.width / 2,
    y: (baseWorldSize.height / 4) * 3,
    width: baseWorldSize.width / 3,
    height: baseWorldSize.height / 33,
  };

  sim.createRegisteredEntity(
    { x: bottomWall.x, y: bottomWall.y },
    EntityType.STATIC,
    { shape: EntityShape.RECT, width: bottomWall.width, height: bottomWall.height },
    { static: true }
  );
  sim.isInitialized = true;
}

const previousDimensions = { width: 0, height: 0 };
export default function updatePhysics(sim: MatterSim) {
  let canvasDimensionsHaveChanged = false;
  if (previousDimensions.width !== sim.worldSize.width || previousDimensions.height !== sim.worldSize.height) {
    canvasDimensionsHaveChanged = true;
    previousDimensions.width = sim.worldSize.width;
    previousDimensions.height = sim.worldSize.height;
  }
  if (!sim.isInitialized) initializeSimulation(sim);
  else if (canvasDimensionsHaveChanged && sim.shouldReinitializeOnCanvasResize) {
    sim.removeAllEntities();
    initializeSimulation(sim);
  }
}
