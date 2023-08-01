import { Vector } from "matter-js";
import { Entity } from "./Entity";

export enum EntityType {
  MOBILE,
  STATIC,
}

export enum EntityShape {
  RECT,
  CIRCLE,
  POLY,
}

export type ShapeCreationData =
  | { shape: EntityShape.RECT; width: number; height: number }
  | { shape: EntityShape.CIRCLE; radius: number }
  | { shape: EntityShape.POLY; sides: number; radius: number };

export class MatterSimEntities {
  lastIdAssigned = -1;
  [EntityType.MOBILE]: { [id: number]: Entity } = {};
  [EntityType.STATIC]: { [id: number]: Entity } = {};
}
