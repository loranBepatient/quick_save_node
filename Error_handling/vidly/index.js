require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
const db = config.get('db')

const express = require('express');
const app = express();

require('./startup/routes')(app,express)
require('./startup/db')(db)

winston.unhandleExceptions(winston.transports.File, {filename: 'logfile.json'})
winston.add(winston.transports.File, {filename: 'logfile.json'})
winston.add(winston.transports.MongoDB, {db: db})

process.on('unhandledRejection', (ex)=>{
  throw ex
  process.exit(1)
})

if (!config.get('jwtPrivateKey')) { 
  console.error('Private key is not defined');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});
