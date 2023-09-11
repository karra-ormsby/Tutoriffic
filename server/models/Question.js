const { Schema } = require('mongoose');

const questionSchema = new Schema({
    question:
        {
            type: String,
            required: true
        },
    answers : [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = questionSchema;
