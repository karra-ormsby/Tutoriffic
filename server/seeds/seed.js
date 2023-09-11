const db = require('../config/connection');
const { Student } = require('../models');
const studentData = require('./studentData.json');

db.once('open', async () => {
  try {
   await Student.deleteMany({});

    const students = await Student.insertMany(studentData);

    console.log('Students seeded:', students);
     process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
});