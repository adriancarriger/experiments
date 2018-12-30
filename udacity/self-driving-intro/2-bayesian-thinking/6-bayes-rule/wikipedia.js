// https://en.wikipedia.org/wiki/Posterior_probability

const percentGirls = 0.4;
const percentBoys = 1 - percentGirls;

const trousersGirl = 0.5;
const trouserBoy = 1;

(percentGirls * trousersGirl) / (percentBoys * trouserBoy + percentGirls * trousersGirl);
