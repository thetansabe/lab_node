
const Product = require('../model/Product')

async function getAllProduct(){
    const products = await Product.find()
    return products
}

async function getProductById(id){
    const product = await Product.find({_id: id})
    return product
}

async function deleteProductById(id){
    Product.deleteOne({_id: id}, (err) => {
        if (err) return err
        return 'xoa thanh cong 1 product'
    })
}

module.exports = {
    getAllProduct,
    getProductById,
    deleteProductById,
}