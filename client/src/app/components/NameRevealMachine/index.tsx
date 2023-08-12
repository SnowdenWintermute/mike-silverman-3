import React, { useEffect, useRef } from "react";
import { MatterSim } from "../MatterSim";
import render from "./render";
import updatePhysics from "./updatePhysics";
import ResponsiveCanvas from "../ResposiveCanvas";

const NameRevealMachine = () => {
  const simulationRef = useRef<MatterSim>(new MatterSim(updatePhysics, render, true));

  return (
    <section className="mountain-range-scene">
      <ResponsiveCanvas simulationRef={simulationRef} styles="mountain-range-scene-canvas" />
    </section>
  );
};

export default NameRevealMachine;
