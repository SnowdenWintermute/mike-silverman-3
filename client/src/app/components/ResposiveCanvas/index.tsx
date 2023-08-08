"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { MatterSim } from "../MatterSim";
import { WidthAndHeight } from "@/app/types";

type Props = {
  simulationRef: MutableRefObject<MatterSim>;
};

const chunks: BlobPart[] = []; // here we will store our recorded media chunks (Blobs)

export default function ResponsiveCanvas({ simulationRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeRef = useRef<WidthAndHeight | null>(null);
  const windowDimensions = useWindowDimensions();
  const [showButton, setShowButton] = useState(true);

  const [canvasSize, setCanvasSize] = useState<WidthAndHeight>({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    // console.log(canvasRef.current);
    // even though we don't use this value for anything, the fact that we set state forces a react refresh which actually makes the
    // canvas resize, so its needed for now
    setCanvasSize({
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    });

    canvasSizeRef.current = {
      height: canvasRef.current.clientHeight,
      width: canvasRef.current.clientWidth,
    };
  }, [setCanvasSize, canvasRef, windowDimensions]);

  useEffect(() => {
    const simulationRefCurrent = simulationRef.current;
    // simulationRef.current.canvasSize = { width: canvasSize.width, height: canvasSize.height };
    simulationRef.current.intervals.physics = setTimeout(() => {
      const context = canvasRef.current?.getContext("2d");
      if (!context || !canvasSizeRef.current) return;
      simulationRef.current.stepSimulation(context, canvasSizeRef.current);
    });

    return () => {
      simulationRefCurrent.cleanup();
    };
  }, [canvasRef, canvasSize.height, canvasSize.width]);

  // function startRecording() {
  //   if (!canvasRef.current) return;
  //   setShowButton(false);
  //   const stream = canvasRef.current.captureStream(); // grab our canvas MediaStream
  //   const rec = new MediaRecorder(stream); // init the recorder
  //   // every time the recorder has new data, we will store it in our array
  //   rec.ondataavailable = (e) => chunks.push(e.data);
  //   // only when the recorder stops, we construct a complete Blob from all the chunks
  //   rec.onstop = (e) => exportVid(new Blob(chunks, { type: "video/webm" }));

  //   rec.start();
  //   setTimeout(() => {
  //     rec.stop();
  //     setShowButton(true);
  //   }, 30000); // stop recording in 3s
  // }

  // function exportVid(blob: Blob) {
  //   const vid = document.createElement("video");
  //   vid.src = URL.createObjectURL(blob);
  //   vid.controls = true;
  //   document.body.appendChild(vid);
  //   const a = document.createElement("a");
  //   a.download = "myvid.webm";
  //   a.href = vid.src;
  //   a.textContent = "download the video";
  //   document.body.appendChild(a);
  // }

  return (
    <div>
      <canvas
        height={canvasSizeRef.current?.height}
        width={canvasSizeRef.current?.width}
        id="canvas"
        className="canvas__full-screen"
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
      />
      {
        // showButton && <button onClick={() => startRecording()}>record</button>
      }
    </div>
  );
}
