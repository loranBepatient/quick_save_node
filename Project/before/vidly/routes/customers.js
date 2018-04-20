const mongoose = require('mongoose');
const Joi = require('joi')
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        required: true,
        type: Boolean
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true
    }
}))

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers)
})


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;
