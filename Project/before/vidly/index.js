const Joi = require('joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('connected to Mongo'))
    .catch((err) => console.error(err))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
