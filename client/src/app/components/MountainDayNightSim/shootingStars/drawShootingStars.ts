import { Vector } from "matter-js";
import { MountainDayNightSim } from "..";
import drawShootingStar from "./drawShootingStar";

export default function drawShootingStars(context: CanvasRenderingContext2D, drawFractions: Vector, sim: MountainDayNightSim) {
  const { deadShootingStars, shootingStars } = sim;
  context.lineCap = "round";

  Object.entries(deadShootingStars).forEach(([key, shootingStar]) => {
    drawShootingStar(context, drawFractions, shootingStar);
  });

  Object.entries(shootingStars).forEach(([key, shootingStar]) => {
    drawShootingStar(context, drawFractions, shootingStar);
  });

  context.lineCap = "butt";
}
