import * as express from 'express';
import * as fs from 'fs';

const port = 8055;

express()
  .post('/upload', (req: any, res) => {
    req.pipe(fs.createWriteStream('uploads/my-test.png'));
    req.on('end', () => {
      res.json({ status: 'complete' });
    });
  })
  .get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
  })
  .listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
