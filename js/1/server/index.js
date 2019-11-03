const http = require('http');
const fs = require('fs');

const state = {
  image: ''
};

const server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  // Router
  if (request.url === '/current-byte') {
    routeCurrentByte(request, response);
  } else if (request.url === '/upload') {
    routeUpload(request, response);
  } else {
    console.log('no route found');
  }
});

server.listen(3000, () => {
  console.log('listening on 3000');
});

function routeCurrentByte(request, response) {
  console.log('get request!', state.image.length);

  response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
  response.write(JSON.stringify({ bytes: state.image.length }));
  response.end();
}

function routeUpload(request, response) {
  let chunk = '';

  request.on('data', data => {
    chunk += data;
  });

  request.on('end', () => {
    processChunk(chunk);
  });

  response.end('End');
}

function processChunk(chunk) {
  if (chunk === 'Start') {
    state.image = '';
  } else if (chunk === 'End') {
    const mybuffer = Buffer.from(
      state.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2],
      'base64'
    );

    fs.writeFile('my-image.png', mybuffer, error => {
      if (error) {
        throw error;
      }

      state.image = '';
      console.log('Saved file!');
    });
  } else {
    state.image += chunk;
  }
}
