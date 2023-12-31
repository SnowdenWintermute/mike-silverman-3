import { Vector } from "matter-js";

export function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * max + min);
}

type ColorOptions = { randomRed: boolean; randomBlue: boolean; randomGreen: boolean };

export function randomColor(options?: ColorOptions) {
  const rA = randBetween(0, 255);
  const rB = randBetween(0, 255);
  const rC = randBetween(0, 255);
  return `rgb(${rA}, ${rB}, ${rC})`;
}

export function randomColorArray(arrayLength: number, colorOptions: ColorOptions) {
  const colors: string[] = [];
  for (let i = 0; i < arrayLength; i += 1) {
    colors.push(randomColor());
  }
  return colors;
}

export function normalizeRadians(radians: number): number {
  const PI_2 = 2 * Math.PI;
  return radians - PI_2 * Math.floor(radians / PI_2) - Math.PI;
}

export function getPointInArc(center: Vector, angle: number, radius: number): Vector {
  const x = center.x + Math.cos(angle) * radius;
  const y = center.y + Math.sin(angle) * radius;
  return { x, y };
}

export function getAngleFromCenter(center: Vector, point: Vector): number {
  const deltaX = point.x - center.x;
  const deltaY = point.y - center.y;
  return Math.atan2(deltaY, deltaX);
}

export function getRectDiagonal(length: number, width: number) {
  return Math.sqrt(length ** 2 + width ** 2);
}

export function distBetweenTwoPoints(pointA: Vector, pointB: Vector): number {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getPointOnLineAtX(pointA: Vector, pointB: Vector, xCoordinate: number): Vector {
  const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
  const yCoordinate = pointA.y + slope * (xCoordinate - pointA.x);
  return { x: xCoordinate, y: yCoordinate };
}

export function getRightTriangleThirdPointCoordinates(topPoint: Vector, bottomPoint: Vector, angle: number): Vector {
  const distanceAB = Math.sqrt((bottomPoint.x - topPoint.x) ** 2 + (bottomPoint.y - topPoint.y) ** 2);
  const lengthAC = distanceAB * Math.sin(-Math.PI / 2);
  const xC = topPoint.x - lengthAC * Math.cos(angle);
  const yC = bottomPoint.y; // Same y-coordinate as point B

  return { x: xC, y: yC };
}

export function percentBetweenTwoNumbers(number: number, low: number, high: number) {
  return (number - low) / (high - low);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
