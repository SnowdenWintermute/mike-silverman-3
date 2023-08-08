import { WidthAndHeight } from "@/app/types";
import { distBetweenTwoPoints, getPointInArc, getRightTriangleThirdPointCoordinates, randBetween } from "@/app/utils";
import { perlin1D } from "@/app/utils/perlin";
import { Vector } from "matter-js";

export type SineWaveMountain = {
  ridgeline: Vector[];
  peak: Vector;
  center: Vector;
  shadowDelimitingPath: Vector[];
  pathLowestPoint: Vector;
  bottomMid: Vector;
  yOffset: number;
};

export default function createSineWaveMountain(dimensions: WidthAndHeight, xOffset: number, yOffset: number) {
  const points: Vector[] = [];
  const yOffsetFinal = dimensions.height / 2 + yOffset;
  const amplitude = dimensions.height / 2;
  const numCycles = 1;
  const wavelength = (2 * Math.PI) / (dimensions.width / numCycles);
  const numPoints = 100;
  const spaceBetweenPoints = dimensions.width / numPoints;
  const frequency = Math.PI / 2;

  const perlinAttributesA = {
    amplitude: 50,
    numberOfPoints: numPoints,
    wavelength: 3,
    numberOfOctaves: 3,
  };
  let peak = { x: 0, y: dimensions.height + yOffset };
  const perlins = perlin1D(perlinAttributesA);

  for (let x = 0; x <= dimensions.width; x += spaceBetweenPoints) {
    const newPoint = { x, y: yOffsetFinal + Math.sin(x * wavelength + frequency) * amplitude };
    const currPointIndex = points.length - 1;
    const normalizedPerlin = perlins[currPointIndex] - perlinAttributesA.amplitude / 2;
    newPoint.y += normalizedPerlin;
    newPoint.x += xOffset;
    if (newPoint.y > yOffset + dimensions.height) continue;
    if (newPoint.y < peak.y) peak = newPoint;
    points.push(newPoint);
  }

  // align side points
  points[0].y = yOffset + dimensions.height;
  if (points[points.length - 1].y < points[0].y) points[points.length - 1].y = yOffset + dimensions.height;

  // find center
  const ridgelineCenter = points[Math.floor((points.length - 1) / 2)];
  const distCenterYToFloor = dimensions.height - ridgelineCenter.y;
  const center = { x: ridgelineCenter.x, y: yOffsetFinal + distCenterYToFloor / 2 };

  // create path down from peak

  const distancePeakToFloor = dimensions.height + yOffset - peak.y;
  const numberOfShadowDelimiterPathPoints = numPoints / 2;
  const randomAngleWithinBounds = randBetween(1.4, 1.6);
  const pathLowestPoint = getRightTriangleThirdPointCoordinates(peak, { x: peak.x, y: peak.y + distancePeakToFloor }, randomAngleWithinBounds);
  const pathLength = distBetweenTwoPoints(pathLowestPoint, peak);
  const distBetweenSDPPoints = pathLength / numberOfShadowDelimiterPathPoints;
  const shadowDelimitingPath: Vector[] = [];
  for (let i = 0; i <= numberOfShadowDelimiterPathPoints; i += 1) {
    if (i === 0) continue;
    const point = getPointInArc(peak, randomAngleWithinBounds, i * distBetweenSDPPoints);
    const perlin = perlins[i * 2];
    point.x += perlin / 4;
    if (i === numberOfShadowDelimiterPathPoints) point.y = pathLowestPoint.y;
    shadowDelimitingPath.push(point);
  }
  shadowDelimitingPath[shadowDelimitingPath.length - 1].y = dimensions.height + yOffset;
  shadowDelimitingPath[shadowDelimitingPath.length - 1].x = shadowDelimitingPath[shadowDelimitingPath.length - 2].x;

  return { ridgeline: points, peak, center, shadowDelimitingPath, pathLowestPoint, bottomMid: { x: peak.x, y: peak.y + distancePeakToFloor }, yOffset };
}
