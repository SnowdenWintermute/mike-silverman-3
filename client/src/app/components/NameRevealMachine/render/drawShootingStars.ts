import { Vector } from "matter-js";
import { CELESTIAL_ANGLES } from "./consts";
import { baseWorldSize } from "../../MatterSim/consts";
import { getPointInArc } from "@/app/utils";
import { rgba } from "@/app/utils/colors";

class ShootingStar {
  duration = 300;
  distance = 300;
  spaceTravelledPerRender: number;
  numRendersUntilComplete: number;
  currentTailLength = 0;
  position: Vector;
  constructor(startPosition: Vector, public angle: number, renderRate: number) {
    this.numRendersUntilComplete = Math.floor(this.duration / renderRate);
    this.spaceTravelledPerRender = this.distance / this.numRendersUntilComplete;
    this.position = startPosition;
  }
}

const shootingStars: { [key: string]: ShootingStar } = {};
const deadShootingStars: { [key: string]: ShootingStar } = {};

export default function drawShootingStars(context: CanvasRenderingContext2D, drawFractions: Vector, renderRate: number, sunAngle: number) {
  const dfx = drawFractions.x;
  const dfy = drawFractions.y;
  const shouldSpawnStar = Math.random() > 0.98;
  if (shouldSpawnStar) {
    const shootingStarName = "a";
    shootingStars[shootingStarName] = new ShootingStar({ x: Math.random() * baseWorldSize.width, y: Math.random() * -200 + 100 }, 2, renderRate);
  }

  Object.entries(deadShootingStars).forEach(([key, shootingStar]) => {
    shootingStar.currentTailLength -= 1;
    const { angle, spaceTravelledPerRender } = shootingStar;
    context.strokeStyle = rgba(255, 255, 255, 0.05);
    context.lineWidth = 5;
    context.lineCap = "round";
    shootingStar.position = getPointInArc(shootingStar.position, angle, spaceTravelledPerRender);
    const { x, y } = shootingStar.position;
    for (let j = 0; j < shootingStar.currentTailLength; j += 1) {
      const strokeLength = j * shootingStar.spaceTravelledPerRender;
      const endPoint = getPointInArc({ x, y }, angle, -strokeLength);
      context.beginPath();
      context.moveTo(x * dfx, y * dfy);
      context.lineTo(endPoint.x * dfx, endPoint.y * dfy);
      context.stroke();
    }
  });

  Object.entries(shootingStars).forEach(([key, shootingStar]) => {
    shootingStar.currentTailLength += 1;
    const { angle, spaceTravelledPerRender } = shootingStar;
    context.strokeStyle = rgba(255, 255, 255, 0.01);
    context.lineWidth = 5;
    context.lineCap = "round";
    shootingStar.position = getPointInArc(shootingStar.position, angle, spaceTravelledPerRender);
    const { x, y } = shootingStar.position;
    for (let j = 0; j < shootingStar.currentTailLength; j += 1) {
      const strokeLength = j * shootingStar.spaceTravelledPerRender;
      const endPoint = getPointInArc({ x, y }, angle, -strokeLength);
      context.beginPath();
      context.moveTo(x * dfx, y * dfy);
      context.lineTo(endPoint.x * dfx, endPoint.y * dfy);
      context.stroke();
    }

    if (shootingStar.currentTailLength >= shootingStar.numRendersUntilComplete) {
      deadShootingStars[key] = shootingStar;
      delete shootingStars[key];
    }
  });
}
