const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;

