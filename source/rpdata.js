const nightmare = require('nightmare')({
  show: true,
  typeInterval: 20,
});

const search = ({ address }) => nightmare
  .goto('https://rpp.rpdata.com/rpp/login.html')
  .type('#j_username', 'gerardcole')
  .type('#j_password', 'gcp22222')
  .click('.btn.btn--primary.floatLeft')
  .wait('#searchAddressSimple input')
  .wait(50)
  .evaluate((address) => document.querySelector('#searchAddressSimple input').value = address, address)
  .click('#searchAddressSimple>a')
  .wait('#ownershipPanel')
  .evaluate(() => document.querySelector('#propertySearchOwnerNameLink').innerHTML)
  .catch(console.error);

module.exports = {
  search,
}
