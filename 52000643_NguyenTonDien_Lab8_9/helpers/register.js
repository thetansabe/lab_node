var bcrypt = require('bcrypt');
var { body, validationResult } = require('express-validator')
//import db modal
const Account = require('../model/Account')

//validate input
function validateInput(req,res){
    //validate input info
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const msg = createMsg(1, 'Invalid Input!', `${errors.errors[0].param}`)
        return res.send(JSON.stringify(msg))
    }
}

//handle register
async function checkForExistence(email){
    const isExisted = await Account.findOne({email : email})

    if(isExisted != null) return true //true -> da ton tai -> ko cho add
    else return false
}

function saveNewAccount(res, email, password){
    //tien hanh luu moi database
    const salt = bcrypt.genSaltSync(10)
    const hashedPass = bcrypt.hashSync(password, salt)
    
    const newAccount = new Account({email: email, password: hashedPass})
    newAccount.save()
        .then(() => {
            const msg = createMsg(0, 'Them thanh cong', '1 tai khoan da duoc them')
            return res.send(JSON.stringify(msg))
        })
        .catch(err => {return res.send(JSON.stringify(err))})
    //bcrypt.compareSync
}

function createMsg(code, info, detail){
    return {code, info, detail}
}

function handleRegister(res, email, password){
    //ktra account da ton tai hay chua
    checkForExistence(email)
    .then((isExisted) => {
        console.log('isExisted: ', isExisted)
        //kiem tra 
        if(isExisted) throw new Error()
        //tien hanh luu moi database
        saveNewAccount(res, email, password)
    })
    .catch(() => {
        const msg = createMsg(2, 'Register error', 'Existed accont')
        return res.send(JSON.stringify(msg))
    })
}

module.exports = {
    createMsg,
    validateInput,
    handleRegister,
}