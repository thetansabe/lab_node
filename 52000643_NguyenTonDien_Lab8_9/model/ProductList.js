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
    quantity: Number,
    price: Number,
    
},{
    timestamps: true,
})

//tao model
const ProductList = mongoose.model('ProductList',userSchema)

module.exports = ProductList