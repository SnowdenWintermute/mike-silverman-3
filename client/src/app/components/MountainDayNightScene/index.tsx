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
import Snow from "../Snow/Snow";

export default function MountainDayNightScene() {
  const simulationRef = useRef<MountainDayNightSim>(
    new MountainDayNightSim(updateMountainDayNightPhysics, renderMountainDayNightScene, true, baseWorldSize, baseRotationSpeed)
  );
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const percentScrolled = (scrollY / windowHeight) * windowHeight;
  const [welcomeOpacityClass, setWelcomeOpacityClass] = useState("opacity-0");
  const welcomeOpacityClassTimeoutRef = useRef<NodeJS.Timeout>();
  const contextRef = useRef<CanvasRenderingContext2D>();
  const canvasSizeRef = useRef<WidthAndHeight>(null);
  const [canvasSize, setCanvasSize] = useState<WidthAndHeight>({
    width: 1,
    height: 1,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    simulationRef.current.intervals.physics = setTimeout(() => {
      const context = canvasRef.current?.getContext("2d");
      if (!context || !canvasSizeRef.current) return;
      contextRef.current = context;
      simulationRef.current.stepSimulation(context, canvasSizeRef.current);
    });

    return () => {
      simulationRef.current.cleanup();
    };
  }, [canvasRef, canvasSizeRef.current]);

  console.log(percentScrolled);
  return (
    <section className="mountain-range-scene-section">
      {percentScrolled > 1 && percentScrolled < windowHeight - 1 && <Snow percentScrolled={percentScrolled} />}
      <div className={`mountain-range-scene-section__text ${welcomeOpacityClass}`}>
        <h1>Welcome</h1>
        <p>Stay for the meteor shower or scroll to view portfolio</p>
      </div>
      <PlayControls simulationRef={simulationRef} contextRef={contextRef} canvasSizeRef={canvasSizeRef} />
      <div className="mountain-range-scene" style={{ top: `${percentScrolled}px` }}>
        <ResponsiveCanvas canvasRef={canvasRef} parentCanvasSizeRef={canvasSizeRef} setCanvasSize={setCanvasSize} styles="mountain-range-scene-canvas" />
      </div>
    </section>
  );
}
