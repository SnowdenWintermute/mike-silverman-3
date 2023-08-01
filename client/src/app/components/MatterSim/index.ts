import Matter, { Vector } from "matter-js";
import { MouseState } from "./MouseState";
import { WidthAndHeight } from "../FullScreenCanvas";
import { EntityShape, EntityType, MatterSimEntities, ShapeCreationData } from "./MatterSimEntities";
import { Entity } from "./Entity";
import { baseCanvasDimensions } from "./consts";

export class MatterSim {
  physicsEngine: Matter.Engine = Matter.Engine.create();
  intervals: {
    physics: NodeJS.Timeout | undefined;
    render: NodeJS.Timeout | undefined;
  } = { physics: undefined, render: undefined };
  canvasSize = { height: baseCanvasDimensions.width, width: baseCanvasDimensions.height };
  mouseState = new MouseState();
  entities = new MatterSimEntities();
  renderRate = 20;

  constructor(
    public updatePhysics: (simulation: MatterSim) => void,
    public render: (context: CanvasRenderingContext2D, canvasSize: WidthAndHeight, simulation: MatterSim) => void
  ) {}

  createRegisteredEntity(position: Vector, type: EntityType, creationData: ShapeCreationData, options: { static?: boolean }) {
    const { shape } = creationData;
    this.entities.lastIdAssigned += 1;
    const id = this.entities.lastIdAssigned;
    let body;
    if (shape === EntityShape.RECT) body = Matter.Bodies.rectangle(position.x, position.y, creationData.width, creationData.height);
    else if (shape === EntityShape.CIRCLE) body = Matter.Bodies.circle(position.x, position.y, creationData.radius);
    else if (shape === EntityShape.POLY) body = Matter.Bodies.polygon(position.x, position.y, creationData.sides, creationData.radius);
    if (!body) return;

    body.label = `${type}-${id}`;
    if (options?.static) body.isStatic = true;
    Matter.Composite.add(this.physicsEngine.world, body);
    const newEntity = new Entity(id, body, shape, !!options?.static);

    this.entities[type][id] = newEntity;
    return this.entities[type][id];
  }

  cleanup() {
    clearTimeout(this.intervals.physics);
    this.intervals.physics = undefined;
  }

  stepSimulation(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight) {
    this.intervals.physics = setTimeout(() => {
      this.updatePhysics(this);
      Matter.Engine.update(this.physicsEngine, this.renderRate);
      this.render(context, canvasSize, this);
      this.stepSimulation(context, canvasSize);
    }, this.renderRate);
  }
}
