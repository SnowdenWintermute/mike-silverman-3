import { WidthAndHeight } from "@/app/types";
import QuadTree from "./Quadtree/Quadtree";
import Snowflake from "./Snowflake";
import Rectangle from "./Quadtree/Rectangle";
import { defaultRenderRate } from "../MountainDayNightSim/consts";
import Quadtree from "./Quadtree/Quadtree";
import QTPoint from "./Quadtree/QTPoint";

export default class SnowQuadtreeSim {
  spawnAboveScreenOffset = 20;
  baseQuadtreeCapacity = 4;
  snowflakes: Snowflake[] = [];
  qt: QuadTree;
  context: CanvasRenderingContext2D | null = null;
  intervals: {
    physics: NodeJS.Timeout | undefined;
    render: NodeJS.Timeout | undefined;
  } = { physics: undefined, render: undefined };

  constructor(public canvasSize: WidthAndHeight) {
    this.qt = new QuadTree(new Rectangle(canvasSize.width / 2, canvasSize.height / 2, canvasSize.width, canvasSize.height), this.baseQuadtreeCapacity);
  }

  spawnInitialSnowflakes(numFlakes: number, canvasRef: React.RefObject<HTMLCanvasElement>) {
    if (!canvasRef.current) return;
    for (let i = numFlakes; i > 0; i--)
      this.snowflakes.push(new Snowflake(Math.random() * canvasRef.current.clientWidth, Math.random() * canvasRef.current.clientHeight));
  }

  createNewSnowflakes(flakeLimit: number, newFlakesPerTick: number, windowWidth: number) {
    if (this.snowflakes.length >= flakeLimit) return;
    for (let i = newFlakesPerTick; i > 0; i--) this.snowflakes.push(new Snowflake(Math.random() * windowWidth, Math.random() * -this.spawnAboveScreenOffset));
  }

  tickPhysics() {
    this.snowflakes.forEach((snowflake) => {
      snowflake.fall(this.canvasSize.height - 10, this.canvasSize.height);
    });
    this.qt = new Quadtree(new Rectangle(this.canvasSize.width / 2, this.canvasSize.height / 2, this.canvasSize.width, this.canvasSize.height), 4);
    if (this.snowflakes) this.snowflakes.forEach((snowflake) => this.qt.insert(new QTPoint(snowflake.x, snowflake.y, snowflake)));
  }

  render(context: CanvasRenderingContext2D) {
    // const drawQt = (qt: QuadTree, context: CanvasRenderingContext2D) => {
    //   context.strokeStyle = `rgba(100,100,100, 1)`;
    //   context.lineWidth = 1;
    //   context.strokeRect(qt.boundary.left, qt.boundary.top, qt.boundary.w, qt.boundary.h);
    //   if (qt.divided) {
    //     drawQt(qt.northwest!, context);
    //     drawQt(qt.northeast!, context);
    //     drawQt(qt.southwest!, context);
    //     drawQt(qt.southeast!, context);
    //   }
    // };
    context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    context.beginPath();
    this.snowflakes.forEach((flake) => {
      context.fillStyle = flake.color;
      context.fillRect(flake.x, flake.y, flake.height, flake.width);
    });
    // const qt = qtRef.current;
    // drawQt(qt, context);
  }

  stepSimulation() {
    clearInterval(this.intervals.physics);
    this.intervals.physics = setTimeout(() => {
      this.tickPhysics();
      this.render();
      this.stepSimulation();
    }, defaultRenderRate);
  }
}
