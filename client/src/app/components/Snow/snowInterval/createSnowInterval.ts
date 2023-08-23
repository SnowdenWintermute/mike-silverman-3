import Rectangle from "../Quadtree/Rectangle";
import QTPoint from "../Quadtree/QTPoint";
import Quadtree from "../Quadtree/Quadtree";
import Snowflake from "../Snowflake";
import stickSnowflakes from "./stickSnowflakes";
import createNewFlakes from "./createNewFlakes";
import { defaultRenderRate } from "../../MountainDayNightSim/consts";
import QuadTree from "../Quadtree/Quadtree";

export default function createSnowInterval(
  currentDrawFunction: () => void,
  elementHeight: number,
  elementWidth: number,
  snowflakes: React.MutableRefObject<Snowflake[]>,
  qtRef: React.MutableRefObject<QuadTree>
) {
  return setInterval(() => {
    snowflakes.current.forEach((snowflake) => {
      snowflake.fall(elementHeight - 10, elementWidth);
    });
    qtRef.current = new Quadtree(new Rectangle(elementWidth / 2, elementHeight / 2, elementWidth, elementHeight), 4);
    if (snowflakes) snowflakes.current.forEach((snowflake) => qtRef.current.insert(new QTPoint(snowflake.x, snowflake.y, snowflake)));
    currentDrawFunction();
  }, defaultRenderRate);
}
