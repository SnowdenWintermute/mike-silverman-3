import Matter from "matter-js";

export class Entity {
  id: number;
  body: Matter.Body;
  constructor(id: number, body: Matter.Body, isStatic: boolean) {
    this.id = id;
    this.body = body;
    this.body.isSensor = isStatic;
  }
}
