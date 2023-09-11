const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    }
});


module.exports = commentSchema;
