const express = require('express');
const app = express();
var logger = require('morgan');

const config = require('./src/config/');
const dbService = require('./src/services/db.service');

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

// TODO: Define all Models, migrations and seeds
const DB = dbService(environment, config.migrate).start();

app.listen(config.port, () => {
  console.log('app listening on port:', config.port);
  return DB;
});
