const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;