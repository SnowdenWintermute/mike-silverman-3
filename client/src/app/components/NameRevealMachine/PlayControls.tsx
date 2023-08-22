import React from "react";
import { MountainDayNightSim } from "../MountainDayNightSim";
import { baseRotationSpeed, rotationSpeedPlayControlsIncrement } from "../MountainDayNightSim/consts";

type Props = {
  simulationRef: React.MutableRefObject<MountainDayNightSim>;
};

export default function PlayControls({ simulationRef }: Props) {
  const handleSlower = () => {
    simulationRef.current.rotationSpeed -= rotationSpeedPlayControlsIncrement;
  };
  const handlePause = () => {
    simulationRef.current.isPaused = true;
  };
  const handlePlay = () => {
    simulationRef.current.isPaused = false;
  };
  const handleFaster = () => {
    simulationRef.current.rotationSpeed += rotationSpeedPlayControlsIncrement;
  };
  const handleReset = () => {
    simulationRef.current.rotationSpeed = baseRotationSpeed;
  };
  const handleReroll = () => {
    simulationRef.current.reRoll();
  };
  return (
    <ul className="mountain-range-scene-section__play-controls">
      <li>
        <button onClick={handleSlower}>slower</button>
      </li>
      <li>
        <button onClick={handlePause}>pause</button>
      </li>
      <li>
        <button onClick={handlePlay}>play</button>
      </li>
      <li>
        <button onClick={handleFaster}>faster</button>
      </li>
      <li>
        <button onClick={handleReset}>reset speed</button>
      </li>
      <li>
        <button onClick={handleReroll}>reroll</button>
      </li>
    </ul>
  );
}
