const fs = require('fs');
const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      morning: true
    },
    template: fs.readFileSync('src/my-test.xml', 'utf8')
  });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`<?xml version="1.0" ?>${html.split('data-server-rendered="true"').join('')}`);
  })
})

server.listen(7080);
