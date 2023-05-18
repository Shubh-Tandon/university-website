import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudentSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    course: String,
    marksobtained: Number,
    totalmarks: Number
})

const student = mongoose.model('student', StudentSchema)

export default student;