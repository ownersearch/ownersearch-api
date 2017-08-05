const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SERVICE_UNAVAILABLE } = require('http-status-codes');

const { providersReady, rpData, whitePages } = require('../providers');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {

    // ensure all providers have initialised and ready to process before accepting requests
    if (!providersReady()) {
        res.status(SERVICE_UNAVAILABLE).json();
    } else {
        next();
    }
});

// Eg: http://localhost:3000/api/v1/search?address=406/21%20Enmore%20Road%20Newtown%20NSW%202042
app.get('/api/v1/search', (req, res) => {

    const { address } = req.query;

    rpData.search({ address }).then((names) => {

        return Promise.map(names, (name) => {
            return whitePages.search({ type: 'residential', name });
        });
    })
    .then((results) => res.json(results));
});

////whitepages.searchBusiness({
////  name: 'Ecolight',
////}).then((response) => {
////  console.log(response.data.results)
////})

const providerInterconnect = [{
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

module.exports = app;
