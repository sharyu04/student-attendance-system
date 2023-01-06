const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    checkInTime: {
        type: Date
    },
    checkOutTime: {
        type: Date
    }
});

module.exports = mongoose.model('student', studentSchema);