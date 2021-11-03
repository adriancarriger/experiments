/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = (numCourses, prerequisites) => {
  // Prerequisites remaining
  const remaining = Array(numCourses).fill(0);
  const hash = {};

  prerequisites.forEach(([target, prerequisite]) => {
    hash[prerequisite] ||= [];
    hash[prerequisite].push(target);

    remaining[target] += 1;
  });

  const nodes = [];

  // Find root nodes (base prerequisites)
  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i] === 0) {
      nodes.push(i);
    }
  }

  // Simulate taking classes from the base prerequisites (DFS)
  const order = [];

  while (nodes.length) {
    const node = nodes.pop();
    order.push(order);

    hash[node]?.forEach((target) => {
      // Check off prerequisites
      remaining[target] -= 1;

      if (remaining[target] === 0) {
        nodes.push(target);
      }
    });
  }

  return order.length === numCourses;
};
