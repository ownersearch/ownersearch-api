const http = require('axios')

const searchResi = (options) => http({
  method: 'GET',
  url: 'https://www.whitepages.com.au/api/r/search',
  params: {
    location: options.location || 'Nationally',
    givenName: options.givenName,
    name: options.name,
  }
})

const searchBusiness = ({ location, name, }) => http({
  method: 'GET',
  url: 'https://www.whitepages.com.au/api/b/search',
  params: {
    location: location || 'Nationally',
    expand: true,
    name: name,
  }
})

module.exports = {
  searchBusiness,
  searchResi,
}