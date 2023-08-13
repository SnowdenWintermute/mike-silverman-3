import { percentBetweenTwoNumbers } from "@/app/utils";
import { lerpColor } from "@/app/utils/colors";
import { CELESTIAL_ANGLES, SUN_COLORS } from "../consts";

export default function determineSunColor(sunAngle: number) {
  const { HIGH_NOON, MORNING_HORIZON, EARLY_MORNING, LATE_MORNING, EVENING_HORIZON, EARLY_EVENING, LATE_EVENING } = CELESTIAL_ANGLES;
  let sunColor = { red: SUN_COLORS.RED.red, green: SUN_COLORS.RED.green, blue: SUN_COLORS.RED.blue };

  if (sunAngle >= MORNING_HORIZON && sunAngle < EARLY_MORNING) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, MORNING_HORIZON, EARLY_MORNING);
    sunColor = lerpColor(SUN_COLORS.RED, SUN_COLORS.ORANGE, percentAngle);
  } else if (sunAngle >= EARLY_MORNING && sunAngle < LATE_MORNING) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, EARLY_MORNING, LATE_MORNING);
    sunColor = lerpColor(SUN_COLORS.ORANGE, SUN_COLORS.WHITE, percentAngle);
  } else if (sunAngle >= LATE_MORNING && sunAngle < HIGH_NOON) {
    sunColor = SUN_COLORS.WHITE;
  } else if (sunAngle >= HIGH_NOON && sunAngle < EARLY_EVENING) {
    sunColor = SUN_COLORS.WHITE;
  } else if (sunAngle >= EARLY_EVENING && sunAngle < LATE_EVENING) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, EARLY_EVENING, LATE_EVENING);
    sunColor = lerpColor(SUN_COLORS.WHITE, SUN_COLORS.ORANGE, percentAngle);
  } else if (sunAngle >= LATE_EVENING && sunAngle < EVENING_HORIZON) {
    const percentAngle = percentBetweenTwoNumbers(sunAngle, LATE_EVENING, EVENING_HORIZON);
    sunColor = lerpColor(SUN_COLORS.ORANGE, SUN_COLORS.RED, percentAngle);
  }

  return sunColor;
}
