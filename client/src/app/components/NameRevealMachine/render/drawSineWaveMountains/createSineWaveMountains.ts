import { randBetween } from "@/app/utils";
import createSineWaveMountain from "./createSineWaveMountain";
import { SineWaveMountain } from "./createSineWaveMountain";
import { baseWorldSize } from "@/app/components/MatterSim/consts";

export default function createSineWaveMountains(numMountains: number) {
  const sineMountains: SineWaveMountain[] = [];
  const spaceBetweenMountains = baseWorldSize.width / numMountains;

  for (let i = -spaceBetweenMountains; i < numMountains; i += 1) {
    const mountain = createSineWaveMountain(
      { width: randBetween(baseWorldSize.width / 1.5, baseWorldSize.width / 2.5), height: randBetween(baseWorldSize.height / 1.5, baseWorldSize.height / 2.5) },
      // spaceBetweenMountains * i - spaceBetweenMountains / 2,
      spaceBetweenMountains * i,
      baseWorldSize.height / 2.7 + randBetween(0, baseWorldSize.height / 2),
      // baseWorldSize.height/3
      randBetween(30, 75)
    );
    sineMountains.push(mountain);
  }

  sineMountains.sort((a, b) => (a.yOffset > b.yOffset ? 1 : -1));
  return sineMountains;
}
