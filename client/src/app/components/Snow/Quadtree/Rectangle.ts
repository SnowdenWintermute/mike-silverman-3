import QTPoint from "./QTPoint";

export enum QTQuadrant {
  NE,
  NW,
  SE,
  SW,
}

export default class Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(public x: number, public y: number, public w: number, public h: number) {
    this.left = x - w / 2;
    this.right = x + w / 2;
    this.top = y - h / 2;
    this.bottom = y + h / 2;
  }

  contains(point: QTPoint) {
    return this.left <= point.x && point.x <= this.right && this.top <= point.y && point.y <= this.bottom;
  }

  intersects(rect: Rectangle) {
    return !(this.right < rect.left || rect.right < this.left || this.bottom < rect.top || rect.bottom < this.top);
  }

  subdivide(quadrant: QTQuadrant) {
    switch (quadrant) {
      case QTQuadrant.NE:
        return new Rectangle(this.x + this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
      case QTQuadrant.NW:
        return new Rectangle(this.x - this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
      case QTQuadrant.SE:
        return new Rectangle(this.x + this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
      case QTQuadrant.SW:
        return new Rectangle(this.x - this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
    }
  }

  xDistanceFrom(point: QTPoint) {
    if (this.left <= point.x && point.x <= this.right) {
      return 0;
    }
    return Math.min(Math.abs(point.x - this.left), Math.abs(point.x - this.right));
  }

  yDistanceFrom(point: QTPoint) {
    if (this.top <= point.y && point.y <= this.bottom) {
      return 0;
    }
    return Math.min(Math.abs(point.y - this.top), Math.abs(point.y - this.bottom));
  }

  distanceFrom(point: QTPoint) {
    const dx = this.xDistanceFrom(point);
    const dy = this.yDistanceFrom(point);
    return Math.sqrt(dx * dx + dy * dy);
  }
}
