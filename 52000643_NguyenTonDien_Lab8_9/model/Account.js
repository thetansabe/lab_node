const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './.env'})

////////////CONNECT MONGODB
//connect
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

console.log('DB connect thanh cong: ', process.env.DATABASE_LINK)
mongoose.connect(process.env.DATABASE_LINK, opts)

//create schemas(schemas = collection = table trong mongo)
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
},{
    timestamps: true,
})

//tao model
const Account = mongoose.model('Account',userSchema)

module.exports = Account