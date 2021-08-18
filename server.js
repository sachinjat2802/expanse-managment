const sls = require('serverless-http')
const app = require('./dist/js/app')
module.exports.run = sls(app)