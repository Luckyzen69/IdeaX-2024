const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diarySchema = new Schema({
    planId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Diary', diarySchema);