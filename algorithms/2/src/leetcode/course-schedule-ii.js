/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = (numCourses, prerequisites) => {
  // Find the base prerequisites
  const requirements = Array(numCourses).fill(0);
  const hash = {};

  prerequisites.forEach(([target, prerequisite]) => {
    hash[prerequisite] ||= [];
    hash[prerequisite].push(target);

    requirements[target] += 1;
  });

  const nodes = [];

  requirements.forEach((classesRequired, classId) => {
    if (classesRequired === 0) {
      nodes.push(classId);
    }
  });

  // Run a simulation of taking all the classes
  const order = [];

  while (nodes.length) {
    const node = nodes.pop();
    order.push(node);

    hash[node]?.forEach((nextClassId) => {
      requirements[nextClassId] -= 1;

      if (requirements[nextClassId] === 0) {
        nodes.push(nextClassId);
      }
    });
  }

  return order.length === numCourses ? order : [];
};
