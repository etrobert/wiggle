// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
var seed = 1;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const paths = document.querySelectorAll('path');

// something is between 10 -10
const getOffset = () => random() * 20 - 10;

const wigglePoint = ([x, y]) => [x + getOffset(), y + getOffset()];

const pointToL = ([x, y]) => `L${x},${y}`;

// const wiggledPoints = points.map(wigglePoint);

const makePoints = e => e.map(wigglePoint);

const originAndDestination = [[0, 0], [50, 0], [100, 0]];

paths.forEach(path => {
  const [first, ...points] = makePoints(originAndDestination);

  const ls = points.map(pointToL).join(' ');
  path.setAttributeNS('', 'd', `M${first[0]}${first[1]} ${ls}`);
})
