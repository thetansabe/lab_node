var bcrypt = require('bcrypt');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({path: './.env'})

//import db modal
const Account = require('../model/Account')
const register = require('./register')

//create jwt
function createJWT(payload){
    console.log(process.env.ACCESS_TOKEN_SECRET)
    const  accessToken = 
        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    return accessToken
}

//check email
async function handleLogin(req, res){
    const user = await Account.findOne({email: req.body.email})
    if(user == null){
        const msg = register.createMsg(3, 'Login Failed!', 'Tai khoan nay khong ton tai')
        return res.send(JSON.stringify(msg))
    }

    //check pass
    const hash = user.password
    const pass = req.body.password
    if(bcrypt.compareSync(pass, hash)){
        //if true -> login
        
        //tien hanh bat JWT
        const token = createJWT(user._id.toString())
        //console.log(user._id.toString())
        //send thong bao
        const msg = register.createMsg(0, 'Login successfully', `Beaer ${token}`)
        return res.send(JSON.stringify(msg))
    }else{
        const msg = register.createMsg(4, 'Login Failed!', 'Sai mat khau')
        return res.send(JSON.stringify(msg))
    }
}

////
function authenToken(req, res, next){
    const authorizeHeader = req.headers['authorization']
    //'Beaer [Token]'
    const token = authorizeHeader.split(' ')[1]
    //unauthorize error
    if(!token) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        //data la payload doc duoc
        console.log(err, data)
        //403 - loi forbiden - ko duoc truy cap
        if(err) res.sendStatus(403).send('Can phai dang nhap de su dung dich vu nay')
        next()
    })
}

module.exports = {
    createJWT,
    handleLogin,
    authenToken
}

