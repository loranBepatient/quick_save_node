const mongoose = require('mongoose');
const winston = require('winston')
const connectToMongo = (db) => {
    mongoose.connect(db)
        .then((winston.info(`connected to ${db}`)
))

}

module.exports = connectToMongo;
