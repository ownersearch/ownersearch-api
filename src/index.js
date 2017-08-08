const http = require('http');

const server = require('./server');
const packageJson = require('../package.json');
const { initialise } = require('./providers');

initialise();

const port = process.env.PORT || 3000;

http.createServer(server).listen(port, () => console.log(`Server listening on port ${port}`));

console.log(`Ownersearch api version: ${packageJson.version}`);
