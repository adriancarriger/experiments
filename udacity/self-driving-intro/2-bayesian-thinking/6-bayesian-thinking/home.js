const priors = {
  gone: 0.6,
  home: 0.4
};

const home = 0.01 * 0.4;
const gone = 0.3 * 0.6;

const normalizer = home + gone;

console.log(home / normalizer);
