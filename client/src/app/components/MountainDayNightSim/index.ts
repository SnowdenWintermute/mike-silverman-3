"use client";
import { WidthAndHeight } from "@/app/types";
import { baseWorldSize } from "../MatterSim/consts";
import createRidgelines from "./ridgelines/createRidgelines";
import createSineWaveMountains from "./sineWaveMountains/createSineWaveMountains";
import createCelestialBodies, { CelestialBody } from "./celestialBodies/createCelestialBodies";
import { ShootingStar } from "./shootingStars/ShootingStar";
import { defaultRenderRate, maxFrameDeltaMs } from "./consts";
import { normalizeRadians } from "@/app/utils";

// const celestialDiscStartAngle = 0.55;
// const celestialDiscStartAngle = -Math.PI / 2 + 0.4;
// const celestialDiscStartAngle = Math.PI;
// let rotationSpeed = 0.0005;
// let rotationSpeed = 0.0025;
// let rotationSpeed = 0.0045;
// let rotationSpeed = 0.0125;
export class MountainDayNightSim {
  celestialDiscStartAngle = 0.8;
  // celestialDiscStartAngle = Math.PI + Math.PI / 2;
  celestialBodies: CelestialBody[];
  sun: CelestialBody;
  sunAngle: number = 0;
  moon: CelestialBody;
  moonAngle: number = 0;
  totalRotation: number = 0;
  skyColor: { h: number; s: number; l: number } = { h: 0, s: 0, l: 0 };
  ridgelines = createRidgelines(baseWorldSize);
  sineMountains = createSineWaveMountains(30);
  shootingStars: { [key: string]: ShootingStar } = {};
  deadShootingStars: { [key: string]: ShootingStar } = {};
  renderRate = defaultRenderRate;
  scrollPercent = 0;
  deltaMs = defaultRenderRate;
  timeOfLastRender: number | null = null;
  isPaused = false;
  animationFrameId: number | null = null;
  constructor(
    public updatePhysics: (simulation: MountainDayNightSim) => void,
    public render: (context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, simulation: MountainDayNightSim) => void,
    public shouldReinitializeOnCanvasResize = false,
    public worldSize = { height: baseWorldSize.width, width: baseWorldSize.height },
    public rotationSpeed: number
  ) {
    const sunStartAngle = Math.PI + this.celestialDiscStartAngle;
    const moonStartAngle = 0 + this.celestialDiscStartAngle;
    this.celestialBodies = createCelestialBodies(baseWorldSize, 1000, baseWorldSize.height * 0.75, sunStartAngle, moonStartAngle, this.celestialDiscStartAngle);
    this.sun = this.celestialBodies[this.celestialBodies.length - 2];
    this.moon = this.celestialBodies[this.celestialBodies.length - 1];
  }

  reRoll(context: CanvasRenderingContext2D | undefined, canvasSize: WidthAndHeight | null) {
    const sunStartAngle = (Math.PI + this.celestialDiscStartAngle + this.totalRotation) % (Math.PI * 2);
    const moonStartAngle = (this.celestialDiscStartAngle + this.totalRotation) % (Math.PI * 2);
    this.celestialBodies = createCelestialBodies(
      baseWorldSize,
      1000,
      baseWorldSize.height * 0.75,
      sunStartAngle,
      moonStartAngle,
      (this.celestialDiscStartAngle + this.totalRotation) % (Math.PI * 2)
    );
    this.sun = this.celestialBodies[this.celestialBodies.length - 2];
    this.moon = this.celestialBodies[this.celestialBodies.length - 1];
    this.ridgelines = createRidgelines(baseWorldSize);
    this.sineMountains = createSineWaveMountains(30);
    console.log(this.isPaused, !!context, !!canvasSize);
    if (this.isPaused && context && canvasSize) this.render(context, canvasSize, this);
  }

  cleanup() {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.timeOfLastRender = null;
  }

  stepSimulation(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight) {
    // cancelling a handle that already fired is a no-op, so this only bites when an outside caller
    // starts a second loop
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame((timestamp) => {
      this.stepSimulation(context, canvasSize);

      if (this.scrollPercent <= 0.1 || this.isPaused) {
        // dropping the timestamp means the frame that resumes measures against itself rather than
        // against however long the scene sat idle
        this.timeOfLastRender = null;
        return;
      }

      const previousRenderTime = this.timeOfLastRender;
      this.timeOfLastRender = timestamp;
      this.deltaMs = previousRenderTime === null ? this.renderRate : Math.min(timestamp - previousRenderTime, maxFrameDeltaMs);

      this.updatePhysics(this);
      this.render(context, canvasSize, this);
    });
  }
}
