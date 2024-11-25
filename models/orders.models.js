const { number } = require('joi')
const mongoose=require('mongoose')
const Schema=mongoose.Schema


const orderSchema=new Schema({
    id:{
        type:Number,
        unique:true,
        indexedDB:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    products:{
        type:Number,
        required:true
    }
}
)
const Product=mongoose.model('Product',ProductSchema)
module.exports=Product  