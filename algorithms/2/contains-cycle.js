class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// function containsCycle(firstNode) {
//   let currentNode = firstNode;
//   const nodeList = []
//   while (true) {
//     if (!currentNode || !currentNode.next) {
//       return false
//     }

//     if (nodeList.includes(currentNode)) {
//       return true;
//     }

//     nodeList.push(currentNode);
//     currentNode = currentNode.next;
//   }
// }

function containsCycle(firstNode) {
  let slowRunner = firstNode;
  let fastRunner = firstNode;

  while (fastRunner && fastRunner.next && fastRunner.next.next && fastRunner.next.next.next) {
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next.next.next;

    if (slowRunner === fastRunner) {
      return true;
    }
  }

  return false;
}

// Tests
let desc = 'linked list with no cycle';
let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
assertEquals(containsCycle(nodes[0]), false, desc);

desc = 'cycle loops to beginning';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
nodes[3].next = nodes[0];
assertEquals(containsCycle(nodes[0]), true, desc);

desc = 'cycle loops to middle';
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
nodes[4].next = nodes[2];
assertEquals(containsCycle(nodes[0]), true, desc);

desc = 'two node cycle at end';
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
nodes[4].next = nodes[3];
assertEquals(containsCycle(nodes[0]), true, desc);

desc = 'empty list';
assertEquals(containsCycle(null), false, desc);

desc = 'one element linked list no cycle';
let firstNode = new LinkedListNode(1);
assertEquals(containsCycle(firstNode), false, desc);

desc = 'one element linked list cycle';
firstNode = new LinkedListNode(1);
firstNode.next = firstNode;
assertEquals(containsCycle(firstNode), true, desc);

function valuesToLinkedListNodes(values) {
  const nodes = [];
  for (let i = 0; i < values.length; i++) {
    const node = new LinkedListNode(values[i]);
    if (i > 0) {
      nodes[i - 1].next = node;
    }
    nodes.push(node);
  }
  return nodes;
}

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
