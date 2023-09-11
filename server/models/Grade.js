const mongoose = require('mongoose');

const { Schema } = mongoose;

const gradeSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  gradeNumber: {
    type: Number,
    required: true,
  },
  gradePercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100, 
  },


});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;


