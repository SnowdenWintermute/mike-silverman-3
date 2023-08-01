import React, { useEffect, useRef } from "react";
import { MatterSim } from "../MatterSim";
import render from "./render";
import updatePhysics from "./updatePhysics";
import { EntityShape, EntityType } from "../MatterSim/MatterSimEntities";
import ResponsiveCanvas from "../ResposiveCanvas";

const index = () => {
  const simulationRef = useRef<MatterSim>(new MatterSim(updatePhysics, render));
  useEffect(() => {
    simulationRef.current.createRegisteredEntity({ x: 100, y: 100 }, EntityType.STATIC, { shape: EntityShape.CIRCLE, radius: 50 }, { static: true });
  }, []);
  return (
    <div className="name-reveal-machine">
      <ResponsiveCanvas simulationRef={simulationRef} />
    </div>
  );
};

export default index;
