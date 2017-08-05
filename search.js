const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')

const whitePages =  require('./source/whitepages')
const personLookup =  require('./source/personLookup')
const rpData =  require('./source/rpdata')

const app = express()

// Parse application/json
app.use(bodyParser.json())
app.use(cors())

// Eg: http://localhost:3003/api/v1/search?address=406/21%20Enmore%20Road%20Newtown%20NSW%202042
app.use('/api/v1/search', (req, res) => {

  const { address } = req.query

  rpData.search({ address })
  .then((name) => whitePages.searchResi({ name }))
  .then((response) => res.json(response))
})

// Create the server
http.createServer(app).listen(3003)


////whitepages.searchBusiness({
////  name: 'Ecolight',
////}).then((response) => {
////  console.log(response.data.results)
////})

const providers = [{
    name: 'white pages',
    inputs: ['name'],
    outputs: ['phone', 'address']
}, {
    name: 'person lookup',
    inputs: ['name'],
    outputs: ['phone', 'address']
}, {
    name: 'data detective',
    inputs: ['name', 'address'],
    outputs: ['phone', 'address']
}];
