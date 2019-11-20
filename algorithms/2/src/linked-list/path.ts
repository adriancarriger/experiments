export default (paths: string[][]) => {
  const routes = {};
  const destinations = [];
  const origins = [];

  // Hashify
  paths.forEach(([origin, destination]) => {
    routes[origin] = destination;
    destinations.push(destination);
    origins.push(origin);
  });

  // Find starting point
  const startingPoint = origins.find(origin => !destinations.includes(origin));

  // Piece together the routes
  const result = [startingPoint];

  let currentNode = startingPoint;
  while (currentNode in routes) {
    currentNode = routes[currentNode];
    result.push(currentNode);
  }

  return result;
};
