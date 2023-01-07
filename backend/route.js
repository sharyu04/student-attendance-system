const express = require("express");
const Student = require("./model");
const router = express.Router();

router.post('/registerStudent', async (req, res) => {
    try {
        let student = await Student.findOne({rollNo: req.body.rollNo});
        if(student){
            return res.status(400).json({error: "Roll no already registered"});
        }
        student = await Student.create({
            name: req.body.name,
            rollNo: req.body.rollNo,
            checkInTime: null,
            checkOutTime: null
        });
        res.status(200).json(student);
    }
    catch (err) {
        console.log(err);
    }
});

router.put('/checkIn', async (req, res) => {
    try {
        let student = await Student.findOne({rollNo: req.body.rollNo});
        if(!student){
            return res.status(400).json("No such student exists!");
        }
        if(student.name !== req.body.name){
            return res.status(400).json("Invalid credentials");
        }
        if(student.checkInTime!==null && student.checkOutTime===null){
           return res.status(400).json("Student has already checked in !");
        }
        student = await Student.findOneAndUpdate({ rollNo: req.body.rollNo }, { checkInTime: Date.now(), checkOutTime: null });
        res.status(200).json(student);
    }
    catch(err){
        console.log(err);
    }
});

router.put('/checkOut', async (req, res) => {
    try {
        let student = await Student.findOne({ rollNo: req.body.rollNo });
        if(!student){
            return res.status(400).json("No such student exists!");
        }
        if(student.name !== req.body.name){
            return res.status(400).json("Invalid credentials");
        }
        if(student.checkOutTime!==null){
            return res.status(400).json({message : "Student has already checked out!"})
        }
        student = await Student.findOneAndUpdate({ rollNo: req.body.rollNo }, { checkOutTime: Date.now() });
        res.status(200).json(student);
    }
    catch(err){
        console.log(err);
    }
});

router.post('/getStudent', async (req, res) => {
    try {
        let student = await Student.findOne({ rollNo: req.body.rollNo });
        if(!student){
            return res.status(400).json("No such student exists!");
        }
        if(student.name !== req.body.name){
            return res.status(400).json("Invalid credentials");
        }
        res.status(200).json(student);
    }
    catch(err){
        console.log(err);
    }
});

router.post('/totalPresentStudents', async (req, res) => {
    try {
        let count = 0
        let student = await Student.find({ checkOutTime: null });
        student.forEach(element => {
            if(element.checkInTime!==null){
                count++;
            }
        });
        res.status(200).json({student, count});

    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;