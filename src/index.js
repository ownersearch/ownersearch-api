const http = require('http');

const api = require('./api');
const { initialise } = require('./providers');

initialise();

const port = process.env.PORT || 3000;

http.createServer(api).listen(port, () => console.log(`Server listening on port ${port}`));
