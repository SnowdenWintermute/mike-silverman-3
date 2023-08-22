"use client";
import React from "react";
import { Vector } from "matter-js";

const Tooltip = ({ position, children }: { position: Vector; children: string | JSX.Element | JSX.Element[] }) => {
  return (
    <div className="tooltip" style={{ top: `${position.y}px`, left: `${position.x}px` }}>
      {children}
    </div>
  );
};

export default Tooltip;
