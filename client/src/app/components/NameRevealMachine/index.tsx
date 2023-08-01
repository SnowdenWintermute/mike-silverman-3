import React, { useEffect, useRef } from "react";
import FullScreenCanvas from "../FullScreenCanvas";
import { MatterSim } from "../MatterSim";
import render from "./render";
import updatePhysics from "./updatePhysics";
import { EntityShape, EntityType } from "../MatterSim/MatterSimEntities";

const index = () => {
  const simulationRef = useRef<MatterSim>(new MatterSim(updatePhysics, render));
  useEffect(() => {
    simulationRef.current.createRegisteredEntity({ x: 100, y: 100 }, EntityType.STATIC, { shape: EntityShape.CIRCLE, radius: 20 }, {});
  }, []);
  return <FullScreenCanvas simulationRef={simulationRef} />;
};

export default index;
