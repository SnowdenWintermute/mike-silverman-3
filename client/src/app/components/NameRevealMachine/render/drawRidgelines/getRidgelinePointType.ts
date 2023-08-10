export enum RidglelinePointType {
  PEAK,
  VALLEY,
  SLOPE,
}

export default function getRidgelinePointType(perlins: number[], i: number) {
  const curr = perlins[i];
  const prev = perlins[i - 1];
  const next = perlins[i + 1];
  const noPrev = typeof prev !== "number";
  const noNext = typeof next !== "number";
  if ((noPrev && curr < next) || (curr < prev && curr < next) || (noNext && curr < prev)) return RidglelinePointType.PEAK;
  if ((noPrev && curr > next) || (curr > prev && curr > next) || (noNext && curr > prev)) return RidglelinePointType.VALLEY;
  else return RidglelinePointType.SLOPE;
}
