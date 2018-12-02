/**
 * Inputs
 */
// P(C)
const popWithCancer = 0.1;
// P(Pos|C) => sensitivity
const testPositiveWithCancer = 0.9;
// P(Pos|¬C) => specificity
const testPositiveWithoutCancer = 0.5;

/**
 * Reverse inputs
 */
// P(¬C)
const popWithoutCancer = 1 - popWithCancer;
// P(Neg|C)
const testNegativeWithCancer = 1 - testPositiveWithCancer;
// P(Neg|¬C)
const testNegativeWithoutCancer = 1 - testPositiveWithoutCancer;

const data = {
  // P(C, Pos) = P(C) * P(Pos|C)
  truePositives: popWithCancer * testPositiveWithCancer,
  // P(¬C, Neg) = P(¬C) * P(Neg|¬C)
  falsePositives: popWithoutCancer * testPositiveWithoutCancer,
  // P(¬C, Pos) = P(¬C) * P(Neg|¬C)
  trueNegatives: popWithoutCancer * testPositiveWithoutCancer,
  // P(C, Neg) = P(C) * P(Neg|C)
  falseNegatives: popWithCancer * testNegativeWithCancer
};

// P(Pos) = P(C, Pos) + P(¬C, Neg)
data.totalPositives = data.truePositives + data.falsePositives;
// P(Neg) = P(¬C, Pos) + P(C, Neg)
data.totalNegatives = data.trueNegatives + data.falseNegatives;

const results = {
  // P(C|Pos) = P(C, Pos) / P(Pos)
  positiveWithCancer: data.truePositives / data.totalPositives,
  // P(¬C|Pos) = P(¬C, Neg) / P(Pos)
  positiveWithoutCancer: data.falsePositives / data.totalPositives,
  // P(C|Neg) = P(¬C, Pos) / P(Neg)
  negativeWithoutCancer: data.trueNegatives / data.totalNegatives,
  // P(¬C|Neg) = P(C, Neg) / P(Neg)
  negativeWithCancer: data.falseNegatives / data.totalNegatives
};

console.log(data);
console.log(results);

/**
 * Positives
 */
logResult('Chance of testing positive and having cancer', results.positiveWithCancer);
logResult('Chance of testing positive and not having cancer', results.positiveWithoutCancer);

/**
 * Negatives
 */
logResult('Chance of testing negative and not having cancer', results.negativeWithoutCancer);
logResult('Chance of testing negative and having cancer', results.negativeWithCancer);

function logResult(message, result) {
  const percent = Math.round(result * 10000) / 100;

  console.log(`${message} => ${percent}%`);
}
