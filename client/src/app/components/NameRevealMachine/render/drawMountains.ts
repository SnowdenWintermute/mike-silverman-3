import { perlin1D } from "@/app/utils/perlin";
import drawRandomMountain from "./drawRandomMountain";
import { WidthAndHeight } from "@/app/types";

const perlinAttributesA = {
  amplitude: 50,
  numberOfPoints: 30,
  wavelength: 3,
  numberOfOctaves: 3,
};
const perlinAttributesB = {
  amplitude: 80,
  numberOfPoints: 20,
  wavelength: 1,
  numberOfOctaves: 4,
};

const perlinsA = perlin1D(perlinAttributesA, true);
const perlinsB = perlin1D(perlinAttributesB, true);

export default function drawMountains(context: CanvasRenderingContext2D, canvasSize: WidthAndHeight) {
  drawRandomMountain(context, canvasSize, perlinAttributesA, perlinsA, "grey", -60);
  drawRandomMountain(context, canvasSize, perlinAttributesB, perlinsB, "#071c08", 50);
}
