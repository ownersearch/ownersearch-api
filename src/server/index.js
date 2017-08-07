const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SERVICE_UNAVAILABLE } = require('http-status-codes');

const api = require('./api');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(api);

module.exports = app;
