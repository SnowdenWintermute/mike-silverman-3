import { HSLColor } from "@/app/utils/colors";

export const CELESTIAL_ANGLES = {
  HIGH_NOON: Math.PI / 2,
  SUNSET: Math.PI,
  MIDNIGHT: -Math.PI / 2,
  SUNRISE: 0,
  MORNING_HORIZON: 1.0,
  EARLY_MORNING: 1.2,
  LATE_MORNING: 1.4,
  EARLY_EVENING: 1.9,
  LATE_EVENING: 2,
  EVENING_HORIZON: 2.1,
};

export const MOUNTAIN_MATERIAL: HSLColor = {
  hue: 232,
  saturation: 14,
  lightness: 50,
};
