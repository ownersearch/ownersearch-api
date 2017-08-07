const express = require('express');
const url = require('url');
const proxy = require('express-http-proxy');

const api = require('./api');

const router = express.Router();

const websiteServer = 'website:3080';
const proxyReqPathResolver = (req) => url.parse(req.originalUrl).path;
const proxyToWebsiteServer = proxy(websiteServer, { proxyReqPathResolver });

// proxy any requests for static content to the website server
router.use(['/js', '/css', '/images', '/static'], proxyToWebsiteServer);

// serve the api after not matching static content
router.use(api);

// for all other cases, proxy to the website server
router.use('/*', proxyToWebsiteServer);

module.exports = router;
