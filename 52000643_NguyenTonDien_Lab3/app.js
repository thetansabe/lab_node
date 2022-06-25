const express = require('express');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv').config({path: './.env'})
const multiparty = require('multiparty')
const fs = require('fs')

const credentials = require('./credentials.js')

const app = express();
const PORT = 4433;

///////////DECLARE BEFORE ROUTE
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    
}))

app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'))


//phan giai data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//cookie and session
app.use(require('cookie-parser')(credentials.cookieSecret))
app.use(require('express-session')())
app.use((req,res,next) => {
    res.locals.flash = req.session.flash
    delete req.session.flash
    next()
})

////////////ROUTE
//login
app.get('/login',(req, res, next) => {
    res.render('login')
})

app.post('/login',(req,res) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    if(email === process.env.EMAIL && password === process.env.PASSWORD){
        req.session.account = {
            email,
            password
        }
        return res.send(JSON.stringify({code: 0 , message: 'login success'}))  
    }
    
    //xu li TH sai
    req.session.flash = {
        type: 'danger',
        intro: 'Validation Error!',
        message: 'Incorrect email or password'
    }
    return res.send(JSON.stringify({code: 1 , message: 'wrong email or password'})) 
})

//product list
let products = [
    {id:1,name:'Product 1',price:1000,img: 'Screenshot 2022-03-15 125056.png',desc: 'Best seller'},
    {id:2,name:'Product 2',price:2000,img: 'Screenshot 2022-03-15 125056.png',desc: 'Best seller'},
    {id:3,name:'Product 3',price:3000,img: 'Screenshot 2022-03-15 125056.png',desc: 'Best seller'},
    {id:4,name:'Product 4',price:4000,img: 'Screenshot 2022-03-15 125056.png',desc: 'Best seller'},
    {id:5,name:'Product 5',price:5000,img: 'Screenshot 2022-03-15 125056.png',desc: 'Best seller'},
    {id:6,name:'Product 6',price:6000,img: 'Screenshot 2022-03-15 125056.png',desc: 'Best seller'},
]

function getHighestId(products){
    let maxId = -1
    products.forEach(product => {
        if(product.id > maxId) maxId = product.id
    })
    return maxId
}

let nextId = getHighestId(products) + 1

app.get('/product_list',(req,res) => {
    //res.render('product_list',{products})
    if(req.session.account) return res.render('product_list',{products})
    req.session.flash = {
        type: 'danger',
        intro: 'Unvalid Access!',
        message: 'Cannot access without login'
    }
    return res.redirect(303,'/login')
})

//xoa product
app.post('/delete', (req,res) => {

    products = products.filter(product => {
        return product.id != req.body.product_id
    })

    req.session.flash = {
        type: 'success',
        intro: 'Delete a product',
        message: 'Delete successfully'
    }

    return res.send(JSON.stringify({code: 0, message: 'item deleted'}))
})

const handlers = require('./lib/handlers')

//update san pham
app.get('/update/:id', (req,res) => {
    const updateProduct = products.filter(product => {
        return product.id == req.params.id
    })

    res.render('edit_product', updateProduct[0])
})

app.post('/update/:id', (req,res) => {

    const objIndex = products.findIndex(product => {
        return product.id == req.params.id
    })

    let updateProduct = products[objIndex]

    const form = new multiparty.Form()

    form.parse(req, (err, fields, files) => {
        updateProduct = handlers.api.updateProductApi(req,res,fields,files,updateProduct)
        products[objIndex] = updateProduct
    })
    
    //thong bao
    req.session.flash = {
        type: 'success',
        intro: 'Update a product',
        message: `Product id ${req.params.id} has been updated`
    }
    //update xong thi chuyen ve menu
    return res.redirect(303,'/product_list')
})

//add product

app.get('/add', (req,res) =>{
    res.render('add_product')
})

app.post('/add', (req,res) => {
    const form = new multiparty.Form()

    form.parse(req, (err, fields, files) => {

        const name = fields.product_name[0]
        const price = parseInt(fields.product_price[0])
        const desc = fields.product_desc[0]

        
        const photo = files.photo[0]
        //ktra input
        if( !name || !price || !desc || photo.size == 0)
        {
            req.session.flash = {
                type: 'danger',
                intro: 'Missing field!',
                message: 'Ban phai nhap du thong tin'
            }
    
            return res.redirect(303,'/add')
        }

        //moving image
        const fileName = photo.originalFilename
        
        const oldPath = photo.path
        const newPath = __dirname +'/public/upload/'+fileName
        
        fs.copyFile(oldPath,newPath,(err) => {
            if(err) throw err
            console.log('Successfully moved')
        })
        
        //add to product list
        products =  
        [
            ...products,
            {id: nextId, name: name, price : price, img: fileName,desc: desc}
        ]

        req.session.flash = {
            type: 'success',
            intro: 'Add a product',
            message: 'New product has been added'
        }

        return res.redirect(303,'/add')
    })
})

//chi tiet product
app.get('/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const findProduct = products.filter(product => {
        return product.id == id
    })

    //console.log(findProduct)
    res.render('product_details',findProduct[0])
})

//custom 404 page
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
})

//custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Sever Error');
});




app.listen(PORT, ()=> {
    console.log(`App listening on http://localhost:${PORT}`);
});