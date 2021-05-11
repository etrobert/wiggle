import { makeSmooth } from "./makeSmooth.js";
import wigglePoint from "./wigglePoint.js";

import createRandom from "./createRandom.js";

const random = createRandom(2);

const distance = (a, b) =>
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

const minInterval = 15;
const maxInterval = 50;
const getInterval = () => random() * (maxInterval - minInterval) + minInterval;
const createIntermediaryPoints = (origin, destination) => {
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

const makePoints = (origin, destination) => {
  const points = createIntermediaryPoints(origin, destination);

  const wiggliness = document.getElementById("wiggliness").value;

  return [origin, ...points.map(wigglePoint(wiggliness)(random)), destination];
};

const paths = document.querySelectorAll("path");

const updatePaths = () => {
  paths.forEach((path) => {
    // const [first, ...points] = makePoints([0, 0], [100, 0]);

    // const pointToL = ([x, y]) => `L${x},${y}`;

    // const ls = points.map(pointToL).join(" ");
    // path.setAttributeNS("", "d", `M${first[0]},${first[1]} ${ls}`);

    const points = makePoints([0, 0], [300, 0]);
    const transformPoint = ([x, y]) => ({ x, y });
    const theD = makeSmooth(points.map(transformPoint));
    path.setAttributeNS("", "d", theD);
  });
};

document.querySelector("form").onchange = updatePaths;
const thicknessInput = document.getElementById("thickness");

const updateThickness = () =>
  document
    .querySelectorAll("path")
    .forEach((e) => (e.style.strokeWidth = thicknessInput.value));
thicknessInput.onchange = updateThickness;

updateThickness();
updatePaths();
