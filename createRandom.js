/**
 * We need a seeded random number generator because the line has to
 * keep the same shape when we move it around
 */
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
const createRandom = (seed) => () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export default createRandom;
