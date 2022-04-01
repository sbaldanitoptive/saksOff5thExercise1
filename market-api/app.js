const express = require('express');
const app = express();
var logger = require('morgan');

const config = require('./src/config/');

app.use(
  logger(
    ':date[iso] :method :url :status :response-time ms - content-length :res[content-length]\n'
  )
);

const environment = process.env.NODE_ENV || 'development';

app.get('/', function (req, res) {
  // TODO: Add default view
  res.send('Hello World');
});

app.post('/login', () => {
  // TODO: Implement login
});

app.listen(config.port, () => {
  console.log('app listening on port:', config.port);
});
