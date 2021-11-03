const arrayManipulation = (n, queries) =>
  queries
    .reduce((previous, [a, b, k]) => {
      previous[a - 1] = (previous[a - 1] || 0) + k;
      previous[b] = (previous[b] || 0) - k;

      return previous;
    }, [])
    .reduce(
      (previous, acceleration) => {
        const nextVelocity = previous.velocity + acceleration;

        return {
          velocity: nextVelocity,
          maxVelocity: Math.max(previous.maxVelocity, nextVelocity),
        };
      },
      { velocity: 0, maxVelocity: 0 }
    ).maxVelocity;
