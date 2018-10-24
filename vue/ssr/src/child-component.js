const fs = require('fs');
const {
  mapState
} = require('vuex');

module.exports = {
  name: 'child-component',
  template: fs.readFileSync('src/child-component.xml', 'utf8'),
  computed: {
    ...mapState(['test'])
  }
};
