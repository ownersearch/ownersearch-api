const whitepages =  require('./source/whitepages')
const personLookup =  require('./source/personLookup')

personLookup.searchResi({
  name: 'Revay',
}).then((response) => {
//  console.log(response.data)
})

//whitepages.searchBusiness({
//  name: 'Ecolight',
//}).then((response) => {
//  console.log(response.data.results)
//})