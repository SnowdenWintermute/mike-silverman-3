import QuadTree from "../Quadtree/Quadtree";

export function drawQt(context: CanvasRenderingContext2D, qt: QuadTree) {
  context.strokeStyle = `rgba(100,100,100, 1)`;
  context.lineWidth = 1;
  context.strokeRect(qt.boundary.left, qt.boundary.top, qt.boundary.w, qt.boundary.h);
  if (qt.divided) {
    drawQt(context, qt.northwest!);
    drawQt(context, qt.northeast!);
    drawQt(context, qt.southwest!);
    drawQt(context, qt.southeast!);
  }
}
