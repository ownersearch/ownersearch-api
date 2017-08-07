const http = require('axios')

const initialise = () => undefined
const isReady = () => true

const search = (data) => {
  if (data.company) {
    return searchBusiness(data)
  } else {
    return searchResidential(data)
  }
}

const searchResidential = ({ postcode, givenName, name }) => http({
  method: 'GET',
  url: 'https://www.whitepages.com.au/api/r/search',
  params: {
    location: postcode || 'Nationally',
    givenName,
    name,
  }
})
.then(response => response.data.results)

const searchBusiness = ({ postcode, company, }) => http({
  method: 'GET',
  url: 'https://www.whitepages.com.au/api/b/search',
  params: {
    location: postcode || 'Nationally',
    expand: true,
    name: company,
  }
})
.then(response => response.data.results)

module.exports = {
  initialise,
  isReady,
  search,
  searchBusiness,
  searchResidential,
}
