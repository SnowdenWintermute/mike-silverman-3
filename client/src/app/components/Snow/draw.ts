import QuadTree from "./Quadtree/Quadtree";
import Snowflake from "./Snowflake";

const drawQt = (qt: QuadTree, context: CanvasRenderingContext2D) => {
  context.strokeStyle = `rgba(100,100,100, 1)`;
  context.lineWidth = 1;
  context.strokeRect(qt.boundary.left, qt.boundary.top, qt.boundary.w, qt.boundary.h);
  if (qt.divided) {
    drawQt(qt.northwest!, context);
    drawQt(qt.northeast!, context);
    drawQt(qt.southwest!, context);
    drawQt(qt.southeast!, context);
  }
};

function draw(
  context: CanvasRenderingContext2D,
  elementHeight: number,
  elementWidth: number,
  snowflakes: Snowflake[],
  qtRef: React.MutableRefObject<QuadTree>
) {
  context.clearRect(0, 0, elementWidth, elementHeight);
  context.beginPath();
  snowflakes.forEach((flake) => {
    context.fillStyle = flake.color;
    context.fillRect(flake.x, flake.y, flake.height, flake.width);
  });
  const qt = qtRef.current;
  drawQt(qt, context);
}

export default draw;
