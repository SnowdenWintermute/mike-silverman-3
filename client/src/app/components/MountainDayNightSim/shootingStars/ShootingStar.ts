import { getPointInArc } from "@/app/utils";
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

  update(tailLengthAdjustment: number, renderRate: number, rotationSpeed: number, baseRotationSpeed: number) {
    const percentOfRotationSpeed = rotationSpeed / baseRotationSpeed;
    this.currentTailLength += tailLengthAdjustment * percentOfRotationSpeed;
    this.speed += this.acceleration * percentOfRotationSpeed;
    this.acceleration *= deceleration * percentOfRotationSpeed;
    this.age += renderRate * percentOfRotationSpeed;
    const distanceToTravel = this.speed * renderRate * percentOfRotationSpeed;
    this.position = getPointInArc(this.position, this.angle, distanceToTravel);
  }
}
