const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () { 
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin, name: this.name}, config.get('jwtPrivateKey'), {expiresIn: 60 * 60})
    return token;
}

const User = mongoose.model('users', userSchema);

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
