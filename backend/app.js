const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Student = require('./models/students');
const cors = require('cors')

//Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//for database connection
mainDb().then(() => {
  console.log("connected DB");
}).catch((err) => {
  console.log(err);
});

async function mainDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/students");
}

app.get("/", (req, res) => {
  res.send("Server is working");
});

//api for creation
app.post('/api/student',async(req,res)=>{
  try {
  const creatStudent = new Student(req.body);
  await creatStudent.save();
  res.json({ message: "Student created successfully" });
  } catch (error){
    res.json({ error: "An error occurred while creating the student" });
  }
});

// api for get and search student
app.get('/api/student', async (req, res) => {
  try {
    const name = req.query.Name;

    if (name) {
      const students = await Student.find({ name: { $regex: new RegExp(name, 'i') } });
      res.json(students);
    } else {
      const students = await Student.find();
      res.json(students);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
});

//api to show student on basic of id
app.get('/api/student/:id',async(req,res)=>{
  let {id} = req.params;
  let studentById= await Student.findById(id);
  res.send(studentById)
});

// // api for update student info
app.put('/api/student/:id',async(req,res)=>{
  let {id} = req.params;
  let {name, age, email, password}= req.body
  const studentUpdate= await Student.findByIdAndUpdate(id, {name, age, email, password});
  res.send(studentUpdate)
});

//delete student basis on id
app.delete('/api/student/:id',async(req,res)=>{
  let {id} = req.params;
  const studentByIdAndDelete= await Student.findByIdAndDelete(id);
  res.send(studentByIdAndDelete)
});

//delete all student
app.delete('/api/student',async(req,res)=>{
  const deleteAllStudent= await Student.deleteMany({});
  res.send(deleteAllStudent)
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});