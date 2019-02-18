#!/usr/bin/env ts-node

import * as http from 'http';

import { createServer } from '../src/index';

export async function startServer({ name }) {
  const server = await createServer();
  const hostname = '0.0.0.0';
  const port = 8080;

  const message = `
     server listening on:
    http://${hostname}:${port}
  `;

  http.createServer(server).listen(port, hostname, () => {
    console.log(message); // tslint:disable-line
  });
}

startServer({ name: 'test' });
