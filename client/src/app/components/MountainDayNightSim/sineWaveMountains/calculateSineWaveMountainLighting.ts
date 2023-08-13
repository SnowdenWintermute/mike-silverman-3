export default function calculateSineWaveMountainLighting(maxLightness: number, minLightness: number, lightSourceAngle: number) {
  const lightnessRange = maxLightness - minLightness;
  let leftSideLightness = minLightness;
  let rightSideLightness = minLightness;
  const dayglowLightness = (maxLightness - minLightness) / 3;
  const overhead = -Math.PI / 2;
  const fullyRight = 0;
  const fullyLeft = -Math.PI;
  if (lightSourceAngle > fullyLeft && lightSourceAngle < fullyRight) {
    rightSideLightness = dayglowLightness;
    if (lightSourceAngle > fullyLeft && lightSourceAngle < overhead) {
      const percentAngle = (lightSourceAngle - fullyLeft) / (fullyRight - fullyLeft);
      rightSideLightness = minLightness + lightnessRange * percentAngle;
      leftSideLightness = minLightness + lightnessRange * (1 - percentAngle) * 2 * percentAngle;
    }
    if (lightSourceAngle < fullyRight && lightSourceAngle > overhead) {
      const percentAngle = (lightSourceAngle - fullyRight) / (fullyLeft - fullyRight);
      leftSideLightness = minLightness + lightnessRange * percentAngle;
      rightSideLightness = minLightness + lightnessRange * (1 - percentAngle) * 2 * percentAngle;
    }
  }
  return { left: leftSideLightness, right: rightSideLightness };
}

