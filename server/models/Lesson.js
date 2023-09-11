const { Schema, model } = require('mongoose');
const sectionSchema = require('./Section')

const lessonSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    sections: [sectionSchema],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    moduleId: {
        type: Schema.Types.ObjectId,
        ref: 'Module'
    },
    moduleColour: {
        type: String,
        required: true,
    } 
});

const Lesson = model('Lesson', lessonSchema);

module.exports = Lesson;
