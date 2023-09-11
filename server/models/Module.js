const { Schema, model } = require('mongoose');

const moduleSchema = new Schema({
    moduleName: {
        type: String,
        required: true,
    },
    selectedColor: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Module = model('Module', moduleSchema);

module.exports = Module;
