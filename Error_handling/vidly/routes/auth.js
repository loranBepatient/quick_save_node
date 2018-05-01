const _ = require('lodash');
const Joi = require('joi');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    passwordMatch = await bcrypt.compare(req.body.password, user.password)
    console.log(passwordMatch)

    if (!passwordMatch)
        return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.status(200).send(token)

});

const validate = (req) => {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(req, schema);
};

module.exports = router;
