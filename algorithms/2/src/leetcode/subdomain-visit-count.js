/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = (cpdomains) => {
  const hash = {};

  cpdomains.forEach((cpdomain) => {
    const [amountBase, domain] = cpdomain.split(' ');
    const amount = Number(amountBase);

    let partial = [];
    domain
      .split('.')
      .reverse()
      .forEach((part) => {
        partial.unshift(part);
        const key = partial.join('.');
        hash[key] = (hash[key] || 0) + amount;
      });
  });

  return Object.entries(hash).map(([key, value]) => `${value} ${key}`);
};
