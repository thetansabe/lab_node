var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator')
const dotenv = require('dotenv').config({path: './.env'})


const register = require('../helpers/register')
const login = require('../helpers/login');
/* GET home page. */
router.get('/', async function(req, res) {
    
    res.json(login.createJWT('hello'))
    //res.render('index', { title: 'Express' });
});

////api/account/register
//dang ki 1 tai khoan moi, pass co bcrypt

router.post('/account/register',
            body('email').isEmail(), 
            body('password').isLength({ min: 6 }),
            async (req,res) => 
{
    //validate input info
    register.validateInput(req, res)

    //tien hanh register
    register.handleRegister(res, req.body.email, req.body.password)
})

////api/account/register
//nguoi dung dang nhap, JWT de xac thuc nguoi dung


router.post('/account/login', 
            body('email').isEmail(), 
            body('password').isLength({ min: 6 }),
            async (req, res) => 
{   
    //validate input info
    register.validateInput(req, res)
    
    //tien hanh xu li login
    login.handleLogin(req, res)
})

////api/products
//tra ve danh sac tat ca san pham
const productHelper = require('../helpers/products')

router.get('/products', (req,res) => {
    productHelper.getAllProduct()
    .then(products => {
        return res.send(JSON.stringify(products))
    })
    //res.send('hi')
})

//them san pham
router.post('/products', login.authenToken, (req,res) => {
    res.send('hiii')
})

////api/products/{id}
//tra ve thong tin chi tiet sp theo id
router.get('/products/:id', (req,res) => {
    productHelper.getProductById(req.params.id)
    .then(product => {
        return res.send(JSON.stringify(product))
    })
    .catch(err => {
        return res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)))
    })
})

//cap nhat san pham theo id
router.put('/products/:id', (req,res) => {
    res.send('puttt')
})
//xoa sp theo id

router.delete('/products/:id', login.authenToken, async (req,res) => {
    const deleteResult = await productHelper.deleteProductById(req.params.id)
    return res.send(deleteResult)
})

////api/orders
//tra ve danh sach cac bills
const ordersHelper = require('../helpers/orders')

router.get('/orders', login.authenToken, (req,res) => {
    ordersHelper.getAllOrders()
    .then(orders =>{
        return res.send(JSON.stringify(orders))
    })
    .catch(err => {
        return res.send(JSON.stringify(err, Object.getOwnPropertyNames(err)))
    })
})

//them don hang moi
router.post('/orders', login.authenToken, (req,res) => {
    res.send('hmmmm')
})

////api/orders/{id}
//thong tin chi tiet bill theo id
router.get('/orders/:id', login.authenToken, (req, res) => {
    ordersHelper.getOrderById(req.params.id)
    .then(order => {
        return res.send(JSON.stringify(order))
    })
    .catch(err => {
        return res.send('Loi getOrderById()')
    })
    
})
//cap nhat bill
router.put('/orders/:id', login.authenToken, (req,res) => [
    res.send('aluuu')
])
//xoa bill
router.delete('/orders/:id',login.authenToken, async (req,res) => {
    const deleteResult = await ordersHelper.deleteOrderById(req.params.id)

    return res.send(deleteResult)
})


module.exports = router;
