import React, { useEffect, useRef } from "react";
import { MatterSim } from "../MatterSim";
import render from "./render";
import updatePhysics from "./updatePhysics";
import ResponsiveCanvas from "../ResposiveCanvas";

const NameRevealMachine = () => {
  const simulationRef = useRef<MatterSim>(new MatterSim(updatePhysics, render, true));

  return (
    <section className="name-reveal-machine">
      <ResponsiveCanvas simulationRef={simulationRef} />
    </section>
  );
};

export default NameRevealMachine;
