import { getPointInArc, randomColor } from "@/app/utils";
import { rgba } from "@/app/utils/colors";
import { Vector } from "matter-js";
import { SHOOTING_STAR_COLOR } from "../consts";

const defaultShootingStarAcceleration = 0.02;
const deceleration = 0.99;

export class ShootingStar {
  age = 0;
  currentTailLength = 0;
  acceleration = 0.02;
  position: Vector;
  dissipationSpeed: number;
  constructor(
    startPosition: Vector,
    public angle: number,
    public size: number,
    public duration: number,
    public speed = 1,
    acceleration = defaultShootingStarAcceleration,
    public color = SHOOTING_STAR_COLOR
  ) {
    this.position = startPosition;
    this.dissipationSpeed = speed * 0.8;
    if (typeof acceleration === "number") this.acceleration = acceleration;
  }

  update(tailLengthAdjustment: number, renderRate: number) {
    this.currentTailLength += tailLengthAdjustment;
    this.speed += this.acceleration;
    this.acceleration *= deceleration;
    this.age += renderRate;
    const distanceToTravel = this.speed * renderRate;
    this.position = getPointInArc(this.position, this.angle, distanceToTravel);
  }
}
