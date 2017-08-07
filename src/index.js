const http = require('http');

const server = require('./server');
const { initialise } = require('./providers');

initialise();

const port = process.env.PORT || 3000;

http.createServer(server).listen(port, () => console.log(`Server listening on port ${port}`));
