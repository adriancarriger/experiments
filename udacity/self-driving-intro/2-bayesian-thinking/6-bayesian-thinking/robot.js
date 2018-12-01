const priors = { a: 1 / 3, b: 1 / 3, c: 1 / 3 };
const a = 0.9 * priors.a;
const b = (1 - 0.9) * priors.b;
const c = (1 - 0.9) * priors.c;

const normalizer = a + b + c;

const data = {
  a: a / normalizer,
  b: b / normalizer,
  c: c / normalizer
};

const total = data.a + data.b + data.c;

console.log('Items', a, b, c);
console.log('normalizer', normalizer);

console.log('data', data);
console.log('total', total);
