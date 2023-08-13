import React, { useEffect, useRef, useState } from "react";
import ResponsiveCanvas from "../ResposiveCanvas";
import { MountainDayNightSim } from "../MountainDayNightSim";
import { baseWorldSize } from "../MatterSim/consts";
import updateMountainDayNightPhysics from "../MountainDayNightSim/updatePhysics";
import renderMountainDayNightScene from "../MountainDayNightSim/render";
import { baseRotationSpeed } from "../MountainDayNightSim/consts";

const NameRevealMachine = () => {
  const simulationRef = useRef<MountainDayNightSim>(
    new MountainDayNightSim(updateMountainDayNightPhysics, renderMountainDayNightScene, true, baseWorldSize, baseRotationSpeed)
  );
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const percentScrolled = (scrollY / windowHeight) * windowHeight;

  const handleScroll = () => {
    const percentScrolled = 1 - window.scrollY / window.innerHeight;
    setScrollY(window.scrollY);
    setWindowHeight(window.innerHeight);
    const rotationSpeedBasedOnPercentScrolled = baseRotationSpeed * percentScrolled;
    simulationRef.current.rotationSpeed = rotationSpeedBasedOnPercentScrolled;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const gradient = `linear-gradient(hsla(${skyColor.h}, ${skyColor.s}%, ${skyColor.l}%, 0.0), hsl(${skyColor.h}, ${skyColor.s}%, ${skyColor.l}%))`;

  return (
    <section className="mountain-range-scene" style={{ top: `${percentScrolled}px` }}>
      <ResponsiveCanvas simulationRef={simulationRef} styles="mountain-range-scene-canvas" />
    </section>
  );
};

export default NameRevealMachine;
