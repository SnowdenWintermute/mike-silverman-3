import { Vector } from "matter-js";

export function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
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

export function getPointInArc(center: Vector, angle: number, radius: number): Vector {
  const x = center.x + Math.cos(angle) * radius;
  const y = center.y + Math.sin(angle) * radius;
  return { x, y };
}

export function getRectDiagonal(length: number, width: number) {
  return Math.sqrt(length ** 2 + width ** 2);
}

export function distBetweenTwoPoints(pointA: Vector, pointB: Vector): number {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  return Math.sqrt(dx * dx + dy * dy);
}
