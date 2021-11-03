const squareRootOfFive = Math.sqrt(5);
const A = (1 + squareRootOfFive) / 2;
const B = (1 - squareRootOfFive) / 2;

// https://artofproblemsolving.com/wiki/index.php/Binet%27s_Formula
const getFib = (n: number) =>
  Math.round((Math.pow(A, n) - Math.pow(B, n)) * (1 / squareRootOfFive));

export default getFib;
