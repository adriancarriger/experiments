// http://jsfiddle.net/7vq9612h/
const colors = {
  red: '#f4a299',
  yellow: '#fef1b2',
  green: '#8dd7a9',
  blue: '#6ebfdf'
}
// create an array with nodes
var nodes = new vis.DataSet([{
    id: 1,
    label: 'A',
    color: colors.blue,
    physics: false,
    x: 5,
    y: 5
  }, {
    id: 2,
    label: 'B',
    color: colors.green
  }, {
    id: 3,
    label: 'C',
    color: colors.yellow
  }, {
    id: 4,
    label: 'D',
    color: colors.red
  }, {
    id: 5,
    label: 'E',
    color: colors.blue
  }, {
    id: 6,
    label: 'F',
    color: colors.red
  }, {
    id: 7,
    label: 'G',
    color: colors.green
  },
  {
    id: 8,
    label: 'H',
    color: colors.red
  }, {
    id: 9,
    label: 'I',
    color: colors.blue
  },
  {
    id: 10,
    label: 'J',
    color: colors.green
  },
  {
    id: 11,
    label: 'K',
    color: colors.yellow
  },
  {
    id: 12,
    label: 'L',
    color: colors.yellow
  }
]);

// create an array with edges
var edges = new vis.DataSet([{
    from: 1,
    to: 2
  }, {
    from: 2,
    to: 3
  }, {
    from: 3,
    to: 4
  }, {
    from: 4,
    to: 5
  }, {
    from: 5,
    to: 6
  }, {
    from: 6,
    to: 7
  }, {
    from: 7,
    to: 1
  },
  {
    from: 7,
    to: 8
  }, {
    from: 8,
    to: 1
  },
  {
    from: 8,
    to: 12
  },
  {
    from: 12,
    to: 9
  },
  {
    from: 9,
    to: 2
  },
  {
    from: 12,
    to: 10
  },
  {
    from: 10,
    to: 4
  },
  {
    from: 10,
    to: 11
  },
  {
    from: 11,
    to: 5
  },
  {
    from: 11,
    to: 6
  },
  {
    from: 9,
    to: 3
  }
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
  nodes: nodes,
  edges: edges
};

var options = {
  layout: {
    randomSeed: 3,
    improvedLayout: true,
    hierarchical: {
      enabled: false,
      levelSeparation: 180,
      direction: 'UD', // UD, DU, LR, RL
      sortMethod: 'hubsize' // hubsize, directed
    }
  }
}

// initialize your network!
var network = new vis.Network(container, data, options);
var nodeNo = 6;
