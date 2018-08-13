import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

const app = express();

const { CLIENT_ID } = process.env;

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://adriancarriger.auth0.com/.well-known/jwks.json`
  }),
  audience: CLIENT_ID,
  issuer: `https://adriancarriger.auth0.com/`,
  algorithms: ['RS256']
});

app.use(cors());

// check security for anything under the secured route
app.use('/secured', jwtCheck);

// open call
app.get('/ping', (req, res) => {
  res.send("All good. You don't need to be authenticated to call this");
});

// secured call
app.get('/secured/ping', (req, res) => {
  res
    .status(200)
    .send("All good. You only get this message if you're authenticated");
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
