export function containsCycle(firstNode) {
  let slowRunner = firstNode;
  let fastRunner = firstNode;

  while (fastRunner && fastRunner.next && fastRunner.next.next) {
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;

    if (slowRunner === fastRunner) {
      return true;
    }
  }

  return false;
}
