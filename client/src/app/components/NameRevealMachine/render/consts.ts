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

export const STAR_COLORS = [`#afc9ff`, `#c7d8ff`, `#fff4f3`, `#ffe5cf`, `#ffd9b2`, `#ffc78e`, `#ffa651`];
export const SUN_COLORS = {
  RED: { red: 230, green: 30, blue: 0 },
  ORANGE: { red: 255, green: 167, blue: 0 },
  WHITE: { red: 255, green: 255, blue: 220 },
};

export const MOUNTAIN_MATERIAL: HSLColor = {
  hue: 203,
  saturation: 100,
  lightness: 50,
};
// export const MOUNTAIN_MATERIAL: HSLColor = {
//   hue: 180,
//   saturation: 50,
//   lightness: 50,
// };
