const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SERVICE_UNAVAILABLE } = require('http-status-codes');

const websiteServer = require('./website-server');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(websiteServer);

module.exports = app;
