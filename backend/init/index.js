const mongoose = require('mongoose');
const initData = require('./data');
const Student = require('../models/students')

main().then(()=>{
    console.log("connected initDB")
}).catch((err)=>{
    console.log(err)
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/students");
};

const initDB = async()=>{
    await Student.deleteMany({});
    let data = await Student.insertMany(initData.data);
    console.log(data)
}

initDB();