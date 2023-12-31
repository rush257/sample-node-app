/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger/logger');

const app = express();

const port = process.env.PORT || 80;

console.log('environment::::::', process.env.ENVIRONMENT);
console.log('DB_CONNECTION_STR:::::::::::::', process.env.DB_CONNECTION_STR);
console.log('DB USERNAME::::::', process.env.DB_USERNAME);
console.log('DB PASSWORD::::::', process.env.DB_PASSWORD);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  logger.info('default route');
  res.send(process.env.API_WORKS_MESSAGE);
});

app.use('/api', require('./routes/routes'));

// request to handle undefined or all other routes
app.get('*', (req, res) => {
  logger.info('users route');

  const user = [{ firstName: 'fnam1', lastName: 'lnam1', userName: 'username1' }];
  logger.info('users route1',user);
  // res.json(user);
  res.send(user);
});

app.listen(port, (err) => {
  if (err) {
    logger.error('Error::', err);
  }
  logger.info(`running server on from port:::::::${port}`);
});
