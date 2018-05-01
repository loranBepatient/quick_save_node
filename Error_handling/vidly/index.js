require('express-async-errors');
const Joi = require('joi');
const error = require('./middleware/error')
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

const db = config.get('db')

if (!config.get('jwtPrivateKey')) { 
  console.error('Private key is not defined');
  process.exit(1);
}

const connectToMongo = async (db) => {
  try {
    const mongo = await mongoose.connect(db)
    console.log('connected to Mongo')
    return mongo
  }
  catch (err) {
    console.error(err)
  }
}

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use (error)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectToMongo(db)
  console.log(`Listening on port ${port}...`)
});
