const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    author: String,
    category: {
        type: String,
        enum: [
            'web',
            'mobile',
            'network'
        ],
        required: true
    },
    tags: {
        isAsync: true,
        type: Array,
        validate: {
            validator: function(value, callback) {
                // setTimeout(() => {
                //     return value && value.length > 0;
                // }, 4000)

                // callback(value);
                return value && value.length > 0 
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        required: function () { return this.isPublished === true },
        min: 10,
        max: 20,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    isPublished: Boolean

})

module.exports = courseSchema;
