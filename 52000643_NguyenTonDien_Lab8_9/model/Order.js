const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: './.env'})

////////////CONNECT MONGODB
//connect
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect(process.env.DATABASE_LINK, opts)

//create schemas(schemas = collection = table trong mongo)
const userSchema = new mongoose.Schema({
    sum: Number,
    productList: Array,
    
},{
    timestamps: true,
})

//tao model
const Order = mongoose.model('Order',userSchema)

module.exports = Order