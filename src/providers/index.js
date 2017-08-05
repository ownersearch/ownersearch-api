const whitePages = require('./whitepages');
const personLookup = require('./personLookup');
const rpData = require('./rpdata');

// this structure allows for providers to be accessed
// as both an array and a hash
const providers = [
    whitePages,
    personLookup,
    rpData
];

const providersReady = () => providers.every((provider) => provider.isReady());

const initialise = () => providers.forEach((provider) => provider.initialise());

module.exports = {
    initialise,
    providersReady,
    whitePages,
    personLookup,
    rpData,
};
