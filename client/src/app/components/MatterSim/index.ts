import Matter, { Vector } from "matter-js";
import { MouseState } from "./MouseState";
import { EntityShape, EntityType, MatterSimEntities, ShapeCreationData } from "./MatterSimEntities";
import { Entity } from "./Entity";
import { baseWorldSize } from "./consts";
import { WidthAndHeight } from "@/app/types";
import { MountainDayNightSim } from "../MountainDayNightSim";

export class MatterSim {
  physicsEngine: Matter.Engine = Matter.Engine.create();
  intervals: {
    physics: NodeJS.Timeout | undefined;
    render: NodeJS.Timeout | undefined;
  } = { physics: undefined, render: undefined };
  mouseState = new MouseState();
  entities = new MatterSimEntities();
  renderRate = 20;
  isInitialized = false;

  constructor(
    public updatePhysics: (simulation: MatterSim) => void,
    public render: (context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, simulation: MatterSim | MountainDayNightSim, renderRate: number) => void,
    public shouldReinitializeOnCanvasResize = false,
    public worldSize = { height: baseWorldSize.width, width: baseWorldSize.height }
  ) {}

  createRegisteredEntity(position: Vector, type: EntityType, creationData: ShapeCreationData, color: string, options: { static?: boolean }) {
    const { shape } = creationData;
    this.entities.lastIdAssigned += 1;
    const id = this.entities.lastIdAssigned;
    let body;
    if (shape === EntityShape.RECT) body = Matter.Bodies.rectangle(position.x, position.y, creationData.width, creationData.height);
    else if (shape === EntityShape.CIRCLE) body = Matter.Bodies.circle(position.x, position.y, creationData.radius);
    else if (shape === EntityShape.POLY) body = Matter.Bodies.polygon(position.x, position.y, creationData.sides, creationData.radius);
    if (!body) return;

    body.label = `${type}-${id}`;
    Matter.Composite.add(this.physicsEngine.world, body);
    const newEntity = new Entity(id, body, shape, color, !!options?.static);

    this.entities[type][id] = newEntity;
    return this.entities[type][id];
  }

  removeAllEntities() {
    this.entities[EntityType.STATIC] = {};
    this.entities[EntityType.MOBILE] = {};
    Matter.Composite.clear(this.physicsEngine.world, false, true);
  }

  cleanup() {
    clearTimeout(this.intervals.physics);
    this.intervals.physics = undefined;
  }

  stepSimulation(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight) {
    this.intervals.physics = setTimeout(() => {
      this.updatePhysics(this);
      Matter.Engine.update(this.physicsEngine, this.renderRate);
      this.render(context, canvasSize, this, this.renderRate);
      this.stepSimulation(context, canvasSize);
    }, this.renderRate);
  }
}
