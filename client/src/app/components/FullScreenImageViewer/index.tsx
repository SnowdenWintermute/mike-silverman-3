import React, { useEffect } from "react";

type Props = { image: string; closeViewer: () => void };

const FullScreenImageViewer = ({ image, closeViewer }: Props) => {
  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeViewer();
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, []);

  return (
    <div className="full-screen-image-viewer" onClick={closeViewer}>
      <img src={image} alt="a full screen image" onClick={closeViewer} />
    </div>
  );
};

export default FullScreenImageViewer;

