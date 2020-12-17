const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;