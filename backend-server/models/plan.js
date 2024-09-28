const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planSchema = new Schema({
    plan: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    email: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Plan', planSchema);