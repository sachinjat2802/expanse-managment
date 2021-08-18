"use strict";
const awsServerlessExpress = require('aws-serverless-express')
const app= require('./dist/js/app')
const server = awsServerlessExpress.createServer(app)

exports.handler =(event,context)=>{
    
    console.log(`EVENT: ${JSON.stringify(event)}`);
     returnawsServerlessExpress.proxy(server,event,context)
}