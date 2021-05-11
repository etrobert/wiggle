
// const wiggliness = 9;
const getOffset = (wiggliness) => (random)=> random() * wiggliness - wiggliness / 2;

const wigglePoint = (wiggliness) => (random) => ([x, y]) => [
  x + getOffset(wiggliness)(random),
  y + getOffset(wiggliness)(random),
];

export default wigglePoint;
