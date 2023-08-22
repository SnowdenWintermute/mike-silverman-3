"use client";
import React, { useEffect, useRef, useState } from "react";
import { MountainDayNightSim } from "../MountainDayNightSim";
import { baseRotationSpeed, rotationSpeedPlayControlsIncrement } from "../MountainDayNightSim/consts";
import Rewind from "../../img/ui/play-controls/rewind.svg";
import Play from "../../img/ui/play-controls/play.svg";
import Pause from "../../img/ui/play-controls/pause.svg";
import FastForward from "../../img/ui/play-controls/fast-forward.svg";
import Die from "../../img/ui/play-controls/die.svg";
import Reset from "../../img/ui/play-controls/reset.svg";
import TooltippedComponent from "../common/TooltippedComponent";
import { WidthAndHeight } from "@/app/types";

type Props = {
  simulationRef: React.MutableRefObject<MountainDayNightSim>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  canvasSizeRef: React.MutableRefObject<WidthAndHeight | null>;
};

export default function PlayControls({ simulationRef, contextRef, canvasSizeRef }: Props) {
  if (typeof window === "undefined") return;
  const [shouldPause, setShouldPause] = useState(false);
  const [percentScrolled, setPercentScrolled] = useState(1);
  const [hideControlsClass, setHideControlsClass] = useState("play-controls--hidden");
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  const hideControls = (delay: number) => {
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setHideControlsClass("play-controls--hidden");
      // if (!delay) setHideControlsClass("play-controls--hidden transition-0");
    }, delay);
  };

  const showControls = () => {
    setHideControlsClass("");
    hideControls(3000);
  };

  const handleScroll = () => {
    const newPercentScrolled = 1 - window.scrollY / window.innerHeight;
    setPercentScrolled(newPercentScrolled);
    if (newPercentScrolled < 0.85) hideControls(0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window]);

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      showControls();
      setShouldPause(!simulationRef.current.isPaused);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === " ") e.preventDefault();
  };

  useEffect(() => {
    showControls();
    return () => clearTimeout(hideControlsTimeout.current);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", showControls);
    window.addEventListener("keyup", handleKeyup);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("mousemove", showControls);
      window.removeEventListener("keyup", handleKeyup);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (shouldPause) simulationRef.current.isPaused = true;
    else simulationRef.current.isPaused = false;
  }, [shouldPause]);

  const handleSlower = () => {
    simulationRef.current.rotationSpeed -= rotationSpeedPlayControlsIncrement;
  };
  const handlePause = () => {
    setShouldPause(true);
  };
  const handlePlay = () => {
    setShouldPause(false);
  };
  const handleFaster = () => {
    simulationRef.current.rotationSpeed += rotationSpeedPlayControlsIncrement;
  };
  const handleReset = () => {
    simulationRef.current.rotationSpeed = baseRotationSpeed;
  };
  const handleReroll = () => {
    simulationRef.current.reRoll(contextRef.current, canvasSizeRef.current);
  };
  return (
    <ul className={`play-controls ${hideControlsClass}`}>
      <li>
        <TooltippedComponent tooltipText="reset speed">
          <button onClick={handleReset}>
            <Reset className="play-controls__icon" />
          </button>
        </TooltippedComponent>
      </li>
      <li>
        <TooltippedComponent tooltipText="slow down">
          <button onClick={handleSlower}>
            <Rewind className="play-controls__icon" />
          </button>
        </TooltippedComponent>
      </li>
      <li>
        {shouldPause && (
          <TooltippedComponent tooltipText="play">
            <button onClick={handlePlay}>
              <Play className="play-controls__icon" />
            </button>
          </TooltippedComponent>
        )}
        {!shouldPause && (
          <TooltippedComponent tooltipText="pause">
            <button onClick={handlePause}>
              <Pause className="play-controls__icon" />
            </button>
          </TooltippedComponent>
        )}
      </li>
      <li>
        <TooltippedComponent tooltipText="speed up">
          <button onClick={handleFaster}>
            <FastForward className="play-controls__icon" />
          </button>
        </TooltippedComponent>
      </li>
      <li>
        <TooltippedComponent tooltipText="randomize scenery">
          <button onClick={handleReroll}>
            <Die className="play-controls__icon" />
          </button>
        </TooltippedComponent>
      </li>
    </ul>
  );
}
