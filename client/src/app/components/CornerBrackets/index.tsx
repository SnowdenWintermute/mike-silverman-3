import React, { useState, useRef, useEffect, useCallback } from "react";

type Props = {
  color: string;
  altColor: string;
  length: number;
  thickness: number;
  maxSizeOffset: number;
  hovering: boolean;
  mouseDown: boolean;
};

const CornerBrackets = ({ color, altColor, length, thickness, maxSizeOffset, hovering, mouseDown }: Props) => {
  const [opacity, setOpacity] = useState(0);
  const [sizeOffset, setSizeOffset] = useState(0);
  const [bracketColor, setBracketColor] = useState(color);
  const opacityInterval = useRef<NodeJS.Timeout | null>(null);
  const resizeInterval = useRef<NodeJS.Timeout | null>(null);
  const minSizeOffset = useRef(-3);

  const handleMouseEnter = useCallback(() => {
    if (opacityInterval.current) clearInterval(opacityInterval.current);
    if (resizeInterval.current) clearInterval(resizeInterval.current);
    setBracketColor(color);
    let lastOpacity = opacity;
    opacityInterval.current = setInterval(() => {
      if (lastOpacity < 100) setOpacity((lastOpacity += 20));
      else if (opacityInterval.current) clearInterval(opacityInterval.current);
    }, 33);
    let lastSizeOffset = sizeOffset;
    resizeInterval.current = setInterval(() => {
      if (lastSizeOffset > maxSizeOffset) setSizeOffset((lastSizeOffset -= 3));
      else if (resizeInterval.current) clearInterval(resizeInterval.current);
    }, 33);
  }, [color, maxSizeOffset, opacity, sizeOffset]);

  const handleMouseLeave = useCallback(() => {
    if (opacityInterval.current) clearInterval(opacityInterval.current);
    if (resizeInterval.current) clearInterval(resizeInterval.current);
    let lastOpacity = opacity;
    opacityInterval.current = setInterval(() => {
      if (lastOpacity > minSizeOffset.current) setOpacity((lastOpacity -= 20));
      else if (opacityInterval.current) clearInterval(opacityInterval.current);
    }, 33);
    let lastSizeOffset = sizeOffset;
    resizeInterval.current = setInterval(() => {
      if (lastSizeOffset < minSizeOffset.current) setSizeOffset((lastSizeOffset += 1));
      else if (resizeInterval.current) clearInterval(resizeInterval.current);
    }, 33);
  }, [opacity, sizeOffset]);

  const handleMouseDown = useCallback(() => {
    if (opacityInterval.current) clearInterval(opacityInterval.current);
    if (resizeInterval.current) clearInterval(resizeInterval.current);
    let lastSizeOffset = sizeOffset;
    resizeInterval.current = setInterval(() => {
      if (lastSizeOffset < minSizeOffset.current) setSizeOffset((lastSizeOffset += Math.min(5, Math.abs(lastSizeOffset))));
      else if (resizeInterval.current) clearInterval(resizeInterval.current);
    }, 33);
    setOpacity(100);
    setBracketColor(altColor);
  }, [altColor, sizeOffset]);

  const [lastHovering, setLastHovering] = useState(hovering);
  const [lastMouseDown, setLastMousDown] = useState(mouseDown);
  useEffect(() => {
    if (hovering !== lastHovering && hovering) handleMouseEnter();
    if (hovering !== lastHovering && !hovering) handleMouseLeave();
    if (mouseDown !== lastMouseDown && mouseDown) handleMouseDown();
    setLastHovering(hovering);
    setLastMousDown(mouseDown);
  }, [handleMouseDown, handleMouseEnter, handleMouseLeave, hovering, lastHovering, lastMouseDown, mouseDown]);

  return (
    <div className="corner-bracket-box">
      <div
        className={`bracket-line`}
        style={{
          opacity: `${opacity}%`,
          backgroundColor: bracketColor,
          height: thickness,
          width: length - thickness,
          top: sizeOffset,
          left: sizeOffset + thickness,
        }}
      />
      <div
        className={`bracket-line`}
        style={{
          opacity: `${opacity}%`,
          backgroundColor: bracketColor,
          height: thickness,
          width: length - thickness,
          top: sizeOffset,
          right: sizeOffset + thickness,
        }}
      />
      <div
        className={`bracket-line`}
        style={{
          opacity: `${opacity}%`,
          backgroundColor: bracketColor,
          height: thickness,
          width: length - thickness,
          bottom: sizeOffset,
          left: sizeOffset + thickness,
        }}
      />
      <div
        className={`bracket-line`}
        style={{
          opacity: `${opacity}%`,
          backgroundColor: bracketColor,
          height: thickness,
          width: length - thickness,
          bottom: sizeOffset,
          right: sizeOffset + thickness,
        }}
      />
      <div
        className={`bracket-line`}
        style={{ opacity: `${opacity}%`, backgroundColor: bracketColor, height: length, width: thickness, left: sizeOffset, top: sizeOffset }}
      />
      <div
        className={`bracket-line`}
        style={{ opacity: `${opacity}%`, backgroundColor: bracketColor, height: length, width: thickness, left: sizeOffset, bottom: sizeOffset }}
      />
      <div
        className={`bracket-line`}
        style={{ opacity: `${opacity}%`, backgroundColor: bracketColor, height: length, width: thickness, right: sizeOffset, top: sizeOffset }}
      />
      <div
        className={`bracket-line`}
        style={{ opacity: `${opacity}%`, backgroundColor: bracketColor, height: length, width: thickness, right: sizeOffset, bottom: sizeOffset }}
      />
    </div>
  );
};

export default CornerBrackets;
