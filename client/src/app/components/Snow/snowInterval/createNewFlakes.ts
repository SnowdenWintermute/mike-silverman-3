import Snowflake from "../Snowflake";

export default function createNewFlakes(snowflakes: React.MutableRefObject<Snowflake[]>, flakeLimit: number, newFlakesPerTick: number, windowWidth: number) {
  if (snowflakes.current.length >= flakeLimit) return;
  for (let i = newFlakesPerTick; i > 0; i--) snowflakes.current.push(new Snowflake(Math.random() * windowWidth, Math.random() * -20));
}
