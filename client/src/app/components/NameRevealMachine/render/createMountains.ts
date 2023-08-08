import { WidthAndHeight } from "@/app/types";
import createRandomMountain from "./drawMountains/createRandomMountain";
import { workerData } from "worker_threads";

export default function createMountains(worldSize: WidthAndHeight) {
  const mountainBGRidgelineAttributes = {
    amplitude: 50,
    numberOfPoints: 30,
    wavelength: 3,
    numberOfOctaves: 3,
  };
  const mountainFGRidgelineAttributes = {
    amplitude: 220,
    numberOfPoints: 30,
    wavelength: 8,
    numberOfOctaves: 4,
    useLerp: false,
  };

  const mountainBGBaselineY = worldSize.height / 2 + mountainBGRidgelineAttributes.amplitude - worldSize.height / 10;
  const mountainBG = createRandomMountain(mountainBGRidgelineAttributes, mountainBGBaselineY, worldSize.width);
  const mountainFGBaselineY = worldSize.height / 2 + mountainFGRidgelineAttributes.amplitude + worldSize.height / 10;
  const mountainFG = createRandomMountain(mountainFGRidgelineAttributes, mountainFGBaselineY, worldSize.width);
  return { mountainBG, mountainFG };
}
