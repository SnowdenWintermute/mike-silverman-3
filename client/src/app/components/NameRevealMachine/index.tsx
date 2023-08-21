"use client";
import React, { useEffect, useRef, useState } from "react";
import ResponsiveCanvas from "../ResposiveCanvas";
import { MountainDayNightSim } from "../MountainDayNightSim";
import { baseWorldSize } from "../MatterSim/consts";
import updateMountainDayNightPhysics from "../MountainDayNightSim/updatePhysics";
import renderMountainDayNightScene from "../MountainDayNightSim/render";
import { baseRotationSpeed, defaultRenderRate } from "../MountainDayNightSim/consts";

export default function NameRevealMachine() {
  const simulationRef = useRef<MountainDayNightSim>(
    new MountainDayNightSim(updateMountainDayNightPhysics, renderMountainDayNightScene, true, baseWorldSize, baseRotationSpeed)
  );
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const percentScrolled = (scrollY / windowHeight) * windowHeight;

  useEffect(() => {
    const percentScrolled = 1 - window.scrollY / window.innerHeight;
    setScrollY(window.scrollY);
    setWindowHeight(window.innerHeight);
    const rotationSpeedBasedOnPercentScrolled = baseRotationSpeed * percentScrolled;
    simulationRef.current.rotationSpeed = rotationSpeedBasedOnPercentScrolled;
    simulationRef.current.scrollPercent = percentScrolled;
  }, [window]);

  const handleScroll = () => {
    const percentScrolled = 1 - window.scrollY / window.innerHeight;
    setScrollY(window.scrollY);
    setWindowHeight(window.innerHeight);
    const rotationSpeedBasedOnPercentScrolled = baseRotationSpeed * percentScrolled;
    simulationRef.current.rotationSpeed = rotationSpeedBasedOnPercentScrolled;
    simulationRef.current.scrollPercent = percentScrolled;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window]);

  return (
    <section className="mountain-range-scene" style={{ top: `${percentScrolled}px` }}>
      <ResponsiveCanvas simulationRef={simulationRef} styles="mountain-range-scene-canvas" />
    </section>
  );
}
