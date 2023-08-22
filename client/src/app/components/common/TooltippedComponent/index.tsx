import { useAppDispatch } from "@/app/redux/hooks";
import { setTooltipContents } from "@/app/redux/slices/ui-slice";
import React, { useRef } from "react";

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  tooltipText: string;
};

function TooltippedComponent({ children, tooltipText }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleMouseOver = () => {
    if (!containerRef.current) return;
    const clientRect = containerRef.current.getBoundingClientRect();
    dispatch(setTooltipContents({ contents: tooltipText, position: { x: clientRect.x + clientRect.width / 2, y: clientRect.y } }));
  };

  const handleMouseLeave = () => {
    dispatch(setTooltipContents(null));
  };

  return (
    <div ref={containerRef} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}

export default TooltippedComponent;
