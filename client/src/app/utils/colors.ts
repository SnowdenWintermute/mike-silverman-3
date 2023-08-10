import { lerp } from ".";

export interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export function rgba(red: number, green: number, blue: number, alpha?: 1) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function hsl(hue: number, saturation: number, lightness: number, alpha?: 1) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function lerpColor(color1: RGBColor, color2: RGBColor, percentage: number) {
  return {
    red: lerp(color1.red, color2.red, percentage),
    green: lerp(color1.green, color2.green, percentage),
    blue: lerp(color1.blue, color2.blue, percentage),
  };
}

export function hslToRgb(hsl: HSLColor): RGBColor {
  const { hue, saturation, lightness } = hsl;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const huePrime = hue / 60;
  const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  let red = 0;
  let green = 0;
  let blue = 0;

  if (huePrime >= 0 && huePrime <= 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime <= 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime <= 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime <= 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime <= 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime <= 6) {
    red = chroma;
    blue = secondComponent;
  }

  const lightnessAdjustment = lightness - chroma / 2;
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
  };
}

export function blendColors(baseColor: RGBColor, lightColor: RGBColor): RGBColor {
  const blendedColor = {
    red: Math.sqrt(baseColor.red * baseColor.red + lightColor.red * lightColor.red),
    green: Math.sqrt(baseColor.green * baseColor.green + lightColor.green * lightColor.green),
    blue: Math.sqrt(baseColor.blue * baseColor.blue + lightColor.blue * lightColor.blue),
  };

  return {
    red: Math.min(255, Math.round(blendedColor.red)),
    green: Math.min(255, Math.round(blendedColor.green)),
    blue: Math.min(255, Math.round(blendedColor.blue)),
  };
}
