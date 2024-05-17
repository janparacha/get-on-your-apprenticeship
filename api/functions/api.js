const serverless = require('serverless-http');
const app = require('../src/app.ts');

module.exports.handler = serverless(app);