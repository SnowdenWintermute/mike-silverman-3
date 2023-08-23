"use client";
import React, { useEffect, useRef, useState } from "react";
import ResponsiveCanvas from "../ResposiveCanvas";
import { MountainDayNightSim } from "../MountainDayNightSim";
import { baseWorldSize } from "../MatterSim/consts";
import updateMountainDayNightPhysics from "../MountainDayNightSim/updatePhysics";
import renderMountainDayNightScene from "../MountainDayNightSim/render";
import { baseRotationSpeed, defaultRenderRate } from "../MountainDayNightSim/consts";
import PlayControls from "./PlayControls";
import { WidthAndHeight } from "@/app/types";

export default function NameRevealMachine() {
  const simulationRef = useRef<MountainDayNightSim>(
    new MountainDayNightSim(updateMountainDayNightPhysics, renderMountainDayNightScene, true, baseWorldSize, baseRotationSpeed)
  );
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const percentScrolled = (scrollY / windowHeight) * windowHeight;
  const [welcomeOpacityClass, setWelcomeOpacityClass] = useState("opacity-0");
  const welcomeOpacityClassTimeoutRef = useRef<NodeJS.Timeout>();
  const contextRef = useRef<CanvasRenderingContext2D>(null);
  const canvasSizeRef = useRef<WidthAndHeight>(null);

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
    if (percentScrolled < 0.9) setWelcomeOpacityClass("opacity-0");
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
    welcomeOpacityClassTimeoutRef.current = setTimeout(() => {
      setWelcomeOpacityClass("opacity-0");
    }, 5000);

    return () => clearTimeout(welcomeOpacityClassTimeoutRef.current);
  }, []);

  return (
    <section className="mountain-range-scene-section">
      <div className={`mountain-range-scene-section__text ${welcomeOpacityClass}`}>
        <h1>Welcome</h1>
        <p>Stay for the meteor shower or scroll to view portfolio</p>
      </div>
      <PlayControls simulationRef={simulationRef} contextRef={contextRef} canvasSizeRef={canvasSizeRef} />
      <div className="mountain-range-scene" style={{ top: `${percentScrolled}px` }}>
        <ResponsiveCanvas simulationRef={simulationRef} contextRef={contextRef} parentCanvasSizeRef={canvasSizeRef} styles="mountain-range-scene-canvas" />
      </div>
    </section>
  );
}
