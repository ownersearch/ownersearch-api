const express = require('express');
const { compact } = require('lodash')
const { SERVICE_UNAVAILABLE } = require('http-status-codes');

const { providersReady, rpData, whitePages } = require('../providers');
const getNameDetails = require('../utils/getNameDetails')

const router = express.Router();

router.get('/api/v1/restart', (req, res) => {
  res.json('restarting...');
  process.exit(0);
});

router.use((req, res, next) => {
  // ensure all providers have initialised and ready to process before accepting requests
  if (!providersReady()) {
    res.status(SERVICE_UNAVAILABLE).json()
  } else {
    next()
  }
})

router.get('/api/v1/search', (req, res) => {
  const { subPremise, streetNum, route, suburb, state, postcode, country } = req.query
  const streetPremNum = compact([subPremise, streetNum]).join('/') // Create the street num string, i.e. 406/21
  const address = compact([streetPremNum, route, suburb, state, postcode]).join(' ')  // Assemble the full address string the way RPdata likes it
  rpData.search({ address })
  .then(results => results.map(result => Object.assign(result, { suburb, postcode, state }))) // Suburb and postcode is added to the response
  .then(results => res.json(results))
})

router.get('/api/v1/people', (req, res) => {
  const { name, postcode } = req.query
  return whitePages.search(Object.assign(getNameDetails(name), { postcode }))
  .then(results => res.json(results))
})

module.exports = router;
