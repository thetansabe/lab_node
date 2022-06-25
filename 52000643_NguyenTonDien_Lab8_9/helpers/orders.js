
const Order = require('../model/Order')

async function getAllOrders(){
    const orders = await Order.find()
    return orders
}

async function getOrderById(id){
    const order = await Order.find({_id: id})
    return order
}

async function deleteOrderById(id){
    try{
        const order = await Order.findById(id)
        await order.remove()
        return 'Xoa 1 order thanh cong'
    }catch{
        return 'Loi khi xoa - co the order id ko ton tai'
    }
}
module.exports = {
    getAllOrders,
    getOrderById,
    deleteOrderById
}