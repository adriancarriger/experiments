import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

const port = 8055;

express()
  .use(bodyParser.json())
  .post('/upload', (req: any, res) => {
    console.log(req.body);
    req.pipe(fs.createWriteStream('uploads/my-test.png'));
    req.on('end', () => {
      res.json({ status: 'complete' });
    });
  })
  .get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
  })
  .listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
