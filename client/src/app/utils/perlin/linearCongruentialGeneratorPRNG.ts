// from https://blog.oliverbalfour.com/javascript/2016/03/19/1d-perlin-noise.html
const M = 4294967296; // a - 1 should be divisible by m's prime factors
const A = 1664525; // c and m should be co-prime
const C = 1;

export default function linearCongruentialGeneratorPRNG() {
  let seed = Math.floor(Math.random() * M);
  seed = (A * seed + C) % M;
  return seed / M;
}
