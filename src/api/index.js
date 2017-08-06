const Promise = require('bluebird')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { SERVICE_UNAVAILABLE } = require('http-status-codes')

const { providersReady, rpData, whitePages } = require('../providers')
const getNameDetails = require('../utils/getNameDetails')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
  // ensure all providers have initialised and ready to process before accepting requests
  if (!providersReady()) {
    res.status(SERVICE_UNAVAILABLE).json()
  } else {
    next()
  }
})

app.get('/api/v1/search', (req, res) => {
  const { subPremise, streetNum, route, suburb, state, postcode, country } = req.query
  const street = [subPremise ? subPremise+'/' : '', streetNum+' ', route].join('') // Create the street string, i.e. 406/21 Enmore Rd
  const address = `${street} ${suburb} ${state} ${postcode}` // Assemble the full address string the way RPdata likes it
  rpData.search({ address })
  .then(results => results.map(result => Object.assign(result, { suburb, postcode, state }))) // Suburb and postcode is added to the response
  .then(results => res.json(results))
})

app.get('/api/v1/people', (req, res) => {
  const { name, postcode } = req.query
  return whitePages.search(Object.assign(getNameDetails(name), { postcode }))
  .then(results => res.json(results))
})

const providerInterconnect = [{
  name: 'white pages',
  inputs: ['name'],
  outputs: ['phone', 'address'],
}, {
  name: 'person lookup',
  inputs: ['name'],
  outputs: ['phone', 'address'],
}, {
  name: 'data detective',
  inputs: ['name', 'address'],
  outputs: ['phone', 'address'],
}]

module.exports = app
