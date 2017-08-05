const nightmare = require('nightmare')({
    show: true,
    typeInterval: 70,
});

initialised = false;

const initialise = () => {

    if (!initialised) {
        nightmare
        .goto('https://rpp.rpdata.com/rpp/login.html')
        .type('#j_username', 'gerardcole')
        .type('#j_password', 'gcp22222')
        .click('.btn.btn--primary.floatLeft')
        .wait('#searchAddressSimple input')
        .then(() => {
            initialised = true;
        });
    }
};

const search = ({ address }) => nightmare
    .goto('https://rpp.rpdata.com/rpp/loadSummary.html')
    .evaluate((address) => document.querySelector('#searchAddressSimple input').value = address, address)
    .click('#addressLink')
    .wait(5000)
    // .evaluate(() => document.querySelector('#propertySummaryList > div:nth-child(4) > div > div.floatLeft.contentContainer > div.heading > h2 > a').innerHTML)
    // .then((name) => [name])
    // .catch(console.error);
    // .evaluate((address) => document.querySelector('#searchAddressSimple input').value = address, address)
    // .click('#searchAddressSimple>a')
    // .wait('#ownershipPanel')

const isReady = () => initialised;

module.exports = {
    initialise,
    isReady,
    search,
};

// const search = ({ address }) => nightmare
//     .goto('https://rpp.rpdata.com/rpp/login.html')
//     .type('#j_username', 'gerardcole')
//     .type('#j_password', 'gcp22222')
//     .click('.btn.btn--primary.floatLeft')
//     .wait('#searchAddressSimple input')
//     .wait(50)
//     .evaluate((address) => document.querySelector('#searchAddressSimple input').value = address, address)
//     .click('#searchAddressSimple>a')
//     .wait('#ownershipPanel')
//     .evaluate(() => document.querySelector('#propertySearchOwnerNameLink').innerHTML)
//     .then((name) => [name])
//     .catch(console.error);
