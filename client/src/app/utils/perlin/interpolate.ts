export function cosineInterpolate(a: number, b: number, x: number) {
  var ft = x * Math.PI,
    f = (1 - Math.cos(ft)) * 0.5;
  return a * (1 - f) + b * f;
}

export function linearInterpolate(pa: number, pb: number, px: number) {
  return pa * (1 - px) + pb * px;
}

