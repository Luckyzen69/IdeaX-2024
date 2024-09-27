const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planSchema = new Schema({
    plan: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
   
    }
});

module.exports = mongoose.model('Plan', planSchema);