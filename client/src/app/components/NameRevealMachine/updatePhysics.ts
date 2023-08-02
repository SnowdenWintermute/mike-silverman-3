import { MatterSim } from "../MatterSim";

function initializeSimulation(sim: MatterSim) {
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
