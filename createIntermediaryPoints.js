const distance = (a, b) =>
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

const createIntermediaryPoints = (minInterval, maxInterval) => (random) => (
  origin,
  destination
) => {
  const getInterval = () =>
    random() * (maxInterval - minInterval) + minInterval;

  const dist = distance(origin, destination);
  const unitVectorX = (destination[0] - origin[0]) / dist;
  const unitVectorY = (destination[1] - origin[1]) / dist;
  const unitVector = [unitVectorX, unitVectorY];

  const points = [];
  for (
    let currentDist = maxInterval;
    currentDist <= dist - maxInterval;
    currentDist += getInterval()
  ) {
    const newPoint = [unitVector[0] * currentDist, unitVector[1] * currentDist];
    points.push(newPoint);
  }
  return points;
};

export default createIntermediaryPoints;
