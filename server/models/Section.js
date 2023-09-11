const { Schema } = require('mongoose');

const sectionnSchema = new Schema({
    heading:
    {
        type: String,
        required: true
    },
    subheading:
    {
        type: String,
    },
    text:
    {
        type: String,
        required: true
    },
});

module.exports = sectionnSchema;
