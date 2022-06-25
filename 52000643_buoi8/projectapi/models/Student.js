
const mongoose = require('mongoose')
const { float } = require('webidl-conversions')


const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect('mongodb://localhost:27017/test_session_dev', opts)

const userSchema = new mongoose.Schema({
    masv: String,
    hoten: String,
    nienkhoa: String,
    makhoa: String,
    lop: String,
    ngaysinh: Date,
    dtbtichluy: {type: Number, default: 0.0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now} 
})

const Student = mongoose.model('Student',userSchema)

module.exports = Student