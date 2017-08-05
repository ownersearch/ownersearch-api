const http = require('axios')

const searchResi = (options) => http({
  method: 'GET',
  url: 'https://www.whitepages.com.au/api/r/search',
  params: {
    location: options.location || 'Nationally',
    givenName: options.givenName,
    name: options.name,
  }
}).then(response => response.data.results)

const searchBusiness = ({ location, name, }) => http({
  method: 'GET',
  url: 'https://www.whitepages.com.au/api/b/search',
  params: {
    location: location || 'Nationally',
    expand: true,
    name: name,
  }
}).then(response => response.data.results)

module.exports = {
  searchBusiness,
  searchResi,
}