export function findDuplicates(files) {
  const filesHash = files.reduce((previous, current) => {
    previous[current.shasum] = previous[current.shasum] || [];
    previous[current.shasum].push(current.name);
    return previous;
  }, {});

  return Object.keys(filesHash).reduce((previous, current) => {
    if (filesHash[current].length > 1) {
      previous.push(filesHash[current]);
    }
    return previous;
  }, []);
}
