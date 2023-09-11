const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  schoolingLevel: {
    type: String,
    required: true,
  },
  parentGuardian: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String
  }
});

const Student = model('Student', studentSchema);

module.exports =  Student ;
