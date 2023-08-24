import React, { useState, useEffect, useRef, useCallback } from "react";
import throttledHandlerCreator from "../../utils/throttledEventHandleCreator";

type Props = {
  image: string;
  handleClick: () => void;
  alt?: string;
};

const HoverOffsetZoomViewer = ({ image, alt, handleClick }: Props) => {
  const [style, setStyle] = useState({});
  const [hoveringImg, setHoveringImg] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    if (!imgRef.current || typeof offset.x !== "number" || typeof offset.y !== "number") return;
    const imgHeight = imgRef.current.clientHeight;
    const imgWidth = imgRef.current.clientWidth;
    const newStyle = {
      transform: `scale(${hoveringImg ? "1.8" : "1"}) translateX(${-(offset.x - imgWidth / 2) / 4}px) translateY(${-(offset.y - imgHeight / 2) / 1.5}px`,
    };
    setStyle(newStyle);
  }, [hoveringImg, offset]);

  const handleMouseMove = useCallback(
    throttledHandlerCreator(33, (e: React.MouseEvent) => {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      setOffset({ x, y });
    }),
    []
  );

  useEffect(() => {
    if (!hoveringImg)
      setStyle({
        transform: `scale(${hoveringImg ? "1.8" : "1"}) translateX(0%) translateY(0%)`,
      });
  }, [hoveringImg]);

  const handleMouseEnter = () => {
    setHoveringImg(true);
  };
  const handleMouseLeave = () => setHoveringImg(false);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHoveringImg(true);
  };
  const handleTouchEnd = () => setHoveringImg(false);
  const handleTouchMove = useCallback(
    throttledHandlerCreator(33, (e: React.TouchEvent<HTMLDivElement>) => {
      //@ts-ignore
      const bcr = e.target.getBoundingClientRect();
      const x = e.targetTouches[0].clientX - bcr.x;
      const y = e.targetTouches[0].clientY - bcr.y;
      setOffset({ x, y });
    }),
    []
  );

  return (
    <div
      className="offset-zoomer"
      aria-hidden={true}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
    >
      <img ref={imgRef} className="zoomable-image" src={image} alt={alt} style={style} aria-hidden={true} />
    </div>
  );
};

export default HoverOffsetZoomViewer;
