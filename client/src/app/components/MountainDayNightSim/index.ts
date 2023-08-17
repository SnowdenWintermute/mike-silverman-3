import { WidthAndHeight } from "@/app/types";
import { baseWorldSize } from "../MatterSim/consts";
import createRidgelines from "./ridgelines/createRidgelines";
import createSineWaveMountains from "./sineWaveMountains/createSineWaveMountains";
import createCelestialBodies, { CelestialBody } from "./celestialBodies/createCelestialBodies";
import { ShootingStar } from "./shootingStars/ShootingStar";
import { defaultRenderRate } from "./consts";

// const celestialDiscStartAngle = 0.55;
// const celestialDiscStartAngle = -Math.PI / 2 + 0.4;
// const celestialDiscStartAngle = Math.PI;
// let rotationSpeed = 0.0005;
// let rotationSpeed = 0.0025;
// let rotationSpeed = 0.0045;
// let rotationSpeed = 0.0125;
export class MountainDayNightSim {
  celestialDiscStartAngle = 0.8;
  celestialBodies: CelestialBody[];
  sun: CelestialBody;
  sunAngle: number = 0;
  moon: CelestialBody;
  moonAngle: number = 0;
  skyColor: { h: number; s: number; l: number } = { h: 0, s: 0, l: 0 };
  ridgelines = createRidgelines(baseWorldSize);
  sineMountains = createSineWaveMountains(30);
  shootingStars: { [key: string]: ShootingStar } = {};
  deadShootingStars: { [key: string]: ShootingStar } = {};
  renderRate = defaultRenderRate;
  scrollPercent = 0;
  intervals: {
    physics: NodeJS.Timeout | undefined;
    render: NodeJS.Timeout | undefined;
  } = { physics: undefined, render: undefined };
  constructor(
    public updatePhysics: (simulation: MountainDayNightSim) => void,
    public render: (context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, simulation: MountainDayNightSim, renderRate: number) => void,
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

  cleanup() {
    clearTimeout(this.intervals.physics);
    this.intervals.physics = undefined;
  }

  stepSimulation(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight) {
    this.intervals.physics = setTimeout(() => {
      if (this.scrollPercent > 0.1) this.updatePhysics(this);
      if (this.scrollPercent > 0.1) this.render(context, canvasSize, this, this.renderRate);
      this.stepSimulation(context, canvasSize);
    }, this.renderRate);
  }
}
