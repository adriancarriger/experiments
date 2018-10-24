const fs = require('fs');
const Vue = require('vue');
const Vuex = require('vuex');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();

const ChildComponent = require('./child-component');

const {
  mapState
} = Vuex;

server.get('*', (req, res) => {
  Vue.use(Vuex);

  const store = new Vuex.Store({
    strict: true,
    state: () => ({
      loading: false,
      test: 'hello 123123123 5555'
    })
  });

  const app = new Vue({
    store,
    components: {
      ChildComponent
    },
    computed: mapState(['loading']),
    data: {
      url: req.url,
      morning: true
    },
    template: fs.readFileSync('src/my-test.xml', 'utf8')
  });

  const context = {
    test1: 'value1'
  };

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`<?xml version="1.0" ?>${html.split('data-server-rendered="true"').join('')}`);
  })
})

server.listen(7080);
