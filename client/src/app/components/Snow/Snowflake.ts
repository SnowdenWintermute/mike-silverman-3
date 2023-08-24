import { Vector } from "matter-js";

export default class Snowflake {
  width: number;
  height: number;
  z: number;
  area: number;
  color: string = "rgb(255, 255, 255)";
  falling: boolean = true;
  constructor(public x: number, public y: number) {
    this.height = Math.floor(Math.random() * 3 + 1);
    this.width = Math.floor(Math.random() * 3 + 1);
    this.z = Math.floor(Math.random() * 3 + 1);
    this.area = this.height * this.width;
  }

  fall(groundLevel: number, areaWidth: number) {
    if (!this.falling) return;
    if (this.y >= groundLevel) {
      this.y = Math.random() * -30;
      this.x = Math.random() * areaWidth;
    } else this.y += this.area / 3;
  }
}
