const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();


// Create app
const app = express();

// Install middleware
app.use(cookieParser());
app.use(bodyParser.json());

// Import API Routes
app.use('/auth', require('./routes/auth'));
// app.use('/db', require('./routes/db'));

// // Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

module.exports = {
  path: '/api',
  handler: app
}