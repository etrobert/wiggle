import { makeSmooth } from "./makeSmooth.js";
import wigglePoint from "./wigglePoint.js";

import createRandom from "./createRandom.js";
import createIntermediaryPoints from './createIntermediaryPoints.js';

const random = createRandom(2);

const makePoints = (origin, destination) => {
  const minInterval = parseFloat(document.getElementById("min-interval").value);
  const maxInterval = parseFloat(document.getElementById("max-interval").value);
  const points = createIntermediaryPoints(minInterval, maxInterval)(random)(
    origin,
    destination
  );

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

    const length = parseFloat(document.getElementById('length').value);

    const points = makePoints([0, 0], [length, 0]);
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
