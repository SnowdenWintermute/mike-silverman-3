import Matter from "matter-js";
import { EntityShape } from "./MatterSimEntities";

export class Entity {
  constructor(public id: number, public body: Matter.Body, public shape: EntityShape, public color: string, isStatic: boolean) {
    this.body.isStatic = isStatic;
  }
}
