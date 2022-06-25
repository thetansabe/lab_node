

//cach viet api
const fs = require('fs')

exports.api = {
    updateProductApi : (req, res, fields, files, updateProduct) =>{
        const name = fields.product_name[0] || updateProduct.name
        const price = parseInt(fields.product_price[0]) || updateProduct.price
        const desc = fields.product_desc[0] || updateProduct.desc

        //moving image
        const photo = files.photo[0]
        const fileName = photo.originalFilename || updateProduct.img

        if(photo.size > 0){
            const oldPath = photo.path
            const newPath = __dirname +'/../public/upload/'+fileName
            
            fs.copyFile(oldPath,newPath,(err) => {
                if(err) throw err
                console.log('Successfully moved')
            })
        }
        
        //update
        
        updateProduct = {id:updateProduct.id,name,price,img: fileName,desc}

        return updateProduct
    },
    
    vacationPhotoContestError : (req, res, err) => {
        //bat ket qua tu fetch
        res.send({ err: 'fail to fetch vacation photo api'})
    }
}
