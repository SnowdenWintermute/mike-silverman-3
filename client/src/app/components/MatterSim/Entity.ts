import Matter from "matter-js";
import { EntityShape } from "./MatterSimEntities";

export class Entity {
  constructor(public id: number, public body: Matter.Body, public shape: EntityShape, isStatic: boolean) {
    this.body.isSensor = isStatic;
  }
}
