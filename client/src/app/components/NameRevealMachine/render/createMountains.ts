import { WidthAndHeight } from "@/app/types";
import createRandomMountain from "./drawMountains/createRandomMountain";

export default function createMountains(worldSize: WidthAndHeight) {
  const mountainBGRidgelineAttributes = {
    amplitude: 50,
    numberOfPoints: 30,
    wavelength: 3,
    numberOfOctaves: 3,
  };
  const mountainFGRidgelineAttributes = {
    amplitude: 540,
    numberOfPoints: 960,
    wavelength: 960,
    numberOfOctaves: 4,
    useLerp: false,
  };

  const mountainBGBaselineY = worldSize.height / 2 + mountainBGRidgelineAttributes.amplitude - 60;
  const mountainBG = createRandomMountain(mountainBGRidgelineAttributes, mountainBGBaselineY, worldSize.width);
  const mountainFGBaselineY = worldSize.height / 2 + mountainFGRidgelineAttributes.amplitude + 150;
  const mountainFG = createRandomMountain(mountainFGRidgelineAttributes, mountainFGBaselineY, worldSize.width);
  return { mountainBG, mountainFG };
}
