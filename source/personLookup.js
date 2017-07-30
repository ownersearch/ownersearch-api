const http = require('axios')
const cheerio = require('cheerio')

const searchResi = ({ name }) => http({
  method: 'GET',
  url: 'https://personlookup.com.au/search',
  params: {
    country_id: 1,
    q: name,
    utf8:'✓'
  }
}).then((response) => {
  const $ = cheerio.load(response.data)
  const data = []
  $('tr').each((i, el) => {
    data.push($(el).text())
  })
  
  console.log(data)
})

module.exports = {
  searchResi,
}