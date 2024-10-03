const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: { type: String, required: true },
    age:  Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  
const Student = mongoose.model('Student', dataSchema);

module.exports = Student;