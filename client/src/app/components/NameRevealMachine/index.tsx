"use client";
import React, { useEffect, useRef, useState } from "react";
import ResponsiveCanvas from "../ResposiveCanvas";
import { MountainDayNightSim } from "../MountainDayNightSim";
import { baseWorldSize } from "../MatterSim/consts";
import updateMountainDayNightPhysics from "../MountainDayNightSim/updatePhysics";
import renderMountainDayNightScene from "../MountainDayNightSim/render";
import { baseRotationSpeed, defaultRenderRate } from "../MountainDayNightSim/consts";
import PlayControls from "./PlayControls";

export default function NameRevealMachine() {
  const simulationRef = useRef<MountainDayNightSim>(
    new MountainDayNightSim(updateMountainDayNightPhysics, renderMountainDayNightScene, true, baseWorldSize, baseRotationSpeed)
  );
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const percentScrolled = (scrollY / windowHeight) * windowHeight;
  const [welcomeOpacityClass, setWelcomeOpacityClass] = useState("opacity-0");
  const welcomeOpacityClassTimeoutRef = useRef<NodeJS.Timeout>();

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

  useEffect(() => {
    setWelcomeOpacityClass("opacity-1");
    setTimeout(() => {
      setWelcomeOpacityClass("opacity-0");
    }, 7000);
  }, []);

  return (
    <section className="mountain-range-scene-section">
      <div className={`mountain-range-scene-section__text ${welcomeOpacityClass}`}>
        <h1>Welcome</h1>
        <p>Stay for the meteor shower or scroll to view portfolio</p>
      </div>
      <PlayControls simulationRef={simulationRef} />
      <div className="mountain-range-scene" style={{ top: `${percentScrolled}px` }}>
        <ResponsiveCanvas simulationRef={simulationRef} styles="mountain-range-scene-canvas" />
      </div>
    </section>
  );
}
