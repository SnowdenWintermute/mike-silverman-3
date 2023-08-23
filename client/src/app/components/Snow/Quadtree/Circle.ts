import QTPoint from "./QTPoint";
import Rectangle from "./Rectangle";

export default class Circle {
  rSquared: number;
  constructor(public x: number, public y: number, public r: number) {
    this.rSquared = this.r * this.r;
  }

  contains(point: QTPoint) {
    let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return d <= this.rSquared;
  }

  intersects(range: Rectangle) {
    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    let r = this.r;
    let w = range.w / 2;
    let h = range.h / 2;
    let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    if (xDist > r + w || yDist > r + h) return false;
    if (xDist <= w || yDist <= h) return true;
    return edges <= this.rSquared;
  }
}
