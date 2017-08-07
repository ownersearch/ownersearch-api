const express = require('express');
const { SERVICE_UNAVAILABLE } = require('http-status-codes');

const { providersReady, rpData, whitePages } = require('../providers');

const router = express.Router();

router.get('/api/v1/restart', (req, res) => {
    res.json('restarting...');
    process.exit(0);
});

router.use((req, res, next) => {

    // ensure all providers have initialised and ready to process before accepting requests
    if (!providersReady()) {
        res.status(SERVICE_UNAVAILABLE).json();
    } else {
        next();
    }
});

// Eg: http://localhost:3000/api/v1/search?address=406/21%20Enmore%20Road%20Newtown%20NSW%202042
router.get('/api/v1/search', (req, res) => {

    const { address } = req.query;

    rpData.search({ address }).then((properties) => {
        return properties;
//        return Promise.map(properties, (property) => {
//            return whitePages.search({ type: 'residential', name: property.fields['Owner Name'] });
//        });
    })
    .then((results) => res.json(results));
});

module.exports = router;
