import { Vector } from "matter-js";

export class Rectangle {
  origin: Vector;
  width: number;
  height: number;
  constructor(origin: Vector, width: number, height: number) {
    this.origin = origin;
    this.width = width;
    this.height = height;
  }
}

export class DetailedRectangle extends Rectangle {
  topRightCorner: Vector;
  bottomRightCorner: Vector;
  bottomLeftCorner: Vector;
  topY: number;
  bottomY: number;
  leftX: number;
  rightX: number;
  constructor(origin: Vector, width: number, height: number) {
    super(origin, width, height);
    this.origin = origin;
    this.topRightCorner = Vector.create(origin.x + width - 1, origin.y);
    this.bottomRightCorner = Vector.create(origin.x + width - 1, origin.y + height - 1);
    this.bottomLeftCorner = Vector.create(origin.x, origin.y + height - 1);
    this.bottomY = origin.y + height - 1;
    this.leftX = origin.x;
    this.topY = origin.y;
    this.rightX = origin.x + width - 1;
  }
  containsPoint(point: Vector) {
    const { x, y } = point;
    return this.origin.x <= x && x <= this.origin.x + this.width && this.origin.y <= y && y <= this.origin.y + this.height;
  }
}
