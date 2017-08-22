const { mapKeys, camelCase } = require('lodash')
const qs = require('querystring')
const Nightmare = require('nightmare')

const nightmare = Nightmare({
  show: true,
  typeInterval: 70,
})


let initialised = false

const login = () => nightmare
  .goto('https://rpp.rpdata.com/rpp/login.html')
  .type('#j_username', 'gerardcole')
  .type('#j_password', 'gcp22222')
  .click('.btn.btn--primary.floatLeft')
  .wait('#searchAddressSimple input')
  .then(() => {
    initialised = true
  })

const initialise = () => {
  if (!initialised) {
    login()
  }
}

const convertKeysToCamelCase = properties => properties.map(property => mapKeys(property, (val, key) => camelCase(key)))
const convertOwnerNameIntoArray = properties => properties.map(property => Object.assign(property, { owners: property.ownerName && property.ownerName.split(', ') }))
const getResultData = () => [ ...document.querySelectorAll('.summaryListItem') ].map(el => {
  const result = {}
  const addressLink = el.querySelector('h2 a')
  // Address Link will not exist if this property is out of the RPdata
  // subscription. This happens if it is interstate?
  if (addressLink) {
    result.address = addressLink.innerText
    el.querySelectorAll('.summaryListItemContent li').forEach(liEl => {
      const key = liEl.querySelector('label').innerText.replace(':', '')
      const val = liEl.querySelector('span').innerText
      result[key] = val
    })
  } else {
    result.address = 'Error - Property must be in NSW'
  }
  return result
})

const splitRoute = (validSelector, errorSelector) => new Promise(resolve => {
  const functionToRun = () => {
    const validEl = document.querySelector(validSelector)
    const errorEl = document.querySelector(errorSelector)
    if (validEl) {
      return 'valid'
    } else if (errorEl) {
      return 'error'
    }
  }

  const interval = setInterval(() => {
    const result = functionToRun()
    if (result) {
      clearInterval(interval)
      resolve(result)
    }
  }, 50)
})

const search = ({ address }) => {
  const startSearch = () => nightmare
    .evaluate((address) => {
      const inputEl = document.querySelector('#searchAddressSimple input')
      if (inputEl) {
        inputEl.value = address
      }
    }, address)
    .click('#addressLink')
    .wait((addressEncoded) => location.search.includes(addressEncoded), qs.stringify(address))
    .evaluate(getResultData)
    .then(convertKeysToCamelCase)
    .then(convertOwnerNameIntoArray)

  return nightmare
    .goto('https://rpp.rpdata.com/rpp/loadSummary.html')
    .evaluate(splitRoute, '#searchAddressSimple input', '.alert--error')
    .then(data => {
      if (data === 'valid') {
        return startSearch()
      }
      return login().then(() => search({ address }))
    })
}

const isReady = () => initialised

module.exports = {
  initialise,
  isReady,
  search,
}
