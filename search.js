

const express = require('express')
const http = require('http')
const compression = require('compression')
const bodyParser = require('body-parser')
const whitePages =  require('./source/whitepages')
const personLookup =  require('./source/personLookup')
const rpData =  require('./source/rpdata')

const port = 3000

const app = express()

// Parse application/json
app.use(bodyParser.json())

// Eg: http://localhost:3000/api/v1/search?address=406/21%20Enmore%20Road%20Newtown%20NSW%202042
app.use('/api/v1/search', (req, res) => {
  rpData.search({
    address: req.query.address,
  }).then(name => whitePages.searchResi({
      name: name,
    }).then(response => {
      console.log(response)
      res.json(response)
    })
  )
})

// Create the server
http.createServer(app)
  .listen(port);



////whitepages.searchBusiness({
////  name: 'Ecolight',
////}).then((response) => {
////  console.log(response.data.results)
////})