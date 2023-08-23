import QTPoint from "./QTPoint";
import Rectangle, { QTQuadrant } from "./Rectangle";

export default class QuadTree {
  points: QTPoint[] = [];
  divided: boolean = false;
  northeast: QuadTree | undefined;
  northwest: QuadTree | undefined;
  southeast: QuadTree | undefined;
  southwest: QuadTree | undefined;
  constructor(public boundary: Rectangle, public capacity: number) {
    if (capacity < 1) throw RangeError("capacity must be greater than 0");
  }

  getChildren() {
    if (this.divided) return [this.northeast, this.northwest, this.southeast, this.southwest];
    else return [];
  }

  subdivide() {
    this.northeast = new QuadTree(this.boundary.subdivide(QTQuadrant.NE), this.capacity);
    this.northwest = new QuadTree(this.boundary.subdivide(QTQuadrant.NW), this.capacity);
    this.southeast = new QuadTree(this.boundary.subdivide(QTQuadrant.SE), this.capacity);
    this.southwest = new QuadTree(this.boundary.subdivide(QTQuadrant.SW), this.capacity);
    this.divided = true;
  }

  insert(point: QTPoint): boolean {
    if (!this.boundary.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) this.subdivide();

    return this.northeast!.insert(point) || this.northwest!.insert(point) || this.southeast!.insert(point) || this.southwest!.insert(point);
  }

  query(range: Rectangle, found: QTPoint[]) {
    if (!found) found = [];
    if (!range.intersects(this.boundary)) return found;

    for (let p of this.points) if (range.contains(p)) found.push(p);

    if (this.divided) {
      this.northwest!.query(range, found);
      this.northeast!.query(range, found);
      this.southwest!.query(range, found);
      this.southeast!.query(range, found);
    }

    return found;
  }

  forEach(fn: (props: any) => any) {
    this.points.forEach(fn);
    if (this.divided) {
      this.northeast!.forEach(fn);
      this.northwest!.forEach(fn);
      this.southeast!.forEach(fn);
      this.southwest!.forEach(fn);
    }
  }

  get length() {
    let count = this.points.length;
    if (this.divided) {
      count += this.northwest!.length;
      count += this.northeast!.length;
      count += this.southwest!.length;
      count += this.southeast!.length;
    }
    return count;
  }
}
